// src/app/privacy/page.tsx
import PreHeader from "@/components/PreHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { brand } from "@/lib/brand";

export const metadata = {
  title: `Privacy • ${brand.name}`,
};

export default function PrivacyPage() {
  return (
    <>
      <ScrollReveal />
      <PreHeader />
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-extrabold">Privacyverklaring</h1>
        <p className="mt-3 opacity-80">
          Hieronder leggen we uit welke gegevens we verzamelen, waarom we dat doen en hoe we ermee omgaan.
        </p>

        <div className="mt-10 space-y-8">
          <section className="bg-white rounded-xl p-6 border border-black/10">
            <h2 className="text-xl font-bold">1. Wie zijn wij?</h2>
            <p className="mt-2 text-sm opacity-80">
              {brand.name} – {brand.address} – {brand.phone}
            </p>
          </section>

          <section className="bg-white rounded-xl p-6 border border-black/10">
            <h2 className="text-xl font-bold">2. Welke gegevens verzamelen we?</h2>
            <ul className="mt-3 list-disc pl-5 space-y-2 text-sm opacity-80">
              <li>Naam</li>
              <li>E-mailadres</li>
              <li>Telefoonnummer (optioneel)</li>
              <li>Gekozen dienst (optioneel)</li>
              <li>Berichtinhoud die je zelf invult</li>
            </ul>
          </section>

          <section className="bg-white rounded-xl p-6 border border-black/10">
            <h2 className="text-xl font-bold">3. Waarom verzamelen we deze gegevens?</h2>
            <ul className="mt-3 list-disc pl-5 space-y-2 text-sm opacity-80">
              <li>Om contact met je op te nemen over je aanvraag/offerte.</li>
              <li>Om je bericht goed te kunnen beantwoorden.</li>
              <li>Om onze dienstverlening te verbeteren.</li>
            </ul>
          </section>

          <section className="bg-white rounded-xl p-6 border border-black/10">
            <h2 className="text-xl font-bold">4. Hoe lang bewaren we gegevens?</h2>
            <p className="mt-2 text-sm opacity-80">
              We bewaren contactaanvragen niet langer dan nodig. Offerte- en klantcommunicatie kan langer worden bewaard
              voor administratie en service.
            </p>
          </section>

          <section className="bg-white rounded-xl p-6 border border-black/10">
            <h2 className="text-xl font-bold">5. Delen met derden</h2>
            <p className="mt-2 text-sm opacity-80">
              We delen je gegevens alleen als dat nodig is om jouw aanvraag te verwerken (bijv. e-mailverzending) of
              wanneer we dat wettelijk moeten.
            </p>
          </section>

          <section className="bg-white rounded-xl p-6 border border-black/10">
            <h2 className="text-xl font-bold">6. Jouw rechten</h2>
            <ul className="mt-3 list-disc pl-5 space-y-2 text-sm opacity-80">
              <li>Inzage in je gegevens</li>
              <li>Correctie of verwijdering</li>
              <li>Bezwaar tegen verwerking</li>
            </ul>
            <p className="mt-3 text-sm opacity-80">
              Neem contact op via de contactpagina als je hiervan gebruik wilt maken.
            </p>
          </section>

          <section className="bg-white rounded-xl p-6 border border-black/10">
            <h2 className="text-xl font-bold">7. Cookies</h2>
            <p className="mt-2 text-sm opacity-80">
              We gebruiken functionele cookies (bijv. voor taalkeuze). Als je later tracking/analytics toevoegt, moet
              dit stuk worden uitgebreid.
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
