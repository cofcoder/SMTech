import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Simple in-memory rate limiting map
// Maps IP coordinates to submit timestamps
const rateLimits = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5; // Allow max 5 emails every 15 minutes per IP coordinate

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimits.get(ip) || [];
  
  // Filter timestamps to only keep those within current window
  const activeTimestamps = timestamps.filter(ts => now - ts < RATE_LIMIT_WINDOW_MS);
  
  if (activeTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimits.set(ip, activeTimestamps); // update with filtered list
    return true;
  }
  
  activeTimestamps.push(now);
  rateLimits.set(ip, activeTimestamps);
  return false;
}

// Simple HTML/Input Sanitizer to prevent XSS and SMTP Email Injection
function sanitizeInput(str: string): string {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .replace(/[\r\n]+/g, " ") // prevent carriage return injection on scalar fields
    .trim();
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Global parsing middlewares
  app.use(express.json({ limit: "50kb" })); // strict size constraint to prevent body flooding attacks

  // 1. API: Secure Contact pipeline endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const clientIp = (req.headers["x-forwarded-for"] as string || req.socket.remoteAddress || "unknown-ip").split(",")[0].trim();
      
      // A. Rate Limiting verification
      if (isRateLimited(clientIp)) {
        res.status(429).json({
          status: "error",
          message: "Rate limit reached. Your IP coordinate is temporarily throttled to prevent mail floods. Please retry in 15 minutes."
        });
        return;
      }

      const { name, email, subject, message, websiteTokenUrl } = req.body;

      // B. Anti-Bot Honeypot Protection
      // 'websiteTokenUrl' is a decoy field disguised as website URL and hidden from normal screen view.
      // If a bot fills it in, we silently discard the payload returning a dummy positive status.
      if (websiteTokenUrl && websiteTokenUrl.trim() !== "") {
        console.warn(`[Anti-Spam Security]: Suspicious bot activity intercepted from client ${clientIp}. Honeypot filled.`);
        // Return 200 to trick bots into halting their iteration loop
        res.json({
          status: "success",
          message: "Secure packet processed successfully. Payload synchronized."
        });
        return;
      }

      // C. Mandatory Fields verification
      if (!name || !email || !message) {
        res.status(400).json({
          status: "error",
          message: "Incomplete security packet. Ensure name, email, and message segments are populated."
        });
        return;
      }

      // D. Security Bounds Checks (Lengths)
      if (name.length > 100 || email.length > 150 || (subject && subject.length > 200) || message.length > 5000) {
        res.status(400).json({
          status: "error",
          message: "Security exception: Input payload limits exceeded (Name max 100 char, Email max 150 char, Message max 5000 char)."
        });
        return;
      }

      // E. Format Verification (Email regex check)
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({
          status: "error",
          message: "Invalid routing target email address format."
        });
        return;
      }

      // F. Sanitize Inputs
      const cleanName = sanitizeInput(name);
      const cleanEmail = sanitizeInput(email);
      const cleanSubject = sanitizeInput(subject || "New Web Inquiry from SMTech Portfolio Portal");
      const cleanMessage = sanitizeInput(message);

      // G. Compose Email payload
      const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "shane.geach@gmail.com";
      const smtpHost = process.env.SMTP_HOST;
      const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;
      const smtpSender = process.env.SMTP_SENDER || `SMTech Contact <${receiverEmail}>`;

      const plainTextContent = `
[SMTech Contact Form Security Packet]
--------------------------------------------------
Sender Client name: ${cleanName}
Return Route Email: ${cleanEmail}
Namespace segment: ${cleanSubject}
Client IP Coordinate: ${clientIp}
System Time stamp: ${new Date().toISOString()}

Message Telemetry Payload:
--------------------------------------------------
${cleanMessage}
--------------------------------------------------
      `;

      const htmlContent = `
<div style="font-family: 'JetBrains Mono', 'Courier New', monospace; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #1e293b; background-color: #0f172a; color: #cbd5e1; border-radius: 12px;">
  <div style="border-bottom: 2px solid #6366f1; padding-bottom: 15px; margin-bottom: 20px;">
    <h2 style="color: #818cf8; margin: 0; font-size: 18px; font-weight: bold; letter-spacing: 0.05em;">// SMTECH SECURE PIPELINE COORDINATES</h2>
    <span style="color: #64748b; font-size: 11px;">TIMESTAMP: ${new Date().toISOString()} | CL-IP: ${clientIp}</span>
  </div>
  
  <div style="background-color: #1e293b; padding: 15px; border-radius: 6px; margin-bottom: 20px; font-size: 13px;">
    <strong>Client:</strong> <span style="color: #e2e8f0;">${cleanName}</span><br/>
    <strong>Route:</strong> <span style="color: #e2e8f0;">${cleanEmail}</span><br/>
    <strong>Topic:</strong> <span style="color: #6366f1;">${cleanSubject}</span>
  </div>

  <div style="background-color: #090e1a; padding: 20px; border-radius: 8px; border-left: 3px solid #db2777; margin-bottom: 25px;">
    <span style="color: #475569; font-size: 10px; font-weight: bold; display: block; margin-bottom: 10px;">// TELEMETRY BODY</span>
    <p style="color: #f1f5f9; font-size: 13px; margin: 0; line-height: 1.6; white-space: pre-wrap;">${cleanMessage}</p>
  </div>

  <div style="text-align: center; border-t: 1px solid #1e293b; padding-top: 15px; font-size: 10px; color: #64748b;">
    This transmission was securely routed through SMTech Portfolio Full-Stack API.
  </div>
</div>
      `;

      // H. Send using Transport client (Nodemailer config)
      if (smtpHost && smtpUser && smtpPass) {
        // Real SMTP details populated
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465, // true for 465, false for 587 or other
          auth: {
            user: smtpUser,
            pass: smtpPass
          }
        });

        await transporter.sendMail({
          from: smtpSender,
          to: receiverEmail,
          subject: `[Portfolio Portal API] - ${cleanSubject}`,
          text: plainTextContent,
          html: htmlContent
        });

        console.log(`[SMTP Secure Email Sent]: Delivered to ${receiverEmail}`);
      } else {
        // Safe development Sandbox logging mode to avoid raising crash exceptions
        console.log("------------------ LOCAL DEV SECURE LOG ONLY ------------------");
        console.log(`SENDER EMAIL WOULD GO TO: ${receiverEmail}`);
        console.log(`SMTP CONFIG NOT SET (Set SMTP_HOST, SMTP_USER, SMTP_PASS variables to transmit to real inbox)`);
        console.log(`Content of raw packet:`);
        console.log(plainTextContent);
        console.log("----------------------------------------------------------------");
      }

      res.status(200).json({
        status: "success",
        message: "Your message has been processed securely! The packet was dispatched through our full-stack pipeline endpoint."
      });

    } catch (err: any) {
      console.error("[Secure Contact Form API Error]:", err);
      res.status(500).json({
        status: "error",
        message: "An internal security or communication pipeline exceptions occurred. Rest assured, your logs remain safe."
      });
    }
  });

  // Vite middleware for rendering and serving assets
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SMTech Full-Stack Server listening at http://localhost:${PORT}`);
  });
}

startServer();
