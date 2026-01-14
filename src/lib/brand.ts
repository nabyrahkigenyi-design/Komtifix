// src/lib/brand.ts
export const brand = {
  name: "Komtifix",
  owner: "Abdul Rahman Al Hussein",

  phone: "0633002254",
  address: "Pr. Annalaan 343, 2263 XK Leidschendam",
  url: "https://komtifix.nl",

  location: {
    city: "Leidschendam",
    region: "Zuid-Holland",
    country: "NL",
  },

  /**
   * Social media profiles
   * - Leave "" if not available (icons will auto-hide)
   * - WhatsApp is generated automatically from `phone`
   */
  socials: {
    facebook: "https://facebook.com/komtifix",      // e.g. "https://facebook.com/komtifix"
    instagram: "https://instagram.com/komtifix",     // e.g. "https://instagram.com/komtifix"
    linkedin: "https://linkedin.com/company/komtifix",      // e.g. "https://linkedin.com/company/komtifix"
  },

  seo: {
    description:
      "Komtifix in Leidschendam: handyman & onderhoud voor woning en bedrijf. Schilderwerk, timmerwerk, sanitair, tegels, kleine renovaties. Gratis offerte.",
    ogDescription:
      "Handyman & onderhoud in Leidschendam. Snel, netjes en betrouwbaar. Vraag een gratis offerte aan.",
    twitterDescription:
      "Handyman & onderhoud in Leidschendam. Snel, netjes en betrouwbaar.",
  },
} as const;
