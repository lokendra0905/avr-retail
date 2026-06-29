import { notFound } from "next/navigation";
import Image from "next/image";
import {
  buildMetadata,
  buildBreadcrumbJsonLd,
  buildServiceJsonLd,
} from "@/lib/seo";
import {
  getAllServiceSlugs,
  getServiceBySlug,
} from "@/lib/services";
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
    { name: "Services", path: "/services" },
    { name: service.title, path: `/services/${serviceSlug}` },
  ]);
  const serviceJsonLd = buildServiceJsonLd(
    service.title,
    service.description,
    `/services/${serviceSlug}`
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <section className="relative py-24">
        <div className="absolute inset-0">
          <Image
            src={service.coverImage}
            alt={service.seo.title}
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-950/95 to-navy-950" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-6">
          <Breadcrumbs
            items={[{ name: "Services", path: "/services" }, { name: service.title, path: `/services/${serviceSlug}` }]}
            className="mb-8"
          />
          <AnimatedSection>
            <h1 className="font-display text-4xl font-bold text-white md:text-5xl">
              {service.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-white/70 leading-relaxed">
              {service.description}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <AnimatedSection>
            <h2 className="font-display text-2xl font-bold text-white mb-8">
              Our Process
            </h2>
          </AnimatedSection>
          <ProcessSteps />
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <AnimatedSection>
            <h2 className="font-display text-2xl font-bold text-white mb-2">
              Completed Projects
            </h2>
            <p className="text-white/60 mb-12">
              {service.projects.length} project{service.projects.length !== 1 ? "s" : ""} in {service.title.toLowerCase()}
            </p>
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.projects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                serviceSlug={serviceSlug}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <CTABlock
            title={`Start Your ${service.title} Project`}
            subtitle="Discuss your requirements with India's trusted retail fit out experts."
          />
        </div>
      </section>
    </>
  );
}
