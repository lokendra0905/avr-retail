import { notFound } from "next/navigation";
import {
  buildMetadata,
  buildBreadcrumbJsonLd,
  buildServiceJsonLd,
} from "@/lib/seo";
import { getAllServiceSlugs, getServiceBySlug } from "@/lib/services";
import { PageBanner } from "@/components/shared/PageBanner";
import { PageIntro } from "@/components/shared/PageIntro";
import { PageSection } from "@/components/shared/PageSection";
import { AnimatedSection, SectionHeading } from "@/components/shared/AnimatedSection";
import { ProjectCard } from "@/components/services/ProjectCard";
import { ProjectGallery } from "@/components/services/ProjectGallery";
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

  const hasProjects = service.projects.length > 0;
  const hasGallery = service.gallery.length > 0;

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
      <PageIntro
        items={[
          { name: "What We Do", path: "/services" },
          { name: service.title, path: `/services/${serviceSlug}` },
        ]}
      />
      

      {hasProjects ? (
        <PageSection>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.projects.map((project) => (
              <ProjectCard key={project.slug} project={project} serviceSlug={serviceSlug} />
            ))}
          </div>
        </PageSection>
      ) : hasGallery ? (
        <PageSection>
          <ProjectGallery images={service.gallery} projectTitle={service.title} />
        </PageSection>
      ) : null}

      <PageSection variant="alt">
        <CTABlock title={`Start Your ${service.title} Project`} />
      </PageSection>
    </>
  );
}
