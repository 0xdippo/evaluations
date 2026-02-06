"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
const SLIDES = shuffle(
  Array.from({ length: 13 }, (_, i) => `/carousel/carousel-${i + 1}.png`)
);
const AUTOPLAY_MS = 5000;

export function Carousel() {
  const [index, setIndex] = useState(0);
  const len = SLIDES.length;

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => (i + delta + len) % len);
    },
    [len]
  );

  useEffect(() => {
    const t = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [go]);

  const prev = index === 0 ? len - 1 : index - 1;
  const next = (index + 1) % len;

  return (
    <section
      className="relative w-full overflow-hidden py-12 sm:py-16"
      aria-label="Photo carousel"
    >
      {/* Edge gradients: gradual fade, visible under arrows */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[15] w-28 sm:w-44 md:w-56"
        style={{
          background:
            "linear-gradient(to right, var(--page-bg) 0%, transparent 100%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-[15] w-28 sm:w-44 md:w-56"
        style={{
          background:
            "linear-gradient(to left, var(--page-bg) 0%, transparent 100%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto flex w-full max-w-6xl items-center justify-center gap-1 px-2 sm:gap-2 sm:px-4">
        {/* Previous */}
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous photo"
          className="z-30 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy/80 text-page-bg transition hover:bg-navy focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
        >
          <span aria-hidden>‹</span>
        </button>

        {/* Slide strip: prev | center | next - center floats on top */}
        <div className="relative flex flex-1 items-center justify-center gap-0 sm:gap-2">
          {/* Left (prev) - behind, 50% opacity, extends out */}
          <div className="relative z-10 hidden h-[180px] w-[120px] shrink-0 overflow-hidden rounded-lg opacity-50 sm:block sm:h-[220px] sm:w-[160px] md:h-[260px] md:w-[220px]">
            <Image
              src={SLIDES[prev]}
              alt=""
              fill
              className="object-cover transition duration-300"
              sizes="180px"
            />
          </div>

          {/* Center - larger, on top */}
          <div className="relative z-20 h-[240px] w-[320px] shrink-0 overflow-hidden rounded-lg shadow-xl sm:h-[280px] sm:w-[380px] md:h-[320px] md:w-[440px]">
            <Image
              src={SLIDES[index]}
              alt="Coach and football"
              fill
              className="object-cover transition duration-300"
              sizes="(max-width: 640px) 320px, (max-width: 768px) 380px, 440px"
              priority
            />
          </div>

          {/* Right (next) - behind, 50% opacity, extends out */}
          <div className="relative z-10 hidden h-[180px] w-[120px] shrink-0 overflow-hidden rounded-lg opacity-50 sm:block sm:h-[220px] sm:w-[160px] md:h-[260px] md:w-[220px]">
            <Image
              src={SLIDES[next]}
              alt=""
              fill
              className="object-cover transition duration-300"
              sizes="180px"
            />
          </div>
        </div>

        {/* Next */}
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next photo"
          className="z-30 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy/80 text-page-bg transition hover:bg-navy focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
        >
          <span aria-hidden>›</span>
        </button>
      </div>

      {/* Dots */}
      <div className="mt-6 flex justify-center gap-2" role="tablist" aria-label="Slide">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Go to photo ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full transition focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 ${
              i === index ? "bg-gold scale-125" : "bg-navy/40 hover:bg-navy/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
