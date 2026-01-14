// src/app/diensten/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "@/lib/services";
import Navbar from "@/components/Navbar";
import PreHeader from "@/components/PreHeader";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ServiceContent from "@/components/ServiceContent";
import { ServiceJSON } from "@/components/SEO";
import { brand } from "@/lib/brand";

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const svc = services.find((s) => s.slug === slug);
  if (!svc) return {};

  const title = `${brand.name} • ${brand.location.city}`;
  const description = `Learn more about this ${brand.name} service in ${brand.location.city}. Request a quote today.`;

  return {
    title,
    description,
    alternates: { canonical: `${brand.url}/diensten/${svc.slug}` },
    openGraph: {
      title,
      description,
      url: `${brand.url}/diensten/${svc.slug}`,
      siteName: brand.name,
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: brand.name }],
      locale: "nl_NL",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.jpg"],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const svc = services.find((s) => s.slug === slug);
  if (!svc) return notFound();

  return (
    <>
      <ScrollReveal />
      <PreHeader />
      <Navbar />
      <ServiceContent svc={svc} />
      <ServiceJSON slug={svc.slug} />
      <Footer />
    </>
  );
}
