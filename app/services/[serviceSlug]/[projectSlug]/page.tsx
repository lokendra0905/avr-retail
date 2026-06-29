import { notFound } from "next/navigation";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";
import {
  getAllProjectPaths,
  getProjectBySlug,
  getRelatedProjects,
} from "@/lib/services";
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
    { name: "Services", path: "/services" },
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

      <section className="relative py-24">
        <div className="absolute inset-0">
          <Image
            src={project.coverImage}
            alt={project.seo.title}
            fill
            className="object-cover opacity-30"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-950/95 to-navy-950" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-6">
          <Breadcrumbs
            items={[
              { name: "Services", path: "/services" },
              { name: service.title, path: `/services/${serviceSlug}` },
              { name: project.title, path: `/services/${serviceSlug}/${projectSlug}` },
            ]}
            className="mb-8"
          />
          <AnimatedSection>
            <span className="rounded-full bg-gold-500/20 px-3 py-1 text-sm font-medium text-gold-400">
              {service.title}
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold text-white md:text-5xl">
              {project.title}
            </h1>
            {project.location && (
              <p className="mt-3 flex items-center gap-2 text-white/60">
                <MapPin className="h-4 w-4 text-gold-500" />
                {project.location}
              </p>
            )}
            <p className="mt-6 max-w-3xl text-lg text-white/70 leading-relaxed">
              {project.description}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <AnimatedSection>
            <h2 className="font-display text-2xl font-bold text-white mb-8">
              Project Gallery
            </h2>
          </AnimatedSection>
          <ProjectGallery images={project.gallery} projectTitle={project.title} />
          <VideoSection videos={videos} />
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-16 border-t border-white/5">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <AnimatedSection>
              <h2 className="font-display text-2xl font-bold text-white mb-8">
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
