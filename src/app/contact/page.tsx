import PreHeader from "@/components/PreHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata = {
  title: "Contact • Klusdam",
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
              {/* Google Maps embed (address centered) */}
              <iframe
                title="Klusdam kaart"
                width="100%"
                height="380"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=Von%20Leibnizstraat%2023a%2C%203112%20XN%20Schiedam&output=embed`}
              />
            </div>
          </div>

          <aside className="bg-white rounded-xl p-6 border border-black/10">
            <h2 className="text-xl font-bold">Gegevens</h2>
            <div className="mt-3 space-y-2 text-sm">
              <p><b>Adres:</b><br/>Von Leibnizstraat 23 a<br/>3112 XN Schiedam</p>
              <p><b>Telefoon:</b> <a className="underline" href="tel:+31634099060">06 34099060</a></p>
              <p><b>E-mail:</b> <a className="underline" href="mailto:info@klusdam.nl">info@klusdam.nl</a></p>
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
