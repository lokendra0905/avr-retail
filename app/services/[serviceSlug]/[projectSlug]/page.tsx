import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";
import {
  getAllProjectPaths,
  getProjectBySlug,
  getRelatedProjects,
} from "@/lib/services";
import { PageBanner } from "@/components/shared/PageBanner";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ProjectGallery } from "@/components/services/ProjectGallery";
import { VideoSection } from "@/components/services/VideoSection";
import { ProjectCard } from "@/components/services/ProjectCard";
import { CTABlock } from "@/components/shared/CTABlock";

type Props = {
  params: Promise<{ serviceSlug: string; projectSlug: string }>;
};

export async function generateStaticParams() {
  return getAllProjectPaths().map(({ serviceSlug, projectSlug }) => ({
    serviceSlug,
    projectSlug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { serviceSlug, projectSlug } = await params;
  const data = getProjectBySlug(serviceSlug, projectSlug);
  if (!data) return {};
  return buildMetadata({
    title: data.project.seo.title,
    description: data.project.seo.description,
    keywords: data.project.seo.keywords,
    path: `/services/${serviceSlug}/${projectSlug}`,
    image: data.project.coverImage,
  });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { serviceSlug, projectSlug } = await params;
  const data = getProjectBySlug(serviceSlug, projectSlug);
  if (!data) notFound();

  const { service, project } = data;
  const related = getRelatedProjects(serviceSlug, projectSlug, 3);
  const videos = project.gallery.filter((m) => m.type === "video");

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "What We Do", path: "/services" },
    { name: service.title, path: `/services/${serviceSlug}` },
    { name: project.title, path: `/services/${serviceSlug}/${projectSlug}` },
  ]);

  const galleryJsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: project.title,
    description: project.description,
    image: project.gallery
      .filter((m) => m.type === "image")
      .map((m) => m.src),
  };

  const bannerSubtitle = project.location
    ? `${project.location} — ${service.title}`
    : service.title;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryJsonLd) }}
      />

      <PageBanner
        title={project.title}
        subtitle={bannerSubtitle}
        image={project.coverImage}
        imageAlt={project.seo.title}
      />

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <Breadcrumbs
            items={[
              { name: "What We Do", path: "/services" },
              { name: service.title, path: `/services/${serviceSlug}` },
              { name: project.title, path: `/services/${serviceSlug}/${projectSlug}` },
            ]}
          />
          <AnimatedSection className="mt-8">
            <span className="rounded-full bg-gold-500/15 px-3 py-1 text-sm font-medium text-gold-600">
              {service.title}
            </span>
            {project.location && (
              <p className="mt-4 flex items-center gap-2 text-ink-muted">
                <MapPin className="h-4 w-4 text-gold-500" />
                {project.location}
              </p>
            )}
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-muted">
              {project.description}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 border-t border-navy-700">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <AnimatedSection>
            <h2 className="font-display text-2xl font-bold text-ink mb-8">
              Project Gallery
            </h2>
          </AnimatedSection>
          <ProjectGallery images={project.gallery} projectTitle={project.title} />
          <VideoSection videos={videos} />
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-16 border-t border-navy-700">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <AnimatedSection>
              <h2 className="font-display text-2xl font-bold text-ink mb-8">
                More {service.title} Projects
              </h2>
            </AnimatedSection>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProjectCard key={p.slug} project={p} serviceSlug={serviceSlug} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <CTABlock
            title="Start Your Project"
            subtitle={`Inspired by ${project.title}? Let's create something exceptional for your store.`}
          />
        </div>
      </section>
    </>
  );
}
