// src/app/voorwaarden/page.tsx
import PreHeader from "@/components/PreHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { brand } from "@/lib/brand";

export const metadata = {
  title: `Voorwaarden • ${brand.name}`,
};

export default function VoorwaardenPage() {
  return (
    <>
      <ScrollReveal />
      <PreHeader />
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-extrabold">Algemene voorwaarden</h1>
        <p className="mt-3 opacity-80">
          Dit is een eenvoudige basisversie. Voor juridische zekerheid: laat dit later controleren door een jurist.
        </p>

        <div className="mt-10 space-y-8">
          <section className="bg-white rounded-xl p-6 border border-black/10">
            <h2 className="text-xl font-bold">1. Bedrijfsgegevens</h2>
            <p className="mt-2 text-sm opacity-80">
              {brand.name} – {brand.address} – {brand.phone}
            </p>
          </section>

          <section className="bg-white rounded-xl p-6 border border-black/10">
            <h2 className="text-xl font-bold">2. Offertes en afspraken</h2>
            <ul className="mt-3 list-disc pl-5 space-y-2 text-sm opacity-80">
              <li>Offertes zijn vrijblijvend tenzij anders vermeld.</li>
              <li>Werk start na akkoord op offerte of afspraak.</li>
              <li>Wijzigingen kunnen invloed hebben op prijs en planning.</li>
            </ul>
          </section>

          <section className="bg-white rounded-xl p-6 border border-black/10">
            <h2 className="text-xl font-bold">3. Betaling</h2>
            <ul className="mt-3 list-disc pl-5 space-y-2 text-sm opacity-80">
              <li>Betaling volgens afspraak (bijv. na oplevering of in termijnen).</li>
              <li>Bij grote projecten kan een aanbetaling worden gevraagd.</li>
            </ul>
          </section>

          <section className="bg-white rounded-xl p-6 border border-black/10">
            <h2 className="text-xl font-bold">4. Uitvoering en oplevering</h2>
            <ul className="mt-3 list-disc pl-5 space-y-2 text-sm opacity-80">
              <li>Wij werken netjes en volgens planning, maar overmacht kan vertraging veroorzaken.</li>
              <li>Oplevering gebeurt in overleg; zichtbare punten graag direct melden.</li>
            </ul>
          </section>

          <section className="bg-white rounded-xl p-6 border border-black/10">
            <h2 className="text-xl font-bold">5. Garantie en aansprakelijkheid</h2>
            <ul className="mt-3 list-disc pl-5 space-y-2 text-sm opacity-80">
              <li>Wij lossen aantoonbare fouten in ons werk in redelijkheid op.</li>
              <li>Schade door verkeerd gebruik of externe oorzaken valt buiten garantie.</li>
            </ul>
          </section>

          <section className="bg-white rounded-xl p-6 border border-black/10">
            <h2 className="text-xl font-bold">6. Annuleren</h2>
            <p className="mt-2 text-sm opacity-80">
              Annuleren kan. Als er al kosten zijn gemaakt (materiaal/bestellingen/uren), kunnen die worden doorberekend.
            </p>
          </section>

          <p className="text-xs opacity-60">
            Laatst bijgewerkt: {new Date().toLocaleDateString("nl-NL")}
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
