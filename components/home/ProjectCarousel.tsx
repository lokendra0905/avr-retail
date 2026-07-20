"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { getFeaturedProjects, getFeaturedHref } from "@/lib/services";

export function ProjectCarousel() {
  const projects = getFeaturedProjects(8);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (projects.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % projects.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [projects.length]);

  if (projects.length === 0) return null;

  const prev = () => setIndex((i) => (i === 0 ? projects.length - 1 : i - 1));
  const next = () => setIndex((i) => (i + 1) % projects.length);
  const current = projects[index];

  return (
    <section className="bg-[#0a0a0a] py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-game text-xs uppercase tracking-[0.35em] text-gold-500">
              Portfolio
            </p>
            <h2 className="mt-3 font-game text-3xl font-bold uppercase text-white md:text-5xl">
              Featured <span className="text-gradient-brand">Work</span>
            </h2>
            <p className="mt-3 max-w-md text-white/50">
              Projects across optical, garments, jewellery, footwear &amp; more.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={prev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-gold-500 hover:text-gold-400"
              aria-label="Previous project"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-gold-500 hover:text-gold-400"
              aria-label="Next project"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
            <Link
              href="/portfolio"
              className="ml-2 font-game text-xs uppercase tracking-wider text-gold-400 hover:text-gold-400/80"
            >
              View All →
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-white/10">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${current.service.slug}-${current.project.slug}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.45 }}
              className="grid lg:grid-cols-2"
            >
              <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[420px]">
                <Image
                  src={current.project.coverImage}
                  alt={current.project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center bg-[#111] p-8 md:p-12">
                <span className="font-game text-[10px] uppercase tracking-[0.3em] text-gold-400">
                  {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")} — {current.service.title}
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold text-white md:text-3xl">
                  {current.project.title}
                </h3>
                {current.project.location && (
                  <p className="mt-2 flex items-center gap-1.5 text-white/50">
                    <MapPin className="h-4 w-4 text-gold-500" />
                    {current.project.location}
                  </p>
                )}
                <p className="mt-5 line-clamp-3 text-white/60 leading-relaxed">
                  {current.project.excerpt || current.project.description}
                </p>
                <Link
                  href={getFeaturedHref(current.service.slug, current.project.slug)}
                  className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 px-6 py-3 font-game text-xs font-semibold uppercase tracking-wider text-white"
                >
                  View Project
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-8 bg-gold-500" : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
