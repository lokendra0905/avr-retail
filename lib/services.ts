import {
  SERVICE_CATEGORIES,
  type Project,
  type ServiceCategory,
} from "@/constants/services";

export function getAllServices(): ServiceCategory[] {
  return SERVICE_CATEGORIES;
}

export function getServiceBySlug(slug: string): ServiceCategory | undefined {
  return SERVICE_CATEGORIES.find((s) => s.slug === slug);
}

export function getProjectBySlug(
  serviceSlug: string,
  projectSlug: string
): { service: ServiceCategory; project: Project } | undefined {
  const service = getServiceBySlug(serviceSlug);
  if (!service) return undefined;
  const project = service.projects.find((p) => p.slug === projectSlug);
  if (!project) return undefined;
  return { service, project };
}

export function getAllServiceSlugs(): string[] {
  return SERVICE_CATEGORIES.map((s) => s.slug);
}

export function getAllProjectPaths(): { serviceSlug: string; projectSlug: string }[] {
  return SERVICE_CATEGORIES.flatMap((service) =>
    service.projects.map((project) => ({
      serviceSlug: service.slug,
      projectSlug: project.slug,
    }))
  );
}

/** Virtual project from a category photo gallery (no named stores). */
export function galleryAsProject(service: ServiceCategory): Project {
  return {
    slug: "gallery",
    title: service.title,
    coverImage: service.coverImage,
    excerpt: `${service.gallery.length}+ photos from our ${service.title.toLowerCase()} work across India.`,
    description: service.description,
    gallery: service.gallery,
    seo: service.seo,
  };
}

export function getFeaturedHref(serviceSlug: string, projectSlug: string): string {
  if (projectSlug === "gallery") return `/services/${serviceSlug}`;
  return `/services/${serviceSlug}/${projectSlug}`;
}

/**
 * Round-robin across categories.
 * Named projects first; gallery-only categories contribute one virtual entry each.
 */
export function getFeaturedProjects(limit = 6): {
  service: ServiceCategory;
  project: Project;
}[] {
  const queues = SERVICE_CATEGORIES.map((service) => {
    if (service.projects.length > 0) {
      return { service, projects: [...service.projects] };
    }
    if (service.gallery.length > 0) {
      return { service, projects: [galleryAsProject(service)] };
    }
    return { service, projects: [] as Project[] };
  }).filter((q) => q.projects.length > 0);

  const featured: { service: ServiceCategory; project: Project }[] = [];
  let cursor = 0;

  while (featured.length < limit && queues.length > 0) {
    const idx = cursor % queues.length;
    const queue = queues[idx];
    const project = queue.projects.shift();
    if (project) {
      featured.push({ service: queue.service, project });
    }
    if (queue.projects.length === 0) {
      queues.splice(idx, 1);
    } else {
      cursor = idx + 1;
    }
  }

  return featured;
}

export function getRelatedProjects(
  serviceSlug: string,
  projectSlug: string,
  limit = 3
): Project[] {
  const service = getServiceBySlug(serviceSlug);
  if (!service) return [];
  return service.projects.filter((p) => p.slug !== projectSlug).slice(0, limit);
}
