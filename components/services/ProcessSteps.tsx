import { PROCESS_STEPS } from "@/constants/site";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export function ProcessSteps() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {PROCESS_STEPS.map((step, i) => (
        <AnimatedSection key={step.title} delay={i * 0.1}>
          <div className="relative rounded-xl border border-navy-700 bg-navy-900/50 p-5">
            <span className="font-display text-3xl font-bold text-gold-500/30">
              0{i + 1}
            </span>
            <h3 className="mt-2 font-semibold text-ink">{step.title}</h3>
            <p className="mt-2 text-sm text-ink-muted">{step.description}</p>
          </div>
        </AnimatedSection>
      ))}
    </div>
  );
}
