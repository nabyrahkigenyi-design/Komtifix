import PreHeader from "@/components/PreHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesGrid from "@/components/ServicesGrid";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata = { title: "Diensten • Klusdam" };

export default function DienstenIndex() {
  return (
    <>
      <ScrollReveal />
      <PreHeader />
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-12">
        <section className="mb-8" data-reveal>
          <h1 className="text-3xl md:text-4xl font-extrabold">Onze diensten</h1>
          <p className="mt-2 opacity-80">
            Kies een categorie en vraag direct een vrijblijvende offerte aan.
          </p>
        </section>

        {/* Cards for all services */}
        <ServicesGrid />
      </main>
      <Footer />
    </>
  );
}
