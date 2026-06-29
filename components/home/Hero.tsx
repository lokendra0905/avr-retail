"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { HOME } from "@/constants/home";
import { SITE } from "@/constants/site";
import { Button } from "@/components/ui/Button";
import { getPhoneUrl } from "@/lib/utils";

export function Hero() {
  const { hero } = HOME;

  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={hero.backgroundPoster}
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden
      >
        <source src={hero.backgroundVideo} type="video/mp4" />
      </video>

      {/* Dark overlays so headline and CTAs stay readable over the video */}
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/35" />
      <div className="absolute inset-0 bg-brand-glow opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block rounded-full border border-gold-500/40 bg-black/40 px-4 py-1.5 text-sm font-medium text-gold-400 backdrop-blur-sm"
          >
            Retail Fit Out Company in India
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-6 font-display text-4xl font-bold leading-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] md:text-5xl lg:text-6xl"
          >
            {hero.headline}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-6 text-lg text-white/85 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] md:text-xl"
          >
            {hero.subheadline}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Button href={getPhoneUrl(SITE.contact.phone)} external size="lg">
              <Phone className="h-5 w-5" />
              {SITE.contact.phoneDisplay}
            </Button>
            <Button href={hero.ctaSecondary.href} variant="outline" size="lg">
              {hero.ctaSecondary.label}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
