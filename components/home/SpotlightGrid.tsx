"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SPOTLIGHT_IMAGES } from "@/constants/home-showcase";

export function SpotlightGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, active: false });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };

  return (
    <section className="relative bg-navy-950 py-28 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="mb-14 text-center">
          <p className="font-game text-xs uppercase tracking-[0.35em] text-gold-500">
            Interiors
          </p>
          <h2 className="mt-3 font-game text-4xl font-bold uppercase text-ink md:text-5xl">
            Move Your <span className="text-gradient-brand">Cursor</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-ink-muted">
            Hover the grid — we illuminate the craft behind every retail space we build.
          </p>
        </div>

        <div
          ref={containerRef}
          onMouseMove={handleMove}
          onMouseLeave={() => setSpotlight((s) => ({ ...s, active: false }))}
          className="relative overflow-hidden rounded-3xl border border-navy-700 bg-ink p-3 md:p-4"
          style={{
            background: spotlight.active
              ? `radial-gradient(600px circle at ${spotlight.x}px ${spotlight.y}px, rgba(229,78,38,0.15), transparent 40%), #141414`
              : "#141414",
          }}
        >
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {SPOTLIGHT_IMAGES.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ scale: 1.04, zIndex: 10 }}
                className={`relative overflow-hidden rounded-2xl ${
                  i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
                }`}
              >
                <Image
                  src={src}
                  alt={`Interior project ${i + 1}`}
                  fill
                  className="object-cover transition-all duration-500 hover:brightness-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/20 transition-opacity hover:bg-transparent" />
                <span className="absolute left-3 top-3 font-game text-[10px] text-white/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
