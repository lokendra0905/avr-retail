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
    <section className="border-y border-white/5 bg-navy-900/50 py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <AnimatedSection>
          <SectionHeading
            title={HOME.sections.stats.title}
            subtitle={HOME.sections.stats.subtitle}
          />
        </AnimatedSection>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {HOME.stats.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 0.1}>
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="font-display text-4xl font-bold text-gold-400 md:text-5xl">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-2 text-white/60">{stat.label}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
