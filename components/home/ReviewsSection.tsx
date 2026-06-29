import { Quote } from "lucide-react";
import { HOME } from "@/constants/home";
import { AnimatedSection, SectionHeading } from "@/components/shared/AnimatedSection";

export function ReviewsSection() {
  return (
    <section className="py-24 bg-navy-900/30">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <AnimatedSection>
          <SectionHeading
            title={HOME.sections.reviews.title}
            subtitle={HOME.sections.reviews.subtitle}
          />
        </AnimatedSection>
        <div className="grid gap-6 md:grid-cols-3">
          {HOME.reviews.map((review, i) => (
            <AnimatedSection key={review.author} delay={i * 0.1}>
              <div className="flex h-full flex-col rounded-xl border border-navy-700 bg-navy-900/50 p-6">
                <Quote className="h-8 w-8 text-gold-500/50" />
                <p className="mt-4 flex-1 text-white/70 leading-relaxed italic">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div className="mt-6 border-t border-white/5 pt-4">
                  <p className="font-semibold text-white">{review.author}</p>
                  <p className="text-sm text-gold-400">{review.company}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
