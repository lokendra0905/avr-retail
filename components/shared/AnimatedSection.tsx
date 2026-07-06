"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimatedSectionProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
};

const variants = {
  up: { hidden: { opacity: 0, y: 48 }, visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -48 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 48 }, visible: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1 } },
};

export function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={variants[direction]}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  eyebrow?: string;
  inverted?: boolean;
};

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  className,
  eyebrow,
  inverted = false,
}: SectionHeadingProps) {
  const words = title.split(" ");
  const lastWord = words.pop() ?? "";
  const restWords = words.join(" ");

  return (
    <div className={cn("mb-14", align === "center" && "text-center", className)}>
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={cn("eyebrow mb-4", align === "center" && "mx-auto")}
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={cn(
          "font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl",
          inverted ? "text-white" : "text-ink"
        )}
      >
        {restWords && <span>{restWords} </span>}
        <span className="text-gradient-brand">{lastWord}</span>
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={cn(
            "mt-5 max-w-2xl text-lg leading-relaxed",
            inverted ? "text-white/55" : "text-ink-muted",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-gold-500 to-gold-400",
          align === "center" && "mx-auto"
        )}
        style={{ transformOrigin: align === "center" ? "center" : "left" }}
      />
    </div>
  );
}
