import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";
import {
  getAllProjectPaths,
  getProjectBySlug,
  getRelatedProjects,
} from "@/lib/services";
import { PageBanner } from "@/components/shared/PageBanner";
import { PageIntro } from "@/components/shared/PageIntro";
import { PageSection } from "@/components/shared/PageSection";
import { AnimatedSection, SectionHeading } from "@/components/shared/AnimatedSection";
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
    image: project.gallery.filter((m) => m.type === "image").map((m) => m.src),
  };

  const bannerSubtitle = project.location
    ? `${project.location} — ${service.title}`
    : service.title;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryJsonLd) }} />

      <PageBanner title={project.title} subtitle={bannerSubtitle} image={project.coverImage} imageAlt={project.seo.title} />
      <PageIntro
        items={[
          { name: "What We Do", path: "/services" },
          { name: service.title, path: `/services/${serviceSlug}` },
          { name: project.title, path: `/services/${serviceSlug}/${projectSlug}` },
        ]}
      >
        <AnimatedSection>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 font-game text-xs uppercase tracking-wider text-gold-500">
              {service.title}
            </span>
            {project.location && (
              <span className="flex items-center gap-1.5 text-ink-muted">
                <MapPin className="h-4 w-4 text-gold-500" />
                {project.location}
              </span>
            )}
          </div>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-muted">{project.description}</p>
        </AnimatedSection>
      </PageIntro>

      <PageSection>
        <AnimatedSection>
          <SectionHeading title="Project Gallery" eyebrow="Photos" align="left" />
        </AnimatedSection>
        <ProjectGallery images={project.gallery} projectTitle={project.title} />
        <VideoSection videos={videos} />
      </PageSection>

      {related.length > 0 && (
        <PageSection variant="alt">
          <AnimatedSection>
            <SectionHeading
              title={`More ${service.title} Projects`}
              eyebrow="Related Work"
              align="left"
            />
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProjectCard key={p.slug} project={p} serviceSlug={serviceSlug} />
            ))}
          </div>
        </PageSection>
      )}

      <PageSection>
        <CTABlock
          title="Start Your Project"
          subtitle={`Inspired by ${project.title}? Let's create something exceptional for your store.`}
        />
      </PageSection>
    </>
  );
}
