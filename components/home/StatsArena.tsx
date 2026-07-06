"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { HOME } from "@/constants/home";

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2200;
    const steps = 70;
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
    <span ref={ref} className="font-game tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export function StatsArena() {
  return (
    <section className="relative overflow-hidden bg-[#080808] py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(229,78,38,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(229,78,38,0.15) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-[1400px] px-6">
        <div className="mb-16 text-center">
          <p className="font-game text-xs uppercase tracking-[0.35em] text-gold-500">
            Track Record
          </p>
          <h2 className="mt-3 font-game text-4xl font-bold uppercase text-white md:text-5xl">
            Numbers That <span className="text-gradient-brand">Matter</span>
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HOME.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring" }}
              whileHover={{ scale: 1.05, borderColor: "rgba(229,78,38,0.5)" }}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm"
            >
              <div className="text-5xl font-bold text-gradient-brand md:text-6xl">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-4 font-game-alt text-xs uppercase tracking-[0.25em] text-white/50">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
