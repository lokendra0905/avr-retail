"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone, ChevronDown } from "lucide-react";
import { HOME } from "@/constants/home";
import { SITE } from "@/constants/site";
import { Button } from "@/components/ui/Button";
import { getPhoneUrl } from "@/lib/utils";

function HeroOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="animate-float absolute -right-20 top-1/4 h-72 w-72 rounded-full bg-gold-500/20 blur-3xl" />
      <div className="animate-float-delayed absolute -left-16 bottom-1/4 h-56 w-56 rounded-full bg-gold-400/15 blur-3xl" />
      <div className="animate-pulse-glow absolute right-1/3 top-1/3 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
    </div>
  );
}

export function Hero() {
  const { hero } = HOME;
  const headlineWords = hero.headline.split(" ");

  return (
    <section className="relative flex min-h-[94vh] items-center overflow-hidden bg-ink">
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={hero.backgroundPoster}
        className="absolute inset-0 h-full w-full object-cover opacity-90"
        aria-hidden
      >
        <source src={hero.backgroundVideo} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      <HeroOrbs />

      <div className="relative mx-auto max-w-7xl px-4 py-28 md:px-6">
        <div className="max-w-4xl">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="eyebrow inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-gold-400 backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
            Retail Fit Out Company in India
          </motion.span>

          <h1 className="mt-8 font-display text-4xl font-bold leading-[1.1] text-white md:text-5xl lg:text-7xl">
            {headlineWords.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.25 + i * 0.07,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mr-[0.2em] inline-block"
              >
                {i === headlineWords.length - 1 ? (
                  <span className="text-gradient-brand">{word}</span>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-7 max-w-2xl font-sans text-lg leading-relaxed text-white/85 md:text-xl"
          >
            {hero.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-11 flex flex-wrap gap-4"
          >
            <Button href={getPhoneUrl(SITE.contact.phone)} external size="lg">
              <Phone className="h-5 w-5" />
              {SITE.contact.phoneDisplay}
            </Button>
            <Button
              href={hero.ctaSecondary.href}
              variant="outline"
              size="lg"
              className="border-white/50 text-white hover:bg-white/15 hover:text-white"
            >
              {hero.ctaSecondary.label}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16 flex flex-wrap gap-8 border-t border-white/15 pt-8"
          >
            {[
              { value: "1500+", label: "Projects" },
              { value: "100+", label: "Cities" },
              { value: "12+", label: "Years" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + i * 0.1 }}
              >
                <p className="font-display text-2xl font-bold text-white md:text-3xl">
                  {stat.value}
                </p>
                <p className="font-accent text-xs uppercase tracking-widest text-white/60">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#intro"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-white/50 transition-colors hover:text-white/80"
        aria-label="Scroll to content"
      >
        <span className="font-accent text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown className="h-5 w-5 animate-scroll-hint" />
      </motion.a>
    </section>
  );
}
