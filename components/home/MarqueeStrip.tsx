"use client";

import { MARQUEE_WORDS } from "@/constants/home-showcase";

export function MarqueeStrip() {
  const words = [...MARQUEE_WORDS, ...MARQUEE_WORDS];

  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-[#0e0e0e] py-5">
      <div className="flex animate-marquee items-center gap-12">
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="flex shrink-0 items-center gap-12 font-game text-sm font-bold uppercase tracking-[0.3em] text-white/80 md:text-base"
          >
            {word}
            <span className="text-gold-500">✦</span>
          </span>
        ))}
      </div>
      <div
        className="pointer-events-none absolute inset-0 flex animate-marquee items-center gap-12 opacity-30"
        style={{ animationDirection: "reverse", animationDuration: "45s" }}
        aria-hidden
      >
        {words.map((word, i) => (
          <span
            key={`ghost-${word}-${i}`}
            className="shrink-0 font-game-alt text-xs uppercase tracking-[0.4em] text-gold-500/40"
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
