"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { HOME } from "@/constants/home";
import { AnimatedSection, SectionHeading } from "@/components/shared/AnimatedSection";

export function ReviewsSection() {
  return (
    <section className="section-alt py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <AnimatedSection>
          <SectionHeading
            title={HOME.sections.reviews.title}
            subtitle={HOME.sections.reviews.subtitle}
            eyebrow="Testimonials"
          />
        </AnimatedSection>
        <div className="grid gap-6 md:grid-cols-3">
          {HOME.reviews.map((review, i) => (
            <AnimatedSection key={review.author} delay={i * 0.1} direction="up">
              <motion.div
                whileHover={{ y: -6, rotate: i % 2 === 0 ? 0.5 : -0.5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="glass-card flex h-full flex-col p-7"
              >
                <Quote className="h-9 w-9 text-gold-500/40" />
                <p className="mt-5 flex-1 font-sans text-base leading-relaxed text-ink-muted italic">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div className="mt-7 border-t border-navy-700/80 pt-5">
                  <p className="font-display font-semibold text-ink">{review.author}</p>
                  <p className="mt-1 font-accent text-sm text-gold-500">{review.company}</p>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
