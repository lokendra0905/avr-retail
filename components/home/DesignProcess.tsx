"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PROCESS_STEPS_HOME } from "@/constants/home-showcase";

export function DesignProcess() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-white py-28 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="mb-20 text-center">
          <p className="font-game text-xs uppercase tracking-[0.35em] text-gold-500">
            Our Process
          </p>
          <h2 className="mt-3 font-game text-4xl font-bold uppercase text-ink md:text-5xl">
            60-Day <span className="text-gradient-brand">Journey</span>
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-navy-700 md:block">
            <motion.div
              style={{ width: lineWidth }}
              className="h-full bg-gradient-to-r from-gold-500 to-gold-400"
            />
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            {PROCESS_STEPS_HOME.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="group relative rounded-3xl border border-navy-700 bg-navy-950 p-8 text-center transition-shadow hover:shadow-xl hover:shadow-gold-500/10"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-ink font-game text-2xl text-gold-400 transition-colors group-hover:bg-gold-500 group-hover:text-white">
                  {step.icon}
                </div>
                <p className="mt-6 font-game text-xs uppercase tracking-[0.3em] text-gold-500">
                  Step {step.step}
                </p>
                <h3 className="mt-2 font-display text-xl font-bold text-ink">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
