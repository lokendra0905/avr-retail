"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { HOME } from "@/constants/home";
import { AnimatedSection, SectionHeading } from "@/components/shared/AnimatedSection";

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="section-alt border-y border-navy-700 py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <AnimatedSection>
          <SectionHeading
            title={HOME.sections.stats.title}
            subtitle={HOME.sections.stats.subtitle}
            eyebrow="By The Numbers"
          />
        </AnimatedSection>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HOME.stats.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 0.1} direction="scale">
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="glass-card group p-8 text-center"
              >
                <div className="font-display text-4xl font-bold text-gradient-brand md:text-5xl">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-3 font-accent text-sm font-medium uppercase tracking-widest text-ink-muted">
                  {stat.label}
                </p>
                <div className="mx-auto mt-4 h-0.5 w-8 rounded-full bg-gold-500/30 transition-all duration-300 group-hover:w-16 group-hover:bg-gold-500" />
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
