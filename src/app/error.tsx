"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold">
        Er ging iets mis
      </h1>

      <p className="mt-4 text-lg opacity-80">
        Onze excuses. Er is een onverwachte fout opgetreden. Probeer het opnieuw
        of ga terug naar de homepage.
      </p>

      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          onClick={reset}
          className="bg-bronze text-charcoal px-5 py-3 rounded font-semibold hover:opacity-90 transition"
        >
          Opnieuw proberen
        </button>

        <a
          href="/"
          className="border border-charcoal px-5 py-3 rounded font-semibold hover:bg-charcoal hover:text-white transition"
        >
          Home
        </a>
      </div>
    </main>
  );
}
