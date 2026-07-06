import { buildMetadata } from "@/lib/seo";
import { CONTACT } from "@/constants/contact";
import { PAGE_BANNERS } from "@/constants/page-banners";
import { PageBanner } from "@/components/shared/PageBanner";
import { PageSection } from "@/components/shared/PageSection";
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
    <>
      <PageBanner title={CONTACT.hero.title} subtitle={CONTACT.hero.subtitle} image={PAGE_BANNERS.contact.image} />
      <PageSection>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <AnimatedSection direction="left">
            <ContactInfo />
          </AnimatedSection>
          <AnimatedSection direction="right" delay={0.1}>
            <MapEmbed />
          </AnimatedSection>
        </div>
      </PageSection>
    </>
  );
}
