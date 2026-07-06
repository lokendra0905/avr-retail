"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

type PageBannerProps = {
  title: string;
  subtitle?: string;
  image: string;
  imageAlt?: string;
};

export function PageBanner({ title, subtitle, image, imageAlt }: PageBannerProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  const titleWords = title.split(" ");
  const lastWord = titleWords.pop() ?? "";
  const restTitle = titleWords.join(" ");

  return (
    <section
      ref={ref}
      className="relative flex min-h-[300px] items-end overflow-hidden md:min-h-[380px]"
    >
      <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
        <Image
          src={image}
          alt={imageAlt || title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

      <motion.div
        style={{ y: contentY }}
        className="relative mx-auto w-full max-w-7xl px-4 pb-14 pt-32 md:px-6 md:pb-16"
      >
        <AnimatedSection>
          <p className="eyebrow mb-4 text-gold-400">AVR Retail</p>
          <h1 className="font-display text-3xl font-bold leading-tight text-white drop-shadow-lg md:text-4xl lg:text-6xl">
            {restTitle && <span>{restTitle} </span>}
            <span className="text-gradient-brand">{lastWord}</span>
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/85">{subtitle}</p>
          )}
        </AnimatedSection>
      </motion.div>
    </section>
  );
}
