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
import { ArrowRight, Phone, Factory, Users, FolderCheck, Calendar } from "lucide-react";
import { HERO_SHOWCASE } from "@/constants/home-showcase";
import { SITE } from "@/constants/site";
import { getPhoneUrl } from "@/lib/utils";

const CREDIBILITY = [
  { icon: FolderCheck, value: "2000+", label: "Projects Delivered" },
  { icon: Users, value: "100+", label: "Skilled Manpower" },
  { icon: Factory, value: "50K+", label: "Sqft Manufacturing" },
  { icon: Calendar, value: "12+", label: "Years Experience" },
] as const;

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

      <div className="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-[1400px] flex-col">
        <div className="flex flex-1 flex-col lg:flex-row">
          {/* Left — typography */}
          <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-10 lg:py-16">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="font-game inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-gold-400">
                Why AVR · Retail Fit-Out Leaders
              </span>

              <h1 className="mt-6 font-game text-[clamp(1.85rem,4.5vw,3.4rem)] font-bold uppercase leading-[1.05] tracking-tight text-white">
                Premium Retail{" "}
                <span className="text-gradient-brand">Fit-Out Solutions</span>
                <span className="block text-white/90">Across India</span>
              </h1>

              <p className="mt-6 max-w-lg font-sans text-base leading-relaxed text-white/60 md:text-lg">
                Transforming retail environments with innovative design, precision
                manufacturing, and seamless installation for brands that want to stand out.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
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
            </motion.div>
          </div>

          {/* Right — interactive image stack */}
          <div className="relative min-h-[360px] flex-1 lg:min-h-0">
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
          </div>
        </div>

        {/* Why AVR — credibility strip (visible in first viewport) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="relative z-10 mx-6 mb-8 grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md md:mx-10 md:grid-cols-4 md:gap-4 md:p-5"
        >
          {CREDIBILITY.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 rounded-xl border border-white/5 bg-black/20 px-3 py-3 md:px-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-500/15">
                <item.icon className="h-5 w-5 text-gold-400" />
              </div>
              <div>
                <p className="font-game text-lg font-bold text-white md:text-xl">{item.value}</p>
                <p className="font-game-alt text-[10px] uppercase tracking-wider text-white/45 md:text-xs">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
