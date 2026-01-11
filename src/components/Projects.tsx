"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import BlurImage from "./BlurImage";
import { projects } from "@/lib/projects";
import { useI18n } from "@/lib/i18n";

type Point = { clientX: number; clientY: number };

export default function Projects() {
  const { t } = useI18n();

  // Flatten a handful of recent images
  const items = useMemo(() => {
    const out: { title: string; src: string }[] = [];
    for (const p of projects.slice(0, 8)) {
      const title = t(p.titleKey);
      for (const src of p.images.slice(0, 2)) out.push({ title, src });
    }
    return out.slice(0, 8);
  }, [t]);

  // Lightbox state
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const lastTap = useRef<number>(0);
  const [showUI, setShowUI] = useState(true);

  const pinchStartDist = useRef<number | null>(null);
  const pinchStartZoom = useRef<number>(1);
  const pinchStartOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const pinchCenter = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const swipeStart = useRef<{ x: number; y: number; t: number } | null>(null);

  const boxRef = useRef<HTMLDivElement>(null);

  function resetTransform() {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  }

  function openAt(i: number) {
    setIndex(i);
    setShowUI(true);
    resetTransform();
    setOpen(true);
  }

  function close() {
    setOpen(false);
  }

  function next() {
    setIndex((v) => (v + 1) % items.length);
    setShowUI(true);
    resetTransform();
  }

  function prev() {
    setIndex((v) => (v - 1 + items.length) % items.length);
    setShowUI(true);
    resetTransform();
  }

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
    return {
      x: clamp(x, -limitX(z), limitX(z)),
      y: clamp(y, -limitY(z), limitY(z)),
    };
  }

  function toggleZoom() {
    setZoom((z) => {
      const nz = z === 1 ? 2 : 1;
      if (nz === 1) setOffset({ x: 0, y: 0 });
      return nz;
    });
  }

  // lock body scroll
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
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
  }, [open, items.length]);

  // Mouse
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

  function onWheel(e: React.WheelEvent) {
    if (!open) return;
    const delta = -e.deltaY * 0.0015;
    setZoom((z) => {
      const nz = clamp(z + delta, 1, 4);
      if (nz === 1) setOffset({ x: 0, y: 0 });
      else setOffset((o) => clampOffset(o.x, o.y, nz));
      return nz;
    });
  }

  // Touch helpers
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
    if (e.touches.length === 2 && pinchStartDist.current) {
      e.preventDefault();

      const [t1, t2] = [e.touches[0], e.touches[1]];
      const dist = getDistance(t1, t2);

      const newZoom = clamp((pinchStartZoom.current * dist) / (pinchStartDist.current || 1), 1, 4);

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

    if (!dragging.current || e.touches.length !== 1 || zoom === 1) return;
    e.preventDefault();

    const t = e.touches[0];
    const dx = t.clientX - lastPos.current.x;
    const dy = t.clientY - lastPos.current.y;
    lastPos.current = { x: t.clientX, y: t.clientY };
    setOffset((o) => clampOffset(o.x + dx, o.y + dy, zoom));
  }

  function onTouchEnd(e: React.TouchEvent) {
    dragging.current = false;
    pinchStartDist.current = null;

    // swipe navigation only when not zoomed
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

  return (
    <section className="py-16 md:py-20 bg-white" data-reveal>
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl md:text-4xl font-extrabold">{t("recent_projects")}</h2>

          <Link href="/projecten" className="hidden md:inline-flex text-bronze font-semibold">
            {t("all_projects")} →
          </Link>
        </div>

        <div className="mt-6 grid gap-4 grid-cols-2 md:grid-cols-4">
          {items.map((it, i) => (
            <button
              key={it.src + i}
              className="group relative rounded-lg overflow-hidden"
              onClick={() => openAt(i)}
              aria-label={`Open ${it.title}`}
            >
              <div className="relative w-full h-40 md:h-48">
                <BlurImage
                  src={it.src}
                  alt={it.title}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 25vw"
                  className="object-cover group-hover:scale-105 transition"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
            </button>
          ))}
        </div>

        <div className="mt-6 md:hidden">
          <Link href="/projecten" className="inline-flex text-bronze font-semibold">
            {t("all_projects")} →
          </Link>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX */}
      {open && items.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black"
          style={{ touchAction: "none" }}
          onWheel={onWheel}
          onDoubleClick={toggleZoom}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
        >
          {/* top bar */}
          <div
            className={`absolute left-0 right-0 top-0 z-20 p-3 flex items-center justify-between text-white transition-opacity ${
              showUI ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
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
              {index + 1} / {items.length}
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

          {/* viewport + image */}
          <div
            ref={boxRef}
            className="absolute inset-0 flex items-center justify-center"
            onClick={() => setShowUI((v) => !v)}
          >
            <img
              src={items[index].src}
              alt={items[index].title}
              className="select-none w-full h-full object-contain"
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
            className={`pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent transition-opacity ${
              showUI ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      )}
    </section>
  );
}
