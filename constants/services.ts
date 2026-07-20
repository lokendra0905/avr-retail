import { OPTICAL_PROJECTS } from "@/constants/optical-projects.generated";
import { getCategoryGallery } from "@/constants/category-galleries.generated";
import { OLD_SITE_IMAGES } from "@/constants/old-site-images";

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
  /** Named store projects (e.g. optical). Empty when only a photo gallery exists. */
  projects: Project[];
  /** Flat photo gallery shown on the service page when there are no named projects. */
  gallery: ProjectMedia[];
  seo: { title: string; description: string; keywords: string[] };
};

function opticalFromGenerated(p: (typeof OPTICAL_PROJECTS)[number]): Project {
  const gallery: ProjectMedia[] = [
    ...p.galleryImages.map((src, i) => ({
      type: "image" as const,
      src,
      alt: `${p.title} optical store interior design — photo ${i + 1}`,
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
    excerpt: `Premium optical showroom design and retail fit-out for ${p.title} by AVR Retail.`,
    description: `AVR Retail delivered end-to-end optical store interior design for ${p.title} in ${p.location}. From retail space planning and 3D visualization to custom optical store display solutions, manufacturing, and on-site installation.`,
    gallery,
    seo: {
      title: `${p.title} — Optical Store Interior Design by AVR Retail`,
      description: `Explore ${p.title} optical shop interior design by AVR Retail — optical showroom design and display solutions in ${p.location}.`,
      keywords: [
        "optical showroom design",
        "Optical store interior design",
        "optical shop interior design",
        "optical store display solutions",
      ],
    },
  };
}

function galleryFromCategory(slug: string, title: string): ProjectMedia[] {
  const cat = getCategoryGallery(slug);
  if (!cat) return [];
  return cat.galleryImages.map((src, i) => ({
    type: "image" as const,
    src,
    alt: `${title} — photo ${i + 1}`,
    caption: `${title} — photo ${i + 1}`,
  }));
}

function coverFromCategory(slug: string, fallback: string): string {
  return getCategoryGallery(slug)?.coverImage ?? fallback;
}

function categoryService(opts: {
  slug: string;
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  fallbackCover: string;
}): ServiceCategory {
  const gallery = galleryFromCategory(opts.slug, opts.title);
  return {
    slug: opts.slug,
    title: opts.title,
    description: opts.description,
    coverImage: coverFromCategory(opts.slug, opts.fallbackCover),
    projects: [],
    gallery,
    seo: {
      title: opts.seoTitle,
      description: opts.seoDescription,
      keywords: opts.keywords,
    },
  };
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    slug: "optical-store-design",
    title: "Optical Store Design",
    description:
      "Highly specialised in optical showroom design — from layout planning to custom optical store display solutions. AVR is among the best optical shop 3D designers in India, delivering end-to-end optical shop interior design nationwide.",
    coverImage: OPTICAL_PROJECTS[0]?.coverImage ?? OLD_SITE_IMAGES.categories.optical,
    projects: OPTICAL_PROJECTS.map(opticalFromGenerated),
    gallery: [],
    seo: {
      title: "Optical Showroom Design & Optical Store Interior Design India",
      description:
        "Expert optical showroom design, optical shop interior design, and optical store display solutions by AVR Retail — leading optical shop layout designer in India.",
      keywords: [
        "optical showroom design",
        "Optical store interior design",
        "optical shop interior design",
        "optical shop layout designer in India",
        "optical store display solutions",
        "best optical shop 3D designers in India",
      ],
    },
  },
  categoryService({
    slug: "jewellery-showroom-design",
    title: "Jewellery Showroom Design",
    description:
      "Luxury jewellery showroom design with strategic lighting, premium display cases, and retail space planning that elevates your brand presence.",
    seoTitle: "Jewellery Showroom Design Services India",
    seoDescription:
      "Custom jewellery showroom design by AVR Retail — a trusted retail fit out company in India.",
    keywords: ["jewellery showroom design", "showroom design services", "shop interior design India"],
    fallbackCover: OLD_SITE_IMAGES.categories.jewellery,
  }),
  categoryService({
    slug: "shoe-showroom-design",
    title: "Shoe Showroom Design",
    description:
      "Dynamic footwear showroom design with engaging displays, efficient circulation, and brand-forward commercial interiors.",
    seoTitle: "Shoe Showroom Design & Shop Interior Design India",
    seoDescription: "Professional shoe showroom design and retail space planning by AVR Retail.",
    keywords: ["shoe showroom design", "showroom design services", "shop interior design India"],
    fallbackCover: OLD_SITE_IMAGES.categories.shoe,
  }),
  categoryService({
    slug: "mobile-showroom-design",
    title: "Mobile Showroom Design",
    description:
      "Tech-forward mobile showroom design with interactive zones, secure fixtures, and modern commercial interior design.",
    seoTitle: "Mobile Showroom Design Services India",
    seoDescription: "Mobile showroom design and retail fit out solutions by AVR Retail across India.",
    keywords: ["mobile showroom design", "showroom design services", "commercial interior design India"],
    fallbackCover: OLD_SITE_IMAGES.categories.mobile,
  }),
  categoryService({
    slug: "garments-showroom-design",
    title: "Garments Showroom Design",
    description:
      "Fashion-forward garments showroom design with flexible fixtures, fitting zones, and visual merchandising.",
    seoTitle: "Garments Showroom Design & Shop Renovation Services",
    seoDescription: "Garments showroom design by AVR Retail — leading retail solutions provider in India.",
    keywords: ["garments showroom design", "shop renovation services", "shop interior design India"],
    fallbackCover: OLD_SITE_IMAGES.services.port1,
  }),
  categoryService({
    slug: "supermarket-design",
    title: "Supermarket Design",
    description:
      "Efficient supermarket design with optimised aisles, category zoning, and durable fixtures for high-traffic retail.",
    seoTitle: "Supermarket Design & Retail Space Planning India",
    seoDescription: "Supermarket design and retail space planning by AVR Retail.",
    keywords: ["supermarket design", "retail space planning", "commercial interior design India"],
    fallbackCover: OLD_SITE_IMAGES.services.porte2,
  }),
  categoryService({
    slug: "gift-showroom-design",
    title: "Gift & Toy Showroom Design",
    description:
      "Creative gift and toy showroom design with versatile display systems that showcase products beautifully.",
    seoTitle: "Gift & Toy Showroom Design Services India",
    seoDescription: "Gift and toy showroom design and shop interior design India by AVR Retail.",
    keywords: ["gift showroom design", "toy showroom design", "shop interior design India"],
    fallbackCover: OLD_SITE_IMAGES.services.porte1,
  }),
  categoryService({
    slug: "medical-store-design",
    title: "Medical Store Design",
    description:
      "Functional medical and pharmacy store design with organised shelving, clear circulation, and brand-ready interiors.",
    seoTitle: "Medical Store Design & Pharmacy Interior Design India",
    seoDescription: "Medical store and pharmacy interior design by AVR Retail across India.",
    keywords: ["medical store design", "pharmacy interior design", "shop interior design India"],
    fallbackCover: OLD_SITE_IMAGES.services.retailInterior,
  }),
  categoryService({
    slug: "watch-showroom-design",
    title: "Watch Showroom Design",
    description:
      "Premium watch showroom design with refined lighting, secure displays, and luxury retail detailing.",
    seoTitle: "Watch Showroom Design Services India",
    seoDescription: "Watch showroom design and luxury retail fit-out by AVR Retail.",
    keywords: ["watch showroom design", "showroom design services", "shop interior design India"],
    fallbackCover: OLD_SITE_IMAGES.services.port1,
  }),
];
