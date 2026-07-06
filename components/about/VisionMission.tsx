"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ABOUT } from "@/constants/about";
import { AnimatedSection, SectionHeading } from "@/components/shared/AnimatedSection";
import { cn } from "@/lib/utils";

export function VisionMission() {
  const [active, setActive] = useState<"vision" | "mission">("vision");

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(229,78,38,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(229,78,38,0.12) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="relative mx-auto max-w-[1400px] px-6">
        <AnimatedSection>
          <SectionHeading
            title="Vision And Mission"
            subtitle="What drives AVR Retail forward"
            eyebrow="Our Purpose"
            inverted={true}
          />
        </AnimatedSection>

        <div className="flex justify-center gap-3">
          {(["vision", "mission"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActive(tab)}
              className={cn(
                "rounded-full px-8 py-3 font-game text-xs font-semibold uppercase tracking-[0.2em] transition-all",
                active === tab
                  ? "bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-lg shadow-gold-500/25"
                  : "border border-white/15 bg-white/5 text-white/50 hover:border-gold-500/40 hover:text-white"
              )}
            >
              {ABOUT[tab].title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.blockquote
            key={active}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45 }}
            className="mx-auto mt-14 max-w-4xl text-center"
          >
            <p className="font-display text-2xl font-medium leading-relaxed text-white md:text-3xl lg:text-4xl">
              &ldquo;{ABOUT[active].quote}&rdquo;
            </p>
            <footer className="mt-8 font-game text-sm uppercase tracking-[0.25em] text-gold-400">
              — {ABOUT[active].title}
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>
    </section>
  );
}
