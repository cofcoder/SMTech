import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Sparkles, SendToBack, Github, Twitter, Linkedin, ServerCrash, Loader2, Mail } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [websiteTokenUrl, setWebsiteTokenUrl] = useState("");

  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic verification validation check
    if (!name.trim() || !email.trim() || !message.trim()) {
      setFormState('error');
      setErrorMessage("Mandatory parameters are empty. Ensure identity codes, email targets, and message segments are valid.");
      return;
    }

    setFormState('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          websiteTokenUrl
        })
      });

      const data = await response.json();

      if (!response.ok || data.status === 'error') {
        throw new Error(data.message || 'Fatal communication error with backend pipeline.');
      }

      setFormState('success');
      // Reset inputs
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setWebsiteTokenUrl("");
    } catch (err: any) {
      console.error('Submission failed:', err);
      setFormState('error');
      setErrorMessage(err.message || 'An error occurred while connecting to the secure full-stack backend endpoint.');
    }
  };

  const socialLinks = [
    { name: "GitHub Repository", url: "https://github.com", icon: <Github size={15} /> },
    { name: "LinkedIn Profile", url: "https://linkedin.com", icon: <Linkedin size={15} /> },
    { name: "Twitter Stream", url: "https://twitter.com", icon: <Twitter size={15} /> },
    { name: "E-mail Pipeline", url: "mailto:hello@smtech.io", icon: <Mail size={15} /> },
  ];

  return (
    <section 
      id="contact" 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200 dark:border-slate-800 relative"
    >
      {/* Background radial soft light */}
      <div className="absolute left-1/3 top-10 w-96 h-96 bg-pink-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
        
        {/* Info Grid segment (occupies 5 columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest font-mono text-indigo-500 font-bold">
              // SECURE COMMUNICATION COORDINATES
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Contact SMTech
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Initiate a high-performance contract request or consult our social routing matrices. Your request translates into a secure transient telemetry buffer instantly.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/60">
            <h3 className="text-xs uppercase font-mono text-slate-400 font-bold">DIRECTORY PIPELINE COORDINATES</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  referrerPolicy="no-referrer"
                  className="flex items-center gap-2.5 p-3 rounded-lg border border-slate-200/60 dark:border-gray-800/80 hover:border-indigo-500/50 hover:bg-slate-100/50 dark:hover:bg-slate-800/40 text-xs text-slate-600 dark:text-slate-300 hover:text-indigo-500 group transition-all font-medium"
                >
                  <div className="text-slate-400 group-hover:text-indigo-500 transition-colors">
                    {link.icon}
                  </div>
                  <span>{link.name}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50/50 dark:bg-[#090b16]/50 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
            <p className="font-semibold text-slate-700 dark:text-indigo-400 font-mono text-[11px] mb-1 uppercase">// SLA Guarantee</p>
            <span>Transactions are synchronized and checked during daily UK sprint sessions. Active client payloads are addressed core-first.</span>
          </div>
        </div>

        {/* Transactional Form segment (occupies 7 columns) */}
        <div className="lg:col-span-7 bg-white/60 dark:bg-slate-900/40 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-md">
          <form onSubmit={handleContactSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name field */}
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Client Identifier (Name) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 rounded-lg bg-slate-50/70 dark:bg-gray-900 border border-slate-200 dark:border-gray-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
                />
              </div>

              {/* Email field */}
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Routing Target (Email) *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. client@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 rounded-lg bg-slate-50/70 dark:bg-gray-900 border border-slate-200 dark:border-gray-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            {/* Subject field */}
            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Namespace Segment (Subject)
              </label>
              <input
                type="text"
                placeholder="e.g. Multi-Region Pipeline Contract"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full text-xs px-3 py-2.5 rounded-lg bg-slate-50/70 dark:bg-gray-900 border border-slate-200 dark:border-gray-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
              />
            </div>

            {/* Message field */}
            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Message Telemetry Body *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Describe project constraints, bandwidth, and stack requirements..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full text-xs px-3 py-2.5 rounded-lg bg-slate-50/70 dark:bg-gray-900 border border-slate-200 dark:border-gray-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-900 dark:text-slate-100 resize-none font-sans"
              />
            </div>

            {/* Honeypot Spam Decoy Field: invisible to human users, ignored by screen readers, fills by automate bot scripts */}
            <div className="absolute opacity-0 pointer-events-none -z-50 h-0 w-0 overflow-hidden" aria-hidden="true">
              <label htmlFor="websiteTokenUrl">Do not fill this field if you are human</label>
              <input
                id="websiteTokenUrl"
                type="text"
                name="websiteTokenUrl"
                tabIndex={-1}
                value={websiteTokenUrl}
                onChange={(e) => setWebsiteTokenUrl(e.target.value)}
                autoComplete="off"
              />
            </div>

            {/* Feedback Banners */}
            {formState === "error" && (
              <div className="flex gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-500 text-left animate-shake">
                <AlertCircle size={15} className="shrink-0 text-red-500 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {formState === "success" && (
              <div className="flex gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-xs text-green-600 dark:text-green-400 text-left items-center">
                <CheckCircle2 size={16} className="shrink-0 text-green-500" />
                <div className="flex-1">
                  <p className="font-semibold text-[13px]">Secure packet processed!</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Your communication has been registered in the persistent logs partition.</p>
                </div>
              </div>
            )}

            {/* Submit Action */}
            <button
              type="submit"
              disabled={formState === "sending" || formState === "success"}
              className={`w-full py-3 rounded-xl text-xs font-bold font-mono uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer border transform transition-all shadow-md ${
                formState === "sending"
                  ? "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-gray-800 text-slate-400 pointer-events-none"
                  : formState === "success"
                  ? "bg-green-500/10 border-green-550/20 text-green-500 cursor-default shadow-none"
                  : "bg-indigo-600 hover:bg-indigo-550 hover:shadow-indigo-500/20 text-white border-transparent active:scale-98"
              }`}
            >
              {formState === "sending" ? (
                <>
                  <Loader2 size={13} className="animate-spin text-indigo-500" />
                  Encrypting Payload Packet...
                </>
              ) : formState === "success" ? (
                <>
                  <CheckCircle2 size={13} />
                  Packet Logged Successfully
                </>
              ) : (
                <>
                  <Send size={12} />
                  Encrypt and Send Payload
                </>
              )}
            </button>

          </form>
        </div>

      </div>
    </section>
  );
}
