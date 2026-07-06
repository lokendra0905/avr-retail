"use client";

import { motion } from "framer-motion";
import { ABOUT } from "@/constants/about";
import { AnimatedSection, SectionHeading } from "@/components/shared/AnimatedSection";

export function Achievements() {
  return (
    <section className="section-alt py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <AnimatedSection>
          <SectionHeading
            title="Achievements"
            subtitle="Milestones we're proud of"
            eyebrow="Our Impact"
          />
        </AnimatedSection>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT.achievements.map((item, i) => (
            <AnimatedSection key={item.label} delay={i * 0.1} direction="scale">
              <motion.div
                whileHover={{ y: -6 }}
                className="glass-card p-8 text-center"
              >
                <div className="font-display text-4xl font-bold text-gradient-brand">
                  {item.value}
                </div>
                <p className="mt-3 font-accent text-sm font-medium uppercase tracking-widest text-ink-muted">
                  {item.label}
                </p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
