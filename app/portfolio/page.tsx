import { buildMetadata } from "@/lib/seo";
import { PAGE_BANNERS } from "@/constants/page-banners";
import { PageBanner } from "@/components/shared/PageBanner";
import { getAllProjectPaths, getProjectBySlug } from "@/lib/services";
import { ProjectCard } from "@/components/services/ProjectCard";
import { AnimatedSection, SectionHeading } from "@/components/shared/AnimatedSection";
import { CTABlock } from "@/components/shared/CTABlock";

export const metadata = buildMetadata({
  title: "Portfolio | Our Retail Fit-Out Projects | AVR Retail",
  description:
    "Explore AVR Retail portfolio — optical showroom design, jewellery, footwear, mobile and retail interior projects across India.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  const projects = getAllProjectPaths()
    .map(({ serviceSlug, projectSlug }) => getProjectBySlug(serviceSlug, projectSlug))
    .filter(Boolean) as NonNullable<ReturnType<typeof getProjectBySlug>>[];

  return (
    <>
      <PageBanner
        title="Our Portfolio"
        subtitle="Turning retail spaces into success — explore our completed showroom and fit-out projects across India."
        image={PAGE_BANNERS.portfolio.image}
        imageAlt={PAGE_BANNERS.portfolio.alt}
      />
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <AnimatedSection>
            <SectionHeading
              title="Recent Projects"
              subtitle="The works are the most tangible measure of our success."
            />
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map(({ service, project }) => (
              <ProjectCard key={`${service.slug}-${project.slug}`} project={project} serviceSlug={service.slug} />
            ))}
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
