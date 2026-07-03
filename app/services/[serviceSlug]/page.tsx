import { notFound } from "next/navigation";
import {
  buildMetadata,
  buildBreadcrumbJsonLd,
  buildServiceJsonLd,
} from "@/lib/seo";
import { getAllServiceSlugs, getServiceBySlug } from "@/lib/services";
import { PageBanner } from "@/components/shared/PageBanner";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ProjectCard } from "@/components/services/ProjectCard";
import { ProcessSteps } from "@/components/services/ProcessSteps";
import { CTABlock } from "@/components/shared/CTABlock";

type Props = { params: Promise<{ serviceSlug: string }> };

export async function generateStaticParams() {
  return getAllServiceSlugs().map((serviceSlug) => ({ serviceSlug }));
}

export async function generateMetadata({ params }: Props) {
  const { serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  if (!service) return {};
  return buildMetadata({
    title: service.seo.title,
    description: service.seo.description,
    keywords: service.seo.keywords,
    path: `/services/${serviceSlug}`,
    image: service.coverImage,
  });
}

export default async function ServiceCategoryPage({ params }: Props) {
  const { serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  if (!service) notFound();

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "What We Do", path: "/services" },
    { name: service.title, path: `/services/${serviceSlug}` },
  ]);
  const serviceJsonLd = buildServiceJsonLd(service.title, service.description, `/services/${serviceSlug}`);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <PageBanner title={service.title} subtitle={service.description} image={service.coverImage} />
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <Breadcrumbs
            items={[
              { name: "What We Do", path: "/services" },
              { name: service.title, path: `/services/${serviceSlug}` },
            ]}
          />
        </div>
      </section>
      <section className="py-12 border-t border-navy-700 bg-navy-900/50">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <AnimatedSection>
            <h2 className="font-display text-2xl font-bold text-ink mb-8">Our Process</h2>
          </AnimatedSection>
          <ProcessSteps />
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <AnimatedSection>
            <h2 className="font-display text-2xl font-bold text-ink mb-2">Completed Projects</h2>
            <p className="text-ink-muted mb-12">
              {service.projects.length} project{service.projects.length !== 1 ? "s" : ""} in {service.title.toLowerCase()}
            </p>
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.projects.map((project) => (
              <ProjectCard key={project.slug} project={project} serviceSlug={serviceSlug} />
            ))}
          </div>
        </div>
      </section>
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <CTABlock title={`Start Your ${service.title} Project`} />
        </div>
      </section>
    </>
  );
}
