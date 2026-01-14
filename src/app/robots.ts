import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://komtifix.nl";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
