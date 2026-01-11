"use client";

import Image from "next/image";
import ContactForm from "./ContactForm";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import type { Service } from "@/lib/services";
import Breadcrumbs from "./Breadcrumbs";
import { useI18n } from "@/lib/i18n";

type Point = { clientX: number; clientY: number };

export default function ServiceContent({ svc }: { svc: Service }) {
  const { t } = useI18n();

  const title = t(svc.titleKey);
  const excerpt = t(svc.excerptKey);
  const intro = svc.introKey ? t(svc.introKey) : "";

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

  function openAt(i: number) {
    setIndex(i);
    resetTransform();
    setOpen(true);
  }
  function close() {
    setOpen(false);
  }
  function next() {
    if (!svc.images.length) return;
    setIndex((v) => (v + 1) % svc.images.length);
    resetTransform();
  }
  function prev() {
    if (!svc.images.length) return;
    setIndex((v) => (v - 1 + svc.images.length) % svc.images.length);
    resetTransform();
  }
  function resetTransform() {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
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
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

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

  // mouse
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
    const delta = -e.deltaY * 0.0015;
    setZoom((z) => {
      const nz = clamp(z + delta, 1, 4);
      if (nz === 1) setOffset({ x: 0, y: 0 });
      return nz;
    });
  }

  // touch
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
    const tt = e.touches[0];
    const dx = tt.clientX - lastPos.current.x;
    const dy = tt.clientY - lastPos.current.y;
    lastPos.current = { x: tt.clientX, y: tt.clientY };
    setOffset((o) => clampOffset(o.x + dx, o.y + dy, zoom));
  }
  function onTouchEnd(e: React.TouchEvent) {
    dragging.current = false;
    pinchStartDist.current = null;

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
    <main>
      {/* HERO */}
      <section className="relative" data-reveal>
        <div className="absolute inset-0 -z-10">
          <Image src={svc.img} alt={title} fill className="object-cover" />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-20">
          <div className="fade-dark rounded-xl p-6 md:p-10 text-white max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold">{title}</h1>
            <p className="mt-3 text-lg opacity-90">{excerpt}</p>
            {svc.introKey && <p className="mt-4 opacity-95">{intro}</p>}

            <div className="mt-6 flex gap-3 flex-wrap">
              <a href="#offerte" className="inline-block bg-bronze text-charcoal px-5 py-3 rounded font-semibold">
                {t("cta_quote")}
              </a>
              <Link href="/diensten" className="underline underline-offset-4">
                ← {t("all_services")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BREADCRUMBS */}
      <div className="mx-auto max-w-7xl px-4 pt-6">
        <Breadcrumbs
          trail={[
            { href: "/diensten", label: t("diensten") },
            { href: `/diensten/${svc.slug}`, label: title },
          ]}
        />
      </div>

      {/* BODY + OFFERTE */}
      <section className="mx-auto max-w-7xl px-4 py-12 grid md:grid-cols-3 gap-8" data-reveal>
        <article className="md:col-span-2 space-y-8">
          <div>
            <h2 className="text-2xl font-bold">{t("why_klusdam")}</h2>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              {svc.bulletsKeys.map((k, i) => (
                <li key={k + i}>{t(k)}</li>
              ))}
              <li>{t("why_b_1")}</li>
              <li>{t("why_b_2")}</li>
              <li>{t("why_b_3")}</li>
              <li>{t("why_b_4")}</li>
            </ul>
          </div>

          {/* 6-IMAGE GALLERY */}
          <div>
            <h3 className="text-xl font-semibold">{t("examples_work")}</h3>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
              {svc.images.slice(0, 6).map((src, i) => (
                <button
                  key={src + i}
                  className="relative aspect-[4/3] overflow-hidden rounded-lg group"
                  onClick={() => openAt(i)}
                  aria-label={t("open_image")}
                >
                  <img
                    src={src}
                    alt={`${title} ${t("example")} ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        </article>

        <aside className="bg-cream p-6 rounded-xl" id="offerte">
          <h3 className="font-semibold text-lg">{t("cta_quote")}</h3>
          <p className="text-sm opacity-80">{t("quote_help")}</p>
          <div className="mt-4">
            <ContactForm compact />
          </div>
          <div className="mt-4 text-sm">
            <Link href="/diensten" className="underline underline-offset-4">
              ← {t("back_all_services")}
            </Link>
          </div>
        </aside>
      </section>

      {/* FULLSCREEN LIGHTBOX */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black"
          onWheel={onWheel}
          onDoubleClick={toggleZoom}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
        >
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
              {index + 1} / {svc.images.length}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="text-sm px-3 py-1.5 rounded bg-white/10 hover:bg-white/20"
                onClick={prev}
              >
                ‹ {t("prev")}
              </button>
              <button
                type="button"
                className="text-sm px-3 py-1.5 rounded bg-white/10 hover:bg-white/20"
                onClick={next}
              >
                {t("next")} ›
              </button>
              <button
                type="button"
                className="text-sm px-3 py-1.5 rounded bg-white/10 hover:bg-white/20"
                onClick={() => {
                  setZoom(1);
                  setOffset({ x: 0, y: 0 });
                }}
              >
                {t("reset")}
              </button>
            </div>
          </div>

          <div ref={boxRef} className="absolute inset-0 flex items-center justify-center" onClick={() => setShowUI((v) => !v)}>
            <img
              src={svc.images[index]}
              alt={`${title} ${t("example")} ${index + 1}`}
              className="select-none w-full h-full object-contain"
              draggable={false}
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                transformOrigin: "center",
                transition: dragging.current || pinchStartDist.current ? "none" : "transform 120ms ease",
                cursor: zoom > 1 ? "grab" : "zoom-in",
              }}
            />
          </div>

          <div
            className={`pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent transition-opacity ${
              showUI ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      )}
    </main>
  );
}
