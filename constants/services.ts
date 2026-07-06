import { OPTICAL_PROJECTS } from "@/constants/optical-projects.generated";
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
  projects: Project[];
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

const GARMENT_IMAGES = [
  "/assets/garments/WhatsApp Image 2026-06-29 at 10.48.46 PM.jpeg",
  "/assets/garments/WhatsApp Image 2026-06-29 at 10.48.47 PM.jpeg",
  "/assets/garments/WhatsApp Image 2026-06-29 at 10.48.48 PM.jpeg",
  "/assets/garments/WhatsApp Image 2026-06-29 at 10.48.49 PM.jpeg",
  "/assets/garments/WhatsApp Image 2026-06-29 at 10.48.50 PM.jpeg",
  "/assets/garments/WhatsApp Image 2026-06-29 at 10.48.51 PM.jpeg",
];

function simpleProject(
  slug: string,
  title: string,
  categoryTitle: string,
  location: string,
  coverImage: string,
  images: string[] = [coverImage]
): Project {
  return {
    slug,
    title,
    location,
    coverImage,
    excerpt: `${categoryTitle} retail fit-out by AVR Retail in ${location}.`,
    description: `AVR Retail designed and executed this ${categoryTitle.toLowerCase()} for ${title}, combining creative showroom design with practical retail space planning and turnkey execution.`,
    gallery: images.map((src, i) => ({
      type: "image" as const,
      src,
      alt: `${title} — ${categoryTitle} photo ${i + 1}`,
    })),
    seo: {
      title: `${title} — ${categoryTitle} by AVR Retail`,
      description: `${title} ${categoryTitle.toLowerCase()} project by AVR Retail, India.`,
      keywords: ["showroom design services", "shop interior design India"],
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
  {
    slug: "jewellery-showroom-design",
    title: "Jewellery Showroom Design",
    description:
      "Luxury jewellery showroom design with strategic lighting, premium display cases, and retail space planning that elevates your brand presence.",
    coverImage: OLD_SITE_IMAGES.categories.jewellery,
    projects: [
      simpleProject("premium-jewels", "Premium Jewels", "Jewellery Showroom Design", "Delhi", OLD_SITE_IMAGES.categories.jewellery),
    ],
    seo: {
      title: "Jewellery Showroom Design Services India",
      description: "Custom jewellery showroom design by AVR Retail — a trusted retail fit out company in India.",
      keywords: ["showroom design services", "shop interior design India"],
    },
  },
  {
    slug: "shoe-showroom-design",
    title: "Shoe Showroom Design",
    description:
      "Dynamic footwear showroom design with engaging displays, efficient circulation, and brand-forward commercial interiors.",
    coverImage: OLD_SITE_IMAGES.categories.shoe,
    projects: [
      simpleProject("stride-footwear", "Stride Footwear", "Shoe Showroom Design", "Mumbai", OLD_SITE_IMAGES.categories.shoe),
    ],
    seo: {
      title: "Shoe Showroom Design & Shop Interior Design India",
      description: "Professional shoe showroom design and retail space planning by AVR Retail.",
      keywords: ["showroom design services", "shop interior design India"],
    },
  },
  {
    slug: "mobile-showroom-design",
    title: "Mobile Showroom Design",
    description:
      "Tech-forward mobile showroom design with interactive zones, secure fixtures, and modern commercial interior design.",
    coverImage: OLD_SITE_IMAGES.categories.mobile,
    projects: [
      simpleProject("smart-mobile-hub", "Smart Mobile Hub", "Mobile Showroom Design", "Bangalore", OLD_SITE_IMAGES.categories.mobile),
    ],
    seo: {
      title: "Mobile Showroom Design Services India",
      description: "Mobile showroom design and retail fit out solutions by AVR Retail across India.",
      keywords: ["showroom design services", "commercial interior design India"],
    },
  },
  {
    slug: "garments-showroom-design",
    title: "Garments Showroom Design",
    description:
      "Fashion-forward garments showroom design with flexible fixtures, fitting zones, and visual merchandising.",
    coverImage: GARMENT_IMAGES[0],
    projects: [
      simpleProject("style-avenue", "Style Avenue", "Garments Showroom Design", "Jaipur", GARMENT_IMAGES[0], GARMENT_IMAGES),
    ],
    seo: {
      title: "Garments Showroom Design & Shop Renovation Services",
      description: "Garments showroom design by AVR Retail — leading retail solutions provider in India.",
      keywords: ["shop renovation services", "shop interior design India"],
    },
  },
  {
    slug: "supermarket-design",
    title: "Supermarket Design",
    description:
      "Efficient supermarket design with optimised aisles, category zoning, and durable fixtures for high-traffic retail.",
    coverImage: OLD_SITE_IMAGES.services.porte2,
    projects: [
      simpleProject("fresh-mart", "Fresh Mart", "Supermarket Design", "Pune", OLD_SITE_IMAGES.services.porte2),
    ],
    seo: {
      title: "Supermarket Design & Retail Space Planning India",
      description: "Supermarket design and retail space planning by AVR Retail.",
      keywords: ["retail space planning", "commercial interior design India"],
    },
  },
  {
    slug: "gift-showroom-design",
    title: "Gift Showroom Design",
    description: "Creative gift showroom design with versatile display systems that showcase products beautifully.",
    coverImage: OLD_SITE_IMAGES.services.porte1,
    projects: [
      simpleProject("gift-gallery", "Gift Gallery", "Gift Showroom Design", "Chandigarh", OLD_SITE_IMAGES.services.porte1),
    ],
    seo: {
      title: "Gift Showroom Design Services India",
      description: "Gift showroom design and shop interior design India by AVR Retail.",
      keywords: ["showroom design services", "shop interior design India"],
    },
  },
];
