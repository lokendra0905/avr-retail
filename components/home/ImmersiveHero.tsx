"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, Phone, Sparkles } from "lucide-react";
import { HERO_SHOWCASE } from "@/constants/home-showcase";
import { SITE } from "@/constants/site";
import { getPhoneUrl } from "@/lib/utils";

export function ImmersiveHero() {
  const [active, setActive] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const parallaxX = useTransform(springX, [0, 1], [-18, 18]);
  const parallaxY = useTransform(springY, [0, 1], [-12, 12]);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-[#080808] pt-[72px]"
      onMouseMove={handleMouse}
    >
      {/* Grid + noise texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold-500/10 via-transparent to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#080808] to-transparent" />

      <div className="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-[1400px] flex-col lg:flex-row">
        {/* Left — typography */}
        <div className="flex flex-1 flex-col justify-center px-6 py-16 lg:px-10 lg:py-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-game inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-gold-400">
              <Sparkles className="h-3.5 w-3.5" />
              Interior · Retail · Fit-Out
            </span>

            <h1 className="mt-8 font-game text-[clamp(2.8rem,7vw,5.5rem)] font-bold uppercase leading-[0.92] tracking-tight text-white">
              <span className="block">Craft</span>
              <span className="block text-gradient-brand">Spaces</span>
              <span className="block text-white/90">That Sell</span>
            </h1>

            <p className="mt-8 max-w-md font-sans text-base leading-relaxed text-white/55 md:text-lg">
              We design, fabricate &amp; install premium retail interiors across India —
              from optical boutiques to luxury showrooms.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/portfolio"
                className="btn-shine group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 px-8 py-4 font-game text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-gold-500/30 transition-transform hover:-translate-y-0.5"
              >
                Explore Work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={getPhoneUrl(SITE.contact.phone)}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 font-game text-sm font-semibold uppercase tracking-wider text-white backdrop-blur-md transition-all hover:border-gold-500/50 hover:bg-white/10"
              >
                <Phone className="h-4 w-4 text-gold-400" />
                Call Now
              </a>
            </div>

            {/* Interactive hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-12 font-game-alt text-xs uppercase tracking-[0.25em] text-white/30"
            >
              ← Hover cards to explore projects
            </motion.p>
          </motion.div>
        </div>

        {/* Right — interactive image stack */}
        <div className="relative flex-1 min-h-[420px] lg:min-h-0">
          <motion.div style={{ x: parallaxX, y: parallaxY }} className="absolute inset-0 p-6 lg:p-10">
            {HERO_SHOWCASE.map((item, i) => {
              const isActive = active === i;
              return (
                <motion.button
                  key={item.title}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{
                    opacity: 1,
                    scale: isActive ? 1.05 : 0.92,
                    rotate: isActive ? 0 : item.rotate,
                    zIndex: isActive ? 20 : item.z,
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="absolute w-[52%] max-w-[280px] cursor-pointer overflow-hidden rounded-2xl border border-white/15 shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 md:w-[46%] lg:max-w-[320px]"
                  style={{ left: item.x, top: item.y }}
                >
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="320px"
                      priority={i < 2}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                      <p className="font-game text-[10px] uppercase tracking-[0.2em] text-gold-400">
                        {item.location}
                      </p>
                      <p className="font-display text-sm font-semibold text-white">{item.title}</p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Active project counter */}
          <div className="absolute bottom-8 right-8 hidden lg:block">
            <span className="font-game text-6xl font-bold text-white/10">
              {String(active + 1).padStart(2, "0")}
            </span>
            <span className="font-game text-lg text-white/20"> / 04</span>
          </div>
        </div>
      </div>

      {/* Scroll line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-0 left-1/2 h-20 w-px origin-top -translate-x-1/2 bg-gradient-to-b from-gold-500/60 to-transparent"
      />
    </section>
  );
}
