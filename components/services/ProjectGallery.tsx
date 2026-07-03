"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { ProjectMedia } from "@/constants/services";

type ProjectGalleryProps = {
  images: ProjectMedia[];
  projectTitle: string;
};

export function ProjectGallery({ images, projectTitle }: ProjectGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const imageItems = images.filter((m) => m.type === "image");

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () =>
    setLightboxIndex((i) => (i !== null ? (i - 1 + imageItems.length) % imageItems.length : null));
  const next = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % imageItems.length : null));

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {imageItems.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => openLightbox(i)}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-navy-700"
          >
            <Image
              src={img.src}
              alt={img.alt || `${projectTitle} photo ${i + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-navy-950/0 transition-colors group-hover:bg-navy-950/20" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/95 p-4"
            onClick={closeLightbox}
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-ink hover:bg-white/20"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 rounded-full bg-white/10 p-2 text-ink hover:bg-white/20"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-16 rounded-full bg-white/10 p-2 text-ink hover:bg-white/20 md:right-16 md:top-1/2 md:-translate-y-1/2"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <div
              className="relative max-h-[85vh] max-w-5xl w-full aspect-[16/10]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={imageItems[lightboxIndex].src}
                alt={imageItems[lightboxIndex].alt || projectTitle}
                fill
                className="object-contain"
                sizes="100vw"
              />
              {imageItems[lightboxIndex].caption && (
                <p className="absolute bottom-0 left-0 right-0 bg-navy-950/80 p-4 text-center text-sm text-ink/80">
                  {imageItems[lightboxIndex].caption}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
