import { buildMetadata } from "@/lib/seo";
import { PAGE_KEYWORDS } from "@/constants/seo-keywords";
import { PAGE_BANNERS } from "@/constants/page-banners";
import { getAllServices } from "@/lib/services";
import { PageBanner } from "@/components/shared/PageBanner";
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
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <AnimatedSection>
            <p className="max-w-3xl text-lg text-ink-muted leading-relaxed">
              From optical showroom design to supermarket fit-outs — AVR Retail delivers shop interior design
              India businesses trust. We simplify retail fit-outs through skilled craftsmanship, modern 3D design,
              and end-to-end turnkey execution.
            </p>
          </AnimatedSection>
          <div className="mt-16">
            <SectionHeading title="Our Service Categories" subtitle="Select a category to view completed projects" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <ServiceCategoryCard key={service.slug} service={service} />
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <CTABlock />
        </div>
      </section>
    </>
  );
}
