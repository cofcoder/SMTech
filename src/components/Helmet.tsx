import React, { useEffect } from 'react';

interface HelmetProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  ogUrl?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  author?: string;
  robots?: string;
}

/**
 * Helmet component to manage document head tags.
 * Leverages React 19 native document metadata hoisting while pairing with
 * dynamic, reactive DOM synchronization for Open Graph, canonical links, and Twitter Card assets.
 */
export default function Helmet({
  title = "SMTech // Freelance Web Developer Storefront",
  description = "Bespoke high-performance web optimization, client-authoring interactive Kanban dashboards, and sleek Bento grid typography layouts designed by SMTech.",
  keywords = "Freelance Web Developer, React 19, TailwindCSS, Bento Grid, Interactive Kanban, UI UX Portfolio, UK Developer, Frontend Engineer",
  canonicalUrl = "https://smtech-portfolio-showcase.example.com",
  ogTitle = "SMTech // Freelance Web Developer Storefront",
  ogDescription = "Bespoke high-performance web optimization and sleek Bento grid layouts.",
  ogImage = "https://smtech-portfolio-showcase.example.com/assets/showcase-banner.png",
  ogType = "website",
  ogUrl = "https://smtech-portfolio-showcase.example.com",
  twitterCard = "summary_large_image",
  twitterTitle = "SMTech // Freelance Web Developer Storefront",
  twitterDescription = "Bespoke high-performance web optimization and sleek Bento grid layouts.",
  twitterImage = "https://smtech-portfolio-showcase.example.com/assets/showcase-banner.png",
  author = "SMTech Developer",
  robots = "index, follow"
}: HelmetProps) {

  useEffect(() => {
    // Synchronize the main page title
    if (title) {
      document.title = title;
    }

    // Helper utility to safely manage key meta tags
    const updateOrCreateMetaTag = (selector: string, attributes: Record<string, string>) => {
      let element = document.querySelector(selector) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        Object.entries(attributes).forEach(([key, val]) => {
          element?.setAttribute(key, val);
        });
        document.head.appendChild(element);
      } else {
        Object.entries(attributes).forEach(([key, val]) => {
          element?.setAttribute(key, val);
        });
      }
      return element;
    };

    // Helper utility to safely manage key link tags (canonical)
    const updateOrCreateLinkTag = (selector: string, attributes: Record<string, string>) => {
      let element = document.querySelector(selector) as HTMLLinkElement | null;
      if (!element) {
        element = document.createElement('link');
        Object.entries(attributes).forEach(([key, val]) => {
          element?.setAttribute(key, val);
        });
        document.head.appendChild(element);
      } else {
        Object.entries(attributes).forEach(([key, val]) => {
          element?.setAttribute(key, val);
        });
      }
      return element;
    };

    // Update standard metadata
    updateOrCreateMetaTag('meta[name="description"]', { name: 'description', content: description });
    updateOrCreateMetaTag('meta[name="keywords"]', { name: 'keywords', content: keywords });
    updateOrCreateMetaTag('meta[name="author"]', { name: 'author', content: author });
    updateOrCreateMetaTag('meta[name="robots"]', { name: 'robots', content: robots });

    // Update Open Graph metadata
    updateOrCreateMetaTag('meta[property="og:title"]', { property: 'og:title', content: ogTitle || title });
    updateOrCreateMetaTag('meta[property="og:description"]', { property: 'og:description', content: ogDescription || description });
    updateOrCreateMetaTag('meta[property="og:image"]', { property: 'og:image', content: ogImage });
    updateOrCreateMetaTag('meta[property="og:type"]', { property: 'og:type', content: ogType });
    updateOrCreateMetaTag('meta[property="og:url"]', { property: 'og:url', content: ogUrl || canonicalUrl });

    // Update Twitter Card metadata
    updateOrCreateMetaTag('meta[name="twitter:card"]', { name: 'twitter:card', content: twitterCard });
    updateOrCreateMetaTag('meta[name="twitter:title"]', { name: 'twitter:title', content: twitterTitle || title });
    updateOrCreateMetaTag('meta[name="twitter:description"]', { name: 'twitter:description', content: twitterDescription || description });
    updateOrCreateMetaTag('meta[name="twitter:image"]', { name: 'twitter:image', content: twitterImage });

    // Update Canonical link
    if (canonicalUrl) {
      updateOrCreateLinkTag('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl });
    }
  }, [
    title,
    description,
    keywords,
    canonicalUrl,
    ogTitle,
    ogDescription,
    ogImage,
    ogType,
    ogUrl,
    twitterCard,
    twitterTitle,
    twitterDescription,
    twitterImage,
    author,
    robots
  ]);

  // Under React 19, metadata tags rendered directly are natively hoisted to the document head
  return (
    <React.Fragment>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl || canonicalUrl} />
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={twitterTitle || title} />
      <meta name="twitter:description" content={twitterDescription || description} />
      <meta name="twitter:image" content={twitterImage} />
    </React.Fragment>
  );
}
