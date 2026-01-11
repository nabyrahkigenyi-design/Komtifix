"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { PROJECT_CATEGORIES, projects, type CategoryKey, categoryCounts } from "@/lib/projects";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import BlurImage from "./BlurImage";
import Breadcrumbs from "./Breadcrumbs";
import { useI18n } from "@/lib/i18n";

type Point = { clientX: number; clientY: number };

// Use a key for "All" so it translates
const ALL = "all" as const;
type CatFilter = typeof ALL | CategoryKey;

type ImageItem = {
  projectId: string;
  titleKey: string;
  categoryKey: CategoryKey;
  src: string;
  idxInAlbum: number;
};

function cx(...cls: (string | false | null | undefined)[]) {
  return cls.filter(Boolean).join(" ");
}

// Ensure local paths work from any route (e.g. /projecten, /diensten/slug)
function normalizeSrc(src: string) {
  if (!src) return src;
  const s = src.trim();
  if (s.startsWith("http://") || s.startsWith("https://")) return s;
  if (s.startsWith("/")) return s;
  return `/${s}`;
}

export default function Gallery() {
  const { t } = useI18n();

  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  // IMPORTANT:
  // URLSearchParams.get() already returns decoded values.
  // Do NOT decodeURIComponent here; it can throw on malformed sequences.
  const catFromUrl = (params.get("cat") || "") as CategoryKey;
  const initialCat: CatFilter = PROJECT_CATEGORIES.includes(catFromUrl) ? catFromUrl : ALL;

  const [category, setCategory] = useState<CatFilter>(initialCat);
  const [query, setQuery] = useState("");

  // keep URL in sync
  useEffect(() => {
    const next = new URLSearchParams(params.toString());
    if (category === ALL) next.delete("cat");
    else next.set("cat", category); // no encodeURIComponent; URLSearchParams will encode safely
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const allImageItems: ImageItem[] = useMemo(() => {
    const items: ImageItem[] = [];
    for (const p of projects) {
      p.images.forEach((src, idx) =>
        items.push({
          projectId: p.id,
          titleKey: p.titleKey,
          categoryKey: p.categoryKey,
          src: normalizeSrc(src),
          idxInAlbum: idx,
        })
      );
    }
    return items;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return allImageItems.filter((it) => {
      const byCat = category === ALL ? true : it.categoryKey === category;
      const byQ = !q || t(it.titleKey).toLowerCase().includes(q);
      return byCat && byQ;
    });
  }, [allImageItems, category, query, t]);

  const counts = categoryCounts();

  // Lightbox state
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const lastTap = useRef<number>(0);
  const [showUI, setShowUI] = useState(true);

  // pinch
  const pinchStartDist = useRef<number | null>(null);
  const pinchStartZoom = useRef<number>(1);
  const pinchStartOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const pinchCenter = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // swipe (when zoom=1)
  const swipeStart = useRef<{ x: number; y: number; t: number } | null>(null);

  // used to limit pan at zoom>1
  const boxRef = useRef<HTMLDivElement>(null);

  function resetTransform() {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  }

  function openAt(idx: number) {
    setIndex(idx);
    setShowUI(true);
    resetTransform();
    setOpen(true);
  }

  function close() {
    setOpen(false);
  }

  function next() {
    setIndex((i) => (i + 1) % filtered.length);
    setShowUI(true);
    resetTransform();
  }

  function prev() {
    setIndex((i) => (i - 1 + filtered.length) % filtered.length);
    setShowUI(true);
    resetTransform();
  }

  // lock body scroll when open
  useEffect(() => {
    if (open) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [open]);

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, filtered.length]);

  // Helpers
  function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
  }
  function limitX(z: number) {
    const w = boxRef.current?.clientWidth ?? 1000;
    return (w * (z - 1)) / 2;
  }
  function limitY(z: number) {
    const h = boxRef.current?.clientHeight ?? 800;
    return (h * (z - 1)) / 2;
  }
  function clampOffset(x: number, y: number, z: number) {
    return { x: clamp(x, -limitX(z), limitX(z)), y: clamp(y, -limitY(z), limitY(z)) };
  }

  function toggleZoom() {
    setZoom((z) => {
      const nz = z === 1 ? 2 : 1;
      if (nz === 1) setOffset({ x: 0, y: 0 });
      return nz;
    });
  }

  // Mouse pan (only when zoomed)
  function onMouseDown(e: React.MouseEvent) {
    if (zoom === 1) return;
    dragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
  }
  function onMouseMove(e: React.MouseEvent) {
    if (!dragging.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    lastPos.current = { x: e.clientX, y: e.clientY };
    setOffset((o) => clampOffset(o.x + dx, o.y + dy, zoom));
  }
  function onMouseUp() {
    dragging.current = false;
  }

  // Only zoom with wheel when already zoomed in.
  // Otherwise allow normal scroll to view tall images.
  function onWheel(e: React.WheelEvent) {
    if (!open) return;
    if (zoom === 1) return;

    e.preventDefault();
    const delta = -e.deltaY * 0.0015;
    setZoom((z) => {
      const nz = clamp(z + delta, 1, 4);
      if (nz === 1) setOffset({ x: 0, y: 0 });
      else setOffset((o) => clampOffset(o.x, o.y, nz));
      return nz;
    });
  }

  // Touch
  function getDistance(t1: Point, t2: Point) {
    const dx = t2.clientX - t1.clientX;
    const dy = t2.clientY - t1.clientY;
    return Math.hypot(dx, dy);
  }
  function getCenter(t1: Point, t2: Point) {
    return { x: (t1.clientX + t2.clientX) / 2, y: (t1.clientY + t2.clientY) / 2 };
  }

  function onTouchStart(e: React.TouchEvent) {
    if (e.touches.length === 2) {
      const [t1, t2] = [e.touches[0], e.touches[1]];
      pinchStartDist.current = getDistance(t1, t2);
      pinchStartZoom.current = zoom;
      pinchStartOffset.current = { ...offset };
      pinchCenter.current = getCenter(t1, t2);
      return;
    }

    if (e.touches.length === 1) {
      swipeStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, t: Date.now() };

      const now = Date.now();
      if (now - lastTap.current < 280) toggleZoom();
      lastTap.current = now;

      if (zoom > 1) {
        dragging.current = true;
        lastPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    }
  }

  function onTouchMove(e: React.TouchEvent) {
    // pinch
    if (e.touches.length === 2 && pinchStartDist.current) {
      e.preventDefault();
      const [t1, t2] = [e.touches[0], e.touches[1]];
      const dist = getDistance(t1, t2);
      const scaleDelta = dist / pinchStartDist.current;
      const newZoom = clamp(pinchStartZoom.current * scaleDelta, 1, 4);

      const c = getCenter(t1, t2);
      const dx = c.x - pinchCenter.current.x;
      const dy = c.y - pinchCenter.current.y;

      const ratio = newZoom / (pinchStartZoom.current || 1);
      const nx = pinchStartOffset.current.x * ratio + dx;
      const ny = pinchStartOffset.current.y * ratio + dy;

      setZoom(newZoom);
      setOffset(clampOffset(nx, ny, newZoom));
      return;
    }

    // drag when zoomed; when zoom===1, allow native vertical scroll
    if (!dragging.current || e.touches.length !== 1 || zoom === 1) return;

    e.preventDefault();
    const tt = e.touches[0];
    const dx = tt.clientX - lastPos.current.x;
    const dy = tt.clientY - lastPos.current.y;
    lastPos.current = { x: tt.clientX, y: tt.clientY };
    setOffset((o) => clampOffset(o.x + dx, o.y + dy, zoom));
  }

  function onTouchEnd(e: React.TouchEvent) {
    dragging.current = false;
    pinchStartDist.current = null;

    // swipe nav only when zoom=1
    if (zoom === 1 && swipeStart.current) {
      const start = swipeStart.current;
      const endT = Date.now() - start.t;
      const endX = (e.changedTouches && e.changedTouches[0]?.clientX) || start.x;
      const endY = (e.changedTouches && e.changedTouches[0]?.clientY) || start.y;
      const dx = endX - start.x;
      const dy = endY - start.y;

      if (endT < 500 && Math.abs(dx) > 60 && Math.abs(dy) < 80) {
        if (dx < 0) next();
        else prev();
      }
    }
    swipeStart.current = null;
  }

  const pageTitle = t("projects");
  const searchPlaceholder = t("search");

  return (
    <section className="py-16 md:py-20" data-reveal>
      <div className="mx-auto max-w-7xl px-4">
        <Breadcrumbs trail={[{ href: "/projecten", label: pageTitle }]} />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mt-2">
          <h1 className="text-3xl md:text-4xl font-extrabold">{pageTitle}</h1>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="flex flex-wrap gap-2">
              <FilterPill
                label={t("all")}
                count={allImageItems.length}
                active={category === ALL}
                onClick={() => setCategory(ALL)}
              />

              {PROJECT_CATEGORIES.map((c) => (
                <FilterPill
                  key={c}
                  label={t(c)}
                  count={counts[c] ?? 0}
                  active={category === c}
                  onClick={() => setCategory(c)}
                />
              ))}
            </div>

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`${searchPlaceholder}…`}
              className="w-full sm:w-80 rounded-lg border border-black/10 px-3 py-2"
            />
          </div>
        </div>

        <div className="mt-8 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((item, idx) => {
            const title = t(item.titleKey);
            const cat = t(item.categoryKey);

            return (
              <button
                key={`${item.projectId}-${item.idxInAlbum}`}
                className="group relative rounded-lg overflow-hidden"
                onClick={() => openAt(idx)}
                aria-label={`Open ${title}`}
              >
                <div className="relative w-full h-44 md:h-56">
                  <BlurImage
                    src={item.src}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/50 to-transparent text-white text-xs">
                  <div className="font-semibold">{title}</div>
                  <div className="opacity-80">{cat}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* SCROLLABLE LIGHTBOX */}
      {open && filtered.length > 0 && (
        <div
          className="fixed inset-0 z-[9999] bg-black overflow-y-auto"
          style={{ touchAction: zoom === 1 ? "pan-y" : "none" }}
          onClick={close}
          onWheel={onWheel}
          onDoubleClick={toggleZoom}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
        >
          {/* sticky top bar */}
          <div
            className={cx(
              "sticky top-0 z-20 p-3 flex items-center justify-between text-white transition-opacity bg-black/70 backdrop-blur",
              showUI ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="text-xl px-3 py-1.5 rounded bg-white/10 hover:bg-white/20"
              onClick={close}
            >
              ✕
            </button>

            <div className="text-sm bg-white/10 px-3 py-1 rounded">
              {index + 1} / {filtered.length}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                className="text-sm px-3 py-1.5 rounded bg-white/10 hover:bg-white/20"
                onClick={prev}
              >
                ‹ Prev
              </button>
              <button
                type="button"
                className="text-sm px-3 py-1.5 rounded bg-white/10 hover:bg-white/20"
                onClick={next}
              >
                Next ›
              </button>
              <button
                type="button"
                className="text-sm px-3 py-1.5 rounded bg-white/10 hover:bg-white/20"
                onClick={() => resetTransform()}
              >
                Reset
              </button>
            </div>
          </div>

          {/* scrollable viewport */}
          <div
            ref={boxRef}
            className="px-4 py-6 md:px-10 flex justify-center"
            onClick={(e) => {
              e.stopPropagation();
              setShowUI((v) => !v);
            }}
          >
            <img
              src={filtered[index].src}
              alt={t(filtered[index].titleKey)}
              className="select-none w-full h-auto max-w-[1200px]"
              draggable={false}
              style={
                zoom === 1
                  ? { transform: "none", transition: "none", cursor: "zoom-in" }
                  : {
                      transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                      transformOrigin: "center",
                      transition: dragging.current || pinchStartDist.current ? "none" : "transform 120ms ease",
                      cursor: "grab",
                    }
              }
            />
          </div>

          <div
            className={cx(
              "pointer-events-none fixed inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent transition-opacity",
              showUI ? "opacity-100" : "opacity-0"
            )}
          />
        </div>
      )}
    </section>
  );
}

function FilterPill({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count?: number;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "px-3 py-1.5 rounded-full text-sm border inline-flex items-center gap-2",
        active ? "bg-bronze text-charcoal border-bronze" : "bg-white border-black/10 hover:bg-cream"
      )}
    >
      <span>{label}</span>
      {typeof count === "number" && (
        <span
          className={cx(
            "text-[11px] px-1.5 py-[1px] rounded-full",
            active ? "bg-charcoal text-bronze" : "bg-black/10 text-charcoal/80"
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}
