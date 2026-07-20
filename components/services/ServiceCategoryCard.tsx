"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ServiceCategory } from "@/constants/services";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export function ServiceCategoryCard({ service }: { service: ServiceCategory }) {
  return (
    <AnimatedSection direction="scale">
      <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 280 }}>
        <Link
          href={`/services/${service.slug}`}
          className="group block overflow-hidden rounded-2xl border border-navy-700/80 bg-white shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-gold-500/10"
        >
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={service.coverImage}
              alt={`${service.title} — AVR Retail showroom design services`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="img-card-overlay absolute inset-0" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="font-game text-[10px] uppercase tracking-[0.2em] text-gold-400">
                {service.projects.length > 0
                  ? `${service.projects.length} project${service.projects.length !== 1 ? "s" : ""}`
                  : `${service.gallery.length} photos`}
              </span>
              <h2 className="mt-1 font-display text-lg font-bold text-white">{service.title}</h2>
            </div>
          </div>
          <div className="p-6">
            <p className="line-clamp-2 text-sm leading-relaxed text-ink-muted">{service.description}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 font-game-alt text-xs font-semibold uppercase tracking-wider text-gold-500">
              Explore
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      </motion.div>
    </AnimatedSection>
  );
}
