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

export function getFeaturedProjects(limit = 6): {
  service: ServiceCategory;
  project: Project;
}[] {
  const featured: { service: ServiceCategory; project: Project }[] = [];
  for (const service of SERVICE_CATEGORIES) {
    for (const project of service.projects) {
      featured.push({ service, project });
      if (featured.length >= limit) return featured;
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
