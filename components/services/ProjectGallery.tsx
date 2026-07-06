"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
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
          <motion.button
            key={i}
            type="button"
            onClick={() => openLightbox(i)}
            whileHover={{ scale: 1.02 }}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-navy-700/80 bg-white shadow-sm"
          >
            <Image
              src={img.src}
              alt={img.alt || `${projectTitle} photo ${i + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
              <ZoomIn className="h-8 w-8 text-white opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            <span className="absolute left-3 top-3 font-game text-[10px] text-white/70">
              {String(i + 1).padStart(2, "0")}
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute right-4 top-4 rounded-full border border-white/20 bg-white/10 p-2.5 text-white hover:bg-white/20"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-2.5 text-white hover:bg-white/20"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-2.5 text-white hover:bg-white/20"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <div
              className="relative max-h-[85vh] w-full max-w-5xl aspect-[16/10]"
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
                <p className="absolute bottom-0 left-0 right-0 bg-black/80 p-4 text-center text-sm text-white/80">
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
