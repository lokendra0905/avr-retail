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

function photosToGallery(
  photos: readonly string[],
  title: string
): ProjectMedia[] {
  return photos.map((src, i) => ({
    type: "image" as const,
    src,
    alt: `${title} optical store interior design photo ${i + 1} by AVR Retail India`,
    caption: `${title} — project photo ${i + 1}`,
  }));
}

function opticalProject(
  slug: string,
  title: string,
  location: string,
  excerpt: string,
  coverImage: string,
  photos: readonly string[]
): Project {
  return {
    slug,
    title,
    location,
    coverImage,
    excerpt,
    description: `AVR Retail delivered a complete optical store interior design for ${title} in ${location}. From retail space planning and 3D visualization to custom optical store display solutions and on-site installation, this project showcases our expertise as optical shop layout designers in India.`,
    gallery: photosToGallery(photos, title),
    seo: {
      title: `${title} — Optical Store Interior Design by AVR Retail, India`,
      description: `Explore ${title} optical shop interior design project by AVR Retail. Professional optical showroom design and optical shop display solutions in ${location}.`,
      keywords: [
        "optical showroom design",
        "Optical store interior design",
        "optical shop interior design",
        "optical store display solutions",
      ],
    },
  };
}

function placeholderProject(
  slug: string,
  title: string,
  categoryTitle: string,
  location: string,
  coverImage: string,
  galleryPhotos: readonly string[] = [coverImage]
): Project {
  return {
    slug,
    title,
    location,
    coverImage,
    excerpt: `Premium ${categoryTitle.toLowerCase()} by AVR Retail in ${location}.`,
    description: `AVR Retail designed and executed this ${categoryTitle.toLowerCase()} project for ${title}, combining creative showroom design services with practical retail space planning.`,
    gallery: photosToGallery(galleryPhotos, title),
    seo: {
      title: `${title} — ${categoryTitle} by AVR Retail`,
      description: `${title} ${categoryTitle.toLowerCase()} project by AVR Retail, a leading retail fit out company in India.`,
      keywords: ["showroom design services", "shop interior design India"],
    },
  };
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    slug: "optical-store-design",
    title: "Optical Store Design",
    description:
      "Highly specialised in optical showroom design — from optical shop layout planning to custom optical store display solutions. AVR is among the best optical shop 3D designers in India, delivering end-to-end optical shop interior design for leading brands nationwide.",
    coverImage: OLD_SITE_IMAGES.categories.optical,
    projects: [
      opticalProject(
        "ajanta-optical",
        "Ajanta Optical",
        "India",
        "Complete optical showroom design with custom display fixtures and premium finishes.",
        OLD_SITE_IMAGES.gallery.ajantaOptical.cover,
        OLD_SITE_IMAGES.gallery.ajantaOptical.photos
      ),
      opticalProject(
        "asian-optical",
        "Asian Optical",
        "India",
        "Modern optical shop interior design with strategic product display zones.",
        OLD_SITE_IMAGES.gallery.asianOptical.cover,
        OLD_SITE_IMAGES.gallery.asianOptical.photos
      ),
      opticalProject(
        "better-vision",
        "Better Vision",
        "India",
        "Elegant optical store interior design focused on customer experience.",
        OLD_SITE_IMAGES.gallery.betterVision.cover,
        OLD_SITE_IMAGES.gallery.betterVision.photos
      ),
      opticalProject(
        "daulat-optical",
        "Daulat Optical",
        "India",
        "Full retail fit-out with optical shop display solutions and signage.",
        OLD_SITE_IMAGES.gallery.daulatOptical.cover,
        OLD_SITE_IMAGES.gallery.daulatOptical.photos
      ),
      opticalProject(
        "extra-vision",
        "Extra Vision",
        "India",
        "Contemporary optical showroom design with efficient space planning.",
        OLD_SITE_IMAGES.gallery.extraVision.cover,
        OLD_SITE_IMAGES.gallery.extraVision.photos
      ),
      opticalProject(
        "gupta-eye-care-sirsa",
        "Gupta Eye Care Sirsa",
        "Sirsa, Haryana",
        "Comprehensive eye care showroom with premium optical store display solutions.",
        OLD_SITE_IMAGES.gallery.guptaEyeCareSirsa.cover,
        OLD_SITE_IMAGES.gallery.guptaEyeCareSirsa.photos
      ),
    ],
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
        "optical shop display solutions",
        "best optical shop 3D designers in India",
      ],
    },
  },
  {
    slug: "jewellery-showroom-design",
    title: "Jewellery Showroom Design",
    description:
      "Luxury jewellery showroom design that highlights craftsmanship and drives sales through strategic lighting, display cases, and premium retail space planning.",
    coverImage: OLD_SITE_IMAGES.categories.jewellery,
    projects: [
      placeholderProject(
        "premium-jewels",
        "Premium Jewels",
        "Jewellery Showroom Design",
        "Delhi",
        OLD_SITE_IMAGES.categories.jewellery
      ),
    ],
    seo: {
      title: "Jewellery Showroom Design Services India",
      description:
        "Custom jewellery showroom design and shop interior design by AVR Retail — a trusted retail fit out company in India.",
      keywords: ["showroom design services", "shop interior design India"],
    },
  },
  {
    slug: "shoe-showroom-design",
    title: "Shoe Showroom Design",
    description:
      "Dynamic shoe showroom design with engaging product displays, efficient circulation paths, and brand-forward commercial interior design.",
    coverImage: OLD_SITE_IMAGES.categories.shoe,
    projects: [
      placeholderProject(
        "stride-footwear",
        "Stride Footwear",
        "Shoe Showroom Design",
        "Mumbai",
        OLD_SITE_IMAGES.categories.shoe
      ),
    ],
    seo: {
      title: "Shoe Showroom Design & Shop Interior Design India",
      description:
        "Professional shoe showroom design and retail space planning by AVR Retail across India.",
      keywords: ["showroom design services", "shop interior design India"],
    },
  },
  {
    slug: "mobile-showroom-design",
    title: "Mobile Showroom Design",
    description:
      "Tech-forward mobile showroom design with interactive display zones, secure fixtures, and modern commercial interior design tailored for electronics retail.",
    coverImage: OLD_SITE_IMAGES.categories.mobile,
    projects: [
      placeholderProject(
        "smart-mobile-hub",
        "Smart Mobile Hub",
        "Mobile Showroom Design",
        "Bangalore",
        OLD_SITE_IMAGES.categories.mobile
      ),
    ],
    seo: {
      title: "Mobile Showroom Design Services India",
      description:
        "Mobile showroom design and retail fit out solutions by AVR Retail — showroom design services across India.",
      keywords: ["showroom design services", "commercial interior design India"],
    },
  },
  {
    slug: "garments-showroom-design",
    title: "Garments Showroom Design",
    description:
      "Fashion-forward garments showroom design with flexible fixtures, fitting zones, and visual merchandising that elevates your brand.",
    coverImage: OLD_SITE_IMAGES.services.port1,
    projects: [
      placeholderProject(
        "style-avenue",
        "Style Avenue",
        "Garments Showroom Design",
        "Jaipur",
        OLD_SITE_IMAGES.services.port1,
        [OLD_SITE_IMAGES.services.port1, OLD_SITE_IMAGES.services.porte1]
      ),
    ],
    seo: {
      title: "Garments Showroom Design & Shop Renovation Services",
      description:
        "Garments showroom design and shop renovation services by AVR Retail, a leading retail solutions provider in India.",
      keywords: ["shop renovation services", "shop interior design India"],
    },
  },
  {
    slug: "supermarket-design",
    title: "Supermarket Design",
    description:
      "Efficient supermarket design with optimised aisles, category zoning, and durable fixtures for high-traffic retail environments.",
    coverImage: OLD_SITE_IMAGES.services.porte2,
    projects: [
      placeholderProject(
        "fresh-mart",
        "Fresh Mart",
        "Supermarket Design",
        "Pune",
        OLD_SITE_IMAGES.services.porte2,
        [OLD_SITE_IMAGES.services.porte2, OLD_SITE_IMAGES.services.porte3]
      ),
    ],
    seo: {
      title: "Supermarket Design & Retail Space Planning India",
      description:
        "Supermarket design and retail space planning by AVR Retail — commercial interior design India experts.",
      keywords: ["retail space planning", "commercial interior design India"],
    },
  },
  {
    slug: "gift-showroom-design",
    title: "Gift Showroom Design",
    description:
      "Creative gift showroom design with versatile display systems that showcase products beautifully and encourage exploration.",
    coverImage: OLD_SITE_IMAGES.services.porte1,
    projects: [
      placeholderProject(
        "gift-gallery",
        "Gift Gallery",
        "Gift Showroom Design",
        "Chandigarh",
        OLD_SITE_IMAGES.services.porte1
      ),
    ],
    seo: {
      title: "Gift Showroom Design Services India",
      description:
        "Gift showroom design and shop interior design India by AVR Retail.",
      keywords: ["showroom design services", "shop interior design India"],
    },
  },
  {
    slug: "medical-store-design",
    title: "Medical Store Design",
    description:
      "Compliant medical store design with organised shelving, clear signage, and hygienic finishes for pharmacy and healthcare retail.",
    coverImage: OLD_SITE_IMAGES.services.retailInterior,
    projects: [
      placeholderProject(
        "health-plus-pharmacy",
        "Health Plus Pharmacy",
        "Medical Store Design",
        "Gurugram",
        OLD_SITE_IMAGES.services.retailInterior
      ),
    ],
    seo: {
      title: "Medical Store Design & Shop Interior Design India",
      description:
        "Medical store design and commercial interior design by AVR Retail across India.",
      keywords: ["shop interior design India", "commercial interior design India"],
    },
  },
];
