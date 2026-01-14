// src/app/contact/page.tsx
import PreHeader from "@/components/PreHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import ScrollReveal from "@/components/ScrollReveal";
import { brand } from "@/lib/brand";

export const metadata = {
  title: `Contact • ${brand.name}`,
};

const hours = [
  { d: "Maandag", t: "08:00 – 18:00" },
  { d: "Dinsdag", t: "08:00 – 18:00" },
  { d: "Woensdag", t: "08:00 – 18:00" },
  { d: "Donderdag", t: "08:00 – 18:00" },
  { d: "Vrijdag", t: "08:00 – 18:00" },
  { d: "Zaterdag", t: "09:00 – 16:00" },
  { d: "Zondag", t: "Gesloten" },
];

function telHref(phone: string) {
  const cleaned = phone.trim();
  return cleaned.startsWith("tel:") ? cleaned : `tel:${cleaned.replace(/\s+/g, "")}`;
}

function mapSrcFromAddress(address: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
}

export default function Page() {
  return (
    <>
      <ScrollReveal />
      <PreHeader />
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-extrabold">Contact</h1>

        <div className="mt-8 grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-xl p-6 border border-black/10">
              <h2 className="text-xl font-bold">Vrijblijvende offerte</h2>
              <p className="text-sm opacity-80">Vul je gegevens in. We reageren snel.</p>
              <div className="mt-4">
                <ContactForm />
              </div>
            </div>

            <div className="bg-white rounded-xl p-0 overflow-hidden border border-black/10">
              <iframe
                title={`${brand.name} kaart`}
                width="100%"
                height="380"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={mapSrcFromAddress(brand.address)}
              />
            </div>
          </div>

          <aside className="bg-white rounded-xl p-6 border border-black/10">
            <h2 className="text-xl font-bold">Gegevens</h2>

            <div className="mt-3 space-y-2 text-sm">
              <p>
                <b>Adres:</b>
                <br />
                {brand.address}
              </p>

              <p>
                <b>Telefoon:</b>{" "}
                <a className="underline" href={telHref(brand.phone)}>
                  {brand.phone}
                </a>
              </p>

              {/* Keep email centralized via env; if you want it in brand later, we can add it */}
              <p>
                <b>E-mail:</b>{" "}
                <a className="underline" href="mailto:info@komtifix.nl">
                  info@komtifix.nl
                </a>
              </p>
            </div>

            <h3 className="mt-6 font-semibold">Openingstijden</h3>
            <ul className="mt-2 text-sm space-y-1">
              {hours.map((h) => (
                <li key={h.d} className="flex justify-between gap-3">
                  <span className="opacity-80">{h.d}</span>
                  <span>{h.t}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
}
