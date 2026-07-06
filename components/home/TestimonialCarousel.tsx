"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { HOME } from "@/constants/home";

export function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const reviews = HOME.reviews;
  const current = reviews[index];

  const prev = () => setIndex((i) => (i === 0 ? reviews.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === reviews.length - 1 ? 0 : i + 1));

  return (
    <section className="bg-navy-950 py-28 lg:py-36">
      <div className="mx-auto max-w-[900px] px-6">
        <div className="mb-12 text-center">
          <p className="font-game text-xs uppercase tracking-[0.35em] text-gold-500">
            Testimonials
          </p>
          <h2 className="mt-3 font-game text-3xl font-bold uppercase text-ink md:text-4xl">
            Client <span className="text-gradient-brand">Voices</span>
          </h2>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) next();
                else if (info.offset.x > 80) prev();
              }}
              className="cursor-grab rounded-3xl border border-navy-700 bg-white p-10 shadow-xl active:cursor-grabbing md:p-14"
            >
              <Quote className="h-10 w-10 text-gold-500/30" />
              <p className="mt-6 font-display text-xl leading-relaxed text-ink md:text-2xl">
                &ldquo;{current.quote}&rdquo;
              </p>
              <div className="mt-10 flex items-center justify-between border-t border-navy-700 pt-8">
                <div>
                  <p className="font-game text-sm font-semibold uppercase tracking-wider text-ink">
                    {current.author}
                  </p>
                  <p className="mt-1 font-game-alt text-sm text-gold-500">{current.company}</p>
                </div>
                <span className="font-game text-4xl font-bold text-navy-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-navy-700 bg-white text-ink transition-all hover:border-gold-500 hover:text-gold-500"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-8 bg-gold-500" : "w-2 bg-navy-700"
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-navy-700 bg-white text-ink transition-all hover:border-gold-500 hover:text-gold-500"
              aria-label="Next review"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <p className="mt-4 text-center font-game-alt text-[10px] uppercase tracking-[0.3em] text-ink-muted">
            Swipe or use arrows
          </p>
        </div>
      </div>
    </section>
  );
}
