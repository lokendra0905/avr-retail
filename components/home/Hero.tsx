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
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-ink">
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

      {/* Lighter overlays — video stays visible, text still readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25" />

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
            className="inline-block rounded-full border border-gold-400/50 bg-black/30 px-4 py-1.5 text-sm font-medium text-gold-400 backdrop-blur-sm"
          >
            Retail Fit Out Company in India
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-6 font-display text-4xl font-bold leading-tight text-white drop-shadow-lg md:text-5xl lg:text-6xl"
          >
            {hero.headline}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-6 text-lg text-white/90 drop-shadow-md md:text-xl"
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
            <Button href={hero.ctaSecondary.href} variant="outline" size="lg" className="border-white/60 text-white hover:bg-white/10">
              {hero.ctaSecondary.label}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
