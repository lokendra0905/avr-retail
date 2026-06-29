import { buildMetadata } from "@/lib/seo";
import { CONTACT } from "@/constants/contact";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { MapEmbed } from "@/components/contact/MapEmbed";

export const metadata = buildMetadata({
  title: CONTACT.seo.title,
  description: CONTACT.seo.description,
  keywords: [...CONTACT.seo.keywords],
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <AnimatedSection>
          <h1 className="font-display text-4xl font-bold text-white md:text-5xl">
            {CONTACT.hero.title}
          </h1>
          <p className="mt-4 text-xl text-white/60 max-w-2xl">
            {CONTACT.hero.subtitle}
          </p>
        </AnimatedSection>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <AnimatedSection delay={0.1}>
            <ContactInfo />
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <MapEmbed />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
