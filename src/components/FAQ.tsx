"use client";

export default function FAQ({
  items,
  title = "Veelgestelde vragen",
}: {
  items: { q: string; a: string }[];
  title?: string;
}) {
  if (!items || !items.length) return null;
  return (
    <div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className="mt-4 space-y-3">
        {items.map((f, i) => (
          <details key={i} className="group border border-black/10 rounded-lg p-3 bg-white">
            <summary className="cursor-pointer font-semibold">{f.q}</summary>
            <p className="mt-2 opacity-90 leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
