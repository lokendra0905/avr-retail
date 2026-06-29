import { buildMetadata } from "@/lib/seo";
import { PAGE_KEYWORDS } from "@/constants/seo-keywords";
import { getAllServices } from "@/lib/services";
import { AnimatedSection, SectionHeading } from "@/components/shared/AnimatedSection";
import { ServiceCategoryCard } from "@/components/services/ServiceCategoryCard";
import { CTABlock } from "@/components/shared/CTABlock";

export const metadata = buildMetadata({
  title: "Showroom Design Services & Shop Interior Design India",
  description:
    "AVR Retail offers showroom design services, shop interior design India, retail space planning, and shop renovation services across all retail segments.",
  keywords: [
    PAGE_KEYWORDS.services.primary,
    ...PAGE_KEYWORDS.services.secondary,
  ],
  path: "/services",
});

export default function ServicesPage() {
  const services = getAllServices();

  return (
    <>
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <AnimatedSection>
            <h1 className="font-display text-4xl font-bold text-white md:text-5xl">
              Showroom Design Services
            </h1>
            <p className="mt-4 max-w-3xl text-xl text-white/60">
              From optical showroom design to supermarket fit-outs — AVR Retail delivers
              shop interior design India businesses trust. Explore our retail space planning
              and shop renovation services by category.
            </p>
          </AnimatedSection>

          <div className="mt-16">
            <SectionHeading
              title="Our Service Categories"
              subtitle="Select a category to view completed projects"
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <ServiceCategoryCard key={service.slug} service={service} />
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <CTABlock />
        </div>
      </section>
    </>
  );
}
