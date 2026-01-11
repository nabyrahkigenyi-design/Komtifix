"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Crumb = { href: string; label: string };

export default function Breadcrumbs({
  trail,
  className = "",
}: {
  trail?: Crumb[]; // optional override
  className?: string;
}) {
  const path = usePathname();

  // Fallback: auto from path
  const auto: Crumb[] = path
    .split("/")
    .filter(Boolean)
    .map((seg, i, arr) => {
      const href = "/" + arr.slice(0, i + 1).join("/");
      const label = decodeURIComponent(seg)
        .replace(/-/g, " ")
        .replace(/\b\w/g, (m) => m.toUpperCase());
      return { href, label };
    });

  const crumbs = [{ href: "/", label: "Home" }, ...(trail ?? auto)];

  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${className}`}>
      <ol className="flex flex-wrap items-center gap-1 text-charcoal/70">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-1">
              {i > 0 && <span aria-hidden>›</span>}
              {last ? (
                <span className="font-semibold text-charcoal">{c.label}</span>
              ) : (
                <Link href={c.href} className="hover:underline">
                  {c.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
