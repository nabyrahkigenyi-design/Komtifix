// src/app/diensten/page.tsx
import type { Metadata } from "next";
import PreHeader from "@/components/PreHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesGrid from "@/components/ServicesGrid";
import ScrollReveal from "@/components/ScrollReveal";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Services • ${brand.name}`,
  description: `Explore all ${brand.name} services in ${brand.location.city} and the surrounding area. Request a quote in minutes.`,
  alternates: { canonical: `${brand.url}/diensten` },
  openGraph: {
    title: `Services • ${brand.name}`,
    description: `Explore all ${brand.name} services in ${brand.location.city} and the surrounding area. Request a quote in minutes.`,
    url: `${brand.url}/diensten`,
    siteName: brand.name,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: brand.name }],
    locale: "nl_NL",
    type: "website",
  },
};

export default function DienstenIndex() {
  return (
    <>
      <ScrollReveal />
      <PreHeader />
      <Navbar />

      <main className="bg-ivory">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <section className="mb-10" data-reveal>
            <h1 className="font-serif text-3xl md:text-5xl tracking-tight">
              {brand.name} Services
            </h1>
            <p className="mt-3 text-black/70 max-w-2xl">
              Serving {brand.location.city} and nearby areas. Choose a service and request a quote.
            </p>
          </section>

          {/* All services (no “all services” link, no limit) */}
          <ServicesGrid mode="all" limit={999} showAllLink={false} />
        </div>
      </main>

      <Footer />
    </>
  );
}
