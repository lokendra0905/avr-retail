import { buildMetadata } from "@/lib/seo";
import { CONTACT } from "@/constants/contact";
import { PAGE_BANNERS } from "@/constants/page-banners";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { PageBanner } from "@/components/shared/PageBanner";
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
    <>
      <PageBanner title={CONTACT.hero.title} subtitle={CONTACT.hero.subtitle} image={PAGE_BANNERS.contact.image} />
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <AnimatedSection delay={0.1}>
              <ContactInfo />
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <MapEmbed />
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
