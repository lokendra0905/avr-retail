"use client";

import { useState } from "react";
import { ABOUT } from "@/constants/about";
import { AnimatedSection, SectionHeading } from "@/components/shared/AnimatedSection";
import { cn } from "@/lib/utils";

export function VisionMission() {
  const [active, setActive] = useState<"vision" | "mission">("vision");

  return (
    <section className="py-24 bg-navy-900/30">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <AnimatedSection>
          <div className="flex justify-center gap-4 mb-12">
            {(["vision", "mission"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActive(tab)}
                className={cn(
                  "rounded-full px-6 py-2 text-sm font-semibold capitalize transition-all",
                  active === tab
                    ? "bg-gold-500 text-navy-950"
                    : "bg-navy-800 text-white/60 hover:text-white"
                )}
              >
                {ABOUT[tab].title}
              </button>
            ))}
          </div>
          <blockquote className="mx-auto max-w-3xl text-center">
            <p className="font-display text-2xl font-medium leading-relaxed text-white md:text-3xl">
              &ldquo;{ABOUT[active].quote}&rdquo;
            </p>
            <footer className="mt-6 text-gold-400 font-semibold">
              — {ABOUT[active].title}
            </footer>
          </blockquote>
        </AnimatedSection>
      </div>
    </section>
  );
}
