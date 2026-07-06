import { buildMetadata } from "@/lib/seo";
import { PAGE_KEYWORDS } from "@/constants/seo-keywords";
import { PAGE_BANNERS } from "@/constants/page-banners";
import { getAllServices } from "@/lib/services";
import { PageBanner } from "@/components/shared/PageBanner";
import { PageSection } from "@/components/shared/PageSection";
import { AnimatedSection, SectionHeading } from "@/components/shared/AnimatedSection";
import { ServiceCategoryCard } from "@/components/services/ServiceCategoryCard";
import { CTABlock } from "@/components/shared/CTABlock";

export const metadata = buildMetadata({
  title: "Showroom Design Services & Shop Interior Design India",
  description:
    "AVR Retail offers showroom design services, shop interior design India, retail space planning, and turnkey retail fit-out across all segments.",
  keywords: [PAGE_KEYWORDS.services.primary, ...PAGE_KEYWORDS.services.secondary],
  path: "/services",
});

export default function ServicesPage() {
  const services = getAllServices();

  return (
    <>
      <PageBanner
        title="What We Do"
        subtitle="Experience excellence in retail fit-outs — from concept design to manufacturing and installation."
        image={PAGE_BANNERS.services.image}
      />
      <PageSection>
        <AnimatedSection>
          <p className="max-w-3xl text-lg leading-relaxed text-ink-muted">
            From optical showroom design to supermarket fit-outs — AVR Retail delivers shop interior design
            India businesses trust. We simplify retail fit-outs through skilled craftsmanship, modern 3D design,
            and end-to-end turnkey execution.
          </p>
        </AnimatedSection>
        <div className="mt-20">
          <SectionHeading
            title="Service Categories"
            subtitle="Select a category to view completed projects"
            eyebrow="Explore"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCategoryCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </PageSection>
      <PageSection variant="alt">
        <CTABlock />
      </PageSection>
    </>
  );
}
