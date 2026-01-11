export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold">Pagina niet gevonden</h1>
      <p className="mt-4 text-lg opacity-80">
        Oeps, deze pagina bestaat niet (404). Ga terug naar de homepage of bekijk onze diensten.
      </p>
      <div className="mt-8 flex items-center justify-center gap-3">
        <a href="/" className="bg-bronze text-charcoal px-5 py-3 rounded font-semibold">Home</a>
        <a href="/diensten" className="border border-charcoal px-5 py-3 rounded font-semibold">Alle diensten</a>
      </div>
    </main>
  );
}
