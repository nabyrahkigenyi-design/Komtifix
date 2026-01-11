"use client";

type Props = {
  className?: string;
  size?: number; // px
};

// Update these URLs to your real accounts.
// WhatsApp uses the international format without leading 0.
const LINKS = {
  whatsapp: "https://wa.me/31634099060?text=Hallo%20Klusdam%2C%20ik%20heb%20een%20vraag%20over%20een%20offerte.",
  facebook: "https://www.facebook.com/klusdam",   // <— vervang
  instagram: "https://www.instagram.com/klusdam", // <— vervang
  linkedin: "https://www.linkedin.com/company/klusdam", // <— vervang
};

export default function SocialLinks({ className = "", size = 22 }: Props) {
  const iconClass = "hover:text-bronze transition-colors";
  const s = { width: size, height: size };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* WhatsApp */}
      <a className={iconClass} href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        <svg viewBox="0 0 32 32" style={s} fill="currentColor" aria-hidden="true">
          <path d="M19.1 17.4c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.3-.7.1c-.9-.5-1.6-1.2-2.1-2.1-.2-.4 0-.6.1-.8.1-.1.2-.3.3-.4s.1-.2.2-.3.1-.2 0-.3c0-.1-.7-1.7-.9-2.3-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.4.2-.6.4-.2.3-.8.8-.8 2s.8 2.3.9 2.4c.1.2 1.6 2.4 3.9 3.3.5.2.9.3 1.2.4.5.1 1 .1 1.4.1.4 0 1.3-.3 1.5-.8.2-.4.2-.8.1-.9zM26.9 5.1C24.1 2.3 20.3 1 16.6 1 9.1 1 3.1 7 3.1 14.5c0 2.4.6 4.7 1.8 6.8L3 31l9-1.9c2 .9 4.1 1.3 6.2 1.3 7.5 0 13.5-6 13.5-13.5 0-3.7-1.3-7.5-4.1-10.3zm-10.3 23c-2 0-3.9-.5-5.7-1.3l-.4-.2-5.4 1.1 1.1-5.3-.2-.4c-1.1-1.7-1.6-3.7-1.6-5.8C4.4 8 9.9 2.5 16.6 2.5c3.2 0 6.2 1.2 8.4 3.4 2.2 2.2 3.4 5.2 3.4 8.4 0 6.7-5.5 12.2-12.2 12.2z"/>
        </svg>
      </a>

      {/* Facebook */}
      <a className={iconClass} href={LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
        <svg viewBox="0 0 24 24" style={s} fill="currentColor" aria-hidden="true">
          <path d="M22 12.06C22 6.48 17.52 2 11.94 2S2 6.48 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.89 3.76-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34V22c4.78-.79 8.45-4.94 8.45-9.94z"/>
        </svg>
      </a>

      {/* Instagram */}
      <a className={iconClass} href={LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        <svg viewBox="0 0 24 24" style={s} fill="currentColor" aria-hidden="true">
          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5zM18 6.8a1.2 1.2 0 1 1-1.2 1.2A1.2 1.2 0 0 1 18 6.8z"/>
        </svg>
      </a>

      {/* LinkedIn */}
      <a className={iconClass} href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
        <svg viewBox="0 0 24 24" style={s} fill="currentColor" aria-hidden="true">
          <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4zm7.5 0h3.83v1.98h.05c.53-1 1.83-2.06 3.77-2.06 4.04 0 4.79 2.66 4.79 6.12V23h-3.99v-6.64c0-1.58-.03-3.62-2.2-3.62-2.2 0-2.54 1.72-2.54 3.51V23H8z"/>
        </svg>
      </a>
    </div>
  );
}
