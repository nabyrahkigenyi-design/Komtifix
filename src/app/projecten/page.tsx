import PreHeader from "@/components/PreHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Gallery from "@/components/Gallery";
import { Suspense } from "react";

export const metadata = {
  title: "Projecten • Klusdam",
};

function GalleryFallback() {
  // simple skeleton while the client params resolve
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="h-9 w-48 rounded bg-black/10" />
        <div className="mt-8 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-44 md:h-56 rounded-lg bg-black/10 animate-pulse" />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <>
      <ScrollReveal />
      <PreHeader />
      <Navbar />
      <main>
        <Suspense fallback={<GalleryFallback />}>
          <Gallery />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
