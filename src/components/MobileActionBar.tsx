"use client";

import SocialLinks from "./SocialLinks";

export default function MobileActionBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden pointer-events-none">
      <div className="mx-auto max-w-7xl px-4 pb-[env(safe-area-inset-bottom)]">
        <div className="pointer-events-auto mb-3 flex gap-3">
          <a
            href="https://wa.me/31634099060?text=Hallo%20Klusdam%2C%20ik%20heb%20een%20vraag%20over%20een%20offerte."
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center rounded-xl bg-green-500/90 text-white font-semibold py-3"
          >
            WhatsApp
          </a>
          <a
            href="tel:+31634099060"
            className="flex-1 text-center rounded-xl bg-bronze text-charcoal font-semibold py-3"
          >
            Bel
          </a>
        </div>
      </div>
    </div>
  );
}
