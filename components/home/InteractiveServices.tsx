"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { getAllServices } from "@/lib/services";

export function InteractiveServices() {
  const services = getAllServices();
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <section className="relative bg-navy-950 py-28 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="mb-16 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-game text-xs uppercase tracking-[0.35em] text-gold-500">
              What We Do
            </p>
            <h2 className="mt-3 font-game text-4xl font-bold uppercase leading-none text-ink md:text-6xl">
              Pick Your
              <span className="text-gradient-brand"> Space</span>
            </h2>
          </div>
          <p className="max-w-sm font-sans text-ink-muted">
            Click a category to preview our approach — each retail vertical gets a bespoke design language.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[340px_1fr] lg:gap-12">
          {/* Service tabs */}
          <div className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {services.map((service, i) => (
              <motion.button
                key={service.slug}
                type="button"
                onClick={() => setActive(i)}
                whileHover={{ x: 6 }}
                className={`group shrink-0 rounded-2xl border px-5 py-4 text-left transition-all duration-300 lg:w-full ${
                  active === i
                    ? "border-gold-500/50 bg-ink text-white shadow-lg shadow-gold-500/10"
                    : "border-navy-700 bg-white text-ink-muted hover:border-gold-500/30"
                }`}
              >
                <span className="font-game text-[10px] uppercase tracking-[0.25em] text-gold-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className={`mt-1 font-display text-sm font-semibold md:text-base ${active === i ? "text-white" : "text-ink"}`}>
                  {service.title}
                </p>
              </motion.button>
            ))}
          </div>

          {/* Preview panel */}
          <div className="relative min-h-[480px] overflow-hidden rounded-3xl border border-navy-700 bg-ink">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.slug}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={current.coverImage}
                  alt={current.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 70vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
              </motion.div>
            </AnimatePresence>

            <div className="relative flex h-full min-h-[480px] flex-col justify-end p-8 md:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.slug + "-text"}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="font-game-alt text-xs uppercase tracking-[0.3em] text-gold-400">
                    {current.projects.length}+ Projects Delivered
                  </p>
                  <h3 className="mt-3 font-display text-3xl font-bold text-white md:text-4xl">
                    {current.title}
                  </h3>
                  <p className="mt-4 max-w-lg text-white/65 leading-relaxed">
                    {current.description}
                  </p>
                  <Link
                    href={`/services/${current.slug}`}
                    className="mt-8 inline-flex items-center gap-2 font-game text-xs font-semibold uppercase tracking-[0.2em] text-gold-400 transition-colors hover:text-gold-400/80"
                  >
                    View Projects
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
