import {
  SERVICES,
  getGalleryForService,
  getProjectsForService,
  type GeneratedServiceProject,
} from "@/constants/service-assets.generated";
import { sortByServiceSlug } from "@/constants/service-order";

export type ProjectMedia = {
  type: "image" | "video";
  src: string;
  alt?: string;
  caption?: string;
};

export type Project = {
  slug: string;
  title: string;
  location?: string;
  coverImage: string;
  excerpt: string;
  description: string;
  gallery: ProjectMedia[];
  seo: { title: string; description: string; keywords: string[] };
};

export type ServiceCategory = {
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  projects: Project[];
  gallery: ProjectMedia[];
  seo: { title: string; description: string; keywords: string[] };
};

const SERVICE_COPY: Record<
  string,
  { description: string; seo: ServiceCategory["seo"]; projectKeywords: string[] }
> = {
  "eyewear-optical-retail": {
    description:
      "Highly specialised in optical showroom design — from layout planning to custom optical store display solutions. AVR delivers end-to-end optical shop interior design nationwide.",
    projectKeywords: [
      "optical showroom design",
      "optical store interior design",
      "optical shop interior design",
      "optical store display solutions",
    ],
    seo: {
      title: "Eyewear & Optical Retail Interior Design India",
      description:
        "Expert optical showroom design, optical shop interior design, and optical store display solutions by AVR Retail.",
      keywords: [
        "optical showroom design",
        "optical store interior design",
        "optical shop interior design",
        "optical store display solutions",
      ],
    },
  },
  "luxury-jewellery": {
    description:
      "Luxury jewellery showroom design with strategic lighting, premium display cases, and retail space planning that elevates your brand presence.",
    projectKeywords: ["jewellery showroom design", "showroom design services", "shop interior design India"],
    seo: {
      title: "Luxury Jewellery Showroom Design Services India",
      description: "Custom luxury jewellery showroom design by AVR Retail across India.",
      keywords: ["jewellery showroom design", "showroom design services", "shop interior design India"],
    },
  },
  "footwear-stores": {
    description:
      "Dynamic footwear showroom design with engaging displays, efficient circulation, and brand-forward commercial interiors.",
    projectKeywords: ["shoe showroom design", "showroom design services", "shop interior design India"],
    seo: {
      title: "Footwear Store Design & Shop Interior Design India",
      description: "Professional footwear showroom design and retail space planning by AVR Retail.",
      keywords: ["shoe showroom design", "showroom design services", "shop interior design India"],
    },
  },
  "mobile-electronics": {
    description:
      "Tech-forward mobile and electronics showroom design with interactive zones, secure fixtures, and modern commercial interiors.",
    projectKeywords: ["mobile showroom design", "showroom design services", "commercial interior design India"],
    seo: {
      title: "Mobile & Electronics Showroom Design Services India",
      description: "Mobile and electronics showroom design by AVR Retail across India.",
      keywords: ["mobile showroom design", "showroom design services", "commercial interior design India"],
    },
  },
  "fashion-apparel": {
    description:
      "Fashion-forward apparel showroom design with flexible fixtures, fitting zones, and visual merchandising.",
    projectKeywords: ["garments showroom design", "shop renovation services", "shop interior design India"],
    seo: {
      title: "Fashion & Apparel Showroom Design Services India",
      description: "Fashion and apparel showroom design by AVR Retail — leading retail solutions provider in India.",
      keywords: ["garments showroom design", "shop renovation services", "shop interior design India"],
    },
  },
  "gift-toy-stores": {
    description:
      "Creative gift and toy showroom design with versatile display systems that showcase products beautifully.",
    projectKeywords: ["gift showroom design", "toy showroom design", "shop interior design India"],
    seo: {
      title: "Gift & Toy Store Design Services India",
      description: "Gift and toy showroom design and shop interior design India by AVR Retail.",
      keywords: ["gift showroom design", "toy showroom design", "shop interior design India"],
    },
  },
  "beauty-cosmetics": {
    description:
      "Beauty and cosmetics retail design with organised shelving, clear circulation, and brand-ready interiors.",
    projectKeywords: ["beauty store design", "cosmetics shop interior design", "shop interior design India"],
    seo: {
      title: "Beauty & Cosmetics Store Design Services India",
      description: "Beauty and cosmetics store interior design by AVR Retail across India.",
      keywords: ["beauty store design", "cosmetics shop interior design", "shop interior design India"],
    },
  },
  "watch-lifestyle": {
    description:
      "Premium watch and lifestyle showroom design with refined lighting, secure displays, and luxury retail detailing.",
    projectKeywords: ["watch showroom design", "showroom design services", "shop interior design India"],
    seo: {
      title: "Watch & Lifestyle Showroom Design Services India",
      description: "Watch and lifestyle showroom design and luxury retail fit-out by AVR Retail.",
      keywords: ["watch showroom design", "showroom design services", "shop interior design India"],
    },
  },
};

function defaultCopy(title: string): (typeof SERVICE_COPY)[string] {
  return {
    description: `End-to-end retail interior design and fit-out for ${title} by AVR Retail.`,
    projectKeywords: ["showroom design services", "shop interior design India", "retail fit out"],
    seo: {
      title: `${title} — Retail Interior Design by AVR Retail`,
      description: `Explore ${title} retail interior design projects by AVR Retail across India.`,
      keywords: ["showroom design services", "shop interior design India", "retail fit out"],
    },
  };
}

function projectFromGenerated(
  p: GeneratedServiceProject,
  serviceTitle: string,
  keywords: string[]
): Project {
  const locationText = p.location ? ` in ${p.location}` : "";
  const gallery: ProjectMedia[] = [
    ...p.galleryImages.map((src, i) => ({
      type: "image" as const,
      src,
      alt: `${p.title} ${serviceTitle.toLowerCase()} — photo ${i + 1}`,
      caption: `${p.title} — project photo ${i + 1}`,
    })),
    ...p.galleryVideos.map((src, i) => ({
      type: "video" as const,
      src,
      alt: `${p.title} showroom walkthrough video ${i + 1}`,
      caption: `${p.title} — project video ${i + 1}`,
    })),
  ];

  return {
    slug: p.slug,
    title: p.title,
    location: p.location,
    coverImage: p.coverImage,
    excerpt: `Premium ${serviceTitle.toLowerCase()} and retail fit-out for ${p.title} by AVR Retail.`,
    description: `AVR Retail delivered end-to-end ${serviceTitle.toLowerCase()} for ${p.title}${locationText}. From retail space planning and 3D visualization to custom display solutions, manufacturing, and on-site installation.`,
    gallery,
    seo: {
      title: `${p.title} — ${serviceTitle} by AVR Retail`,
      description: `Explore ${p.title} retail interior design by AVR Retail — ${serviceTitle.toLowerCase()}${locationText}.`,
      keywords,
    },
  };
}

function galleryForService(slug: string, title: string): ProjectMedia[] {
  const cat = getGalleryForService(slug);
  if (!cat) return [];
  return cat.galleryImages.map((src, i) => ({
    type: "image" as const,
    src,
    alt: `${title} — photo ${i + 1}`,
    caption: `${title} — photo ${i + 1}`,
  }));
}

export const SERVICE_CATEGORIES: ServiceCategory[] = sortByServiceSlug(
  SERVICES.map((service) => {
    const copy = SERVICE_COPY[service.slug] ?? defaultCopy(service.title);
    const projects = getProjectsForService(service.slug).map((p) =>
      projectFromGenerated(p, service.title, copy.projectKeywords)
    );
    const gallery = galleryForService(service.slug, service.title);

    return {
      slug: service.slug,
      title: service.title,
      description: copy.description,
      coverImage: service.coverImage,
      projects,
      gallery,
      seo: copy.seo,
    };
  })
);
