"use client";

import { Box, Layout, Store, Signpost } from "lucide-react";
import { motion } from "framer-motion";
import { HOME } from "@/constants/home";
import { AnimatedSection, SectionHeading } from "@/components/shared/AnimatedSection";
import { Button } from "@/components/ui/Button";

const iconMap = {
  box: Box,
  layout: Layout,
  store: Store,
  signpost: Signpost,
};

export function IntroSection() {
  const { intro } = HOME;

  return (
    <section id="intro" className="py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <AnimatedSection>
          <SectionHeading title={intro.title} align="left" eyebrow="Who We Are" />
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div className="space-y-5">
              {intro.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="text-ink-muted leading-relaxed md:text-lg"
                >
                  {p}
                </motion.p>
              ))}
              <Button href="/about" variant="outline" className="mt-6">
                About Our Company
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {intro.capabilities.map((cap, i) => {
                const Icon = iconMap[cap.icon];
                return (
                  <AnimatedSection key={cap.title} delay={i * 0.08} direction="scale">
                    <motion.div
                      whileHover={{ y: -6 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="glass-card group h-full p-6"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-500/15 to-gold-400/10 transition-transform duration-300 group-hover:scale-110">
                        <Icon className="h-6 w-6 text-gold-500" />
                      </div>
                      <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                        {cap.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                        {cap.description}
                      </p>
                    </motion.div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
