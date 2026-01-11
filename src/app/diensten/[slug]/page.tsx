import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "../../../lib/services";
import Navbar from "../../../components/Navbar";
import PreHeader from "../../../components/PreHeader";
import Footer from "../../../components/Footer";
import ScrollReveal from "../../../components/ScrollReveal";
import ServiceContent from "../../../components/ServiceContent";
import { ServiceJSON } from "../../../components/SEO";

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

  // Service uses i18n keys now; generateMetadata is server-side.
  // Use Dutch as a safe fallback for the page title.
  return svc ? { title: `${svc.titleKey} • Klusdam` } : {};
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
