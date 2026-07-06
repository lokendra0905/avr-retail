"use client";

import { motion } from "framer-motion";
import { PROCESS_STEPS } from "@/constants/site";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export function ProcessSteps() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {PROCESS_STEPS.map((step, i) => (
        <AnimatedSection key={step.title} delay={i * 0.08} direction="up">
          <motion.div
            whileHover={{ y: -6 }}
            className="glass-card group h-full p-6"
          >
            <span className="font-game text-3xl font-bold text-gold-500/25 transition-colors group-hover:text-gold-500/50">
              0{i + 1}
            </span>
            <h3 className="mt-3 font-display text-lg font-semibold text-ink">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.description}</p>
            <div className="mt-4 h-0.5 w-8 rounded-full bg-gold-500/30 transition-all group-hover:w-14 group-hover:bg-gold-500" />
          </motion.div>
        </AnimatedSection>
      ))}
    </div>
  );
}
