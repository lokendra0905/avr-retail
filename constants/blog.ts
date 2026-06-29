import { PAGE_KEYWORDS } from "@/constants/seo-keywords";
import { OLD_SITE_IMAGES } from "@/constants/old-site-images";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  date: string;
  coverImage: string;
  author: string;
  content: string[];
  seo: { title: string; description: string; keywords: string[] };
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "optical-showroom-design-trends-2024",
    title: "Top Optical Showroom Design Trends for 2024",
    excerpt:
      "Discover the latest trends in optical store interior design that are transforming eyewear retail across India.",
    description:
      "Explore 2024 optical showroom design trends including minimalist displays, smart lighting, and customer-centric layouts.",
    date: "2024-06-15",
    coverImage: OLD_SITE_IMAGES.categories.optical,
    author: "AVR Retail Team",
    content: [
      "The optical retail landscape in India is evolving rapidly. Modern optical shop interior design now focuses on creating immersive customer experiences while maximising product visibility.",
      "Key trends include open-plan layouts that encourage exploration, integrated technology stations for eye testing, and sustainable materials that reflect brand values. AVR Retail has been at the forefront of these changes, delivering optical store display solutions that combine aesthetics with functionality.",
      "Lighting plays a crucial role in optical showroom design. Proper illumination not only showcases frames beautifully but also creates a welcoming atmosphere that keeps customers engaged longer.",
      "Whether you're planning a new optical store or considering shop renovation services, partnering with experienced optical shop layout designers in India ensures your investment delivers lasting returns.",
    ],
    seo: {
      title: "Optical Showroom Design Trends 2024 | AVR Retail Blog",
      description:
        "Latest optical showroom design and optical shop interior design trends for 2024 from AVR Retail experts.",
      keywords: [
        "optical showroom design",
        "optical shop interior design",
        "optical store display solutions",
      ],
    },
  },
  {
    slug: "retail-space-planning-guide",
    title: "A Complete Guide to Retail Space Planning",
    excerpt:
      "Learn how strategic retail space planning can increase footfall and boost sales for your showroom.",
    description:
      "Comprehensive guide to retail space planning for Indian retailers — from layout principles to fixture selection.",
    date: "2024-05-20",
    coverImage: OLD_SITE_IMAGES.services.retailInterior,
    author: "AVR Retail Team",
    content: [
      "Effective retail space planning is the foundation of any successful showroom. It determines how customers move through your store, which products they see first, and how long they stay.",
      "At AVR Retail, our approach to retail space planning begins with understanding your target customer, product mix, and brand positioning. We then create layouts that guide natural traffic flow while highlighting high-margin products.",
      "For optical stores, this means positioning trial stations strategically and ensuring display cases are at optimal viewing heights. For footwear and garments showrooms, it means creating clear pathways between seasonal collections.",
      "Investing in professional showroom design services pays dividends through increased conversion rates and enhanced brand perception.",
    ],
    seo: {
      title: "Retail Space Planning Guide | AVR Retail Blog",
      description:
        "Expert guide to retail space planning and showroom design services by AVR Retail, India.",
      keywords: ["retail space planning", "showroom design services"],
    },
  },
  {
    slug: "choosing-retail-fit-out-company",
    title: "How to Choose the Right Retail Fit Out Company in India",
    excerpt:
      "Key factors to consider when selecting a retail fit out partner for your next showroom project.",
    description:
      "Tips for choosing a reliable retail fit out company in India for your commercial interior design project.",
    date: "2024-04-10",
    coverImage: OLD_SITE_IMAGES.hero.banner2,
    author: "AVR Retail Team",
    content: [
      "Selecting the right retail fit out company is one of the most important decisions for any retailer expanding or renovating. The right partner delivers on time, within budget, and with quality that lasts.",
      "Look for a company with proven experience in your retail segment. If you're opening an optical store, choose a partner with a portfolio of optical store interior design projects. Check references and visit completed showrooms.",
      "In-house manufacturing capability is a significant advantage. Companies like AVR Retail with German technology machinery can control quality and timelines better than those relying solely on third-party fabricators.",
      "Finally, ensure your fit out partner offers end-to-end services — from 3D design and retail space planning to manufacturing, installation, and after-sales support.",
    ],
    seo: {
      title: "Choosing a Retail Fit Out Company in India | AVR Retail",
      description:
        "How to choose the best retail fit out company in India for commercial interior design projects.",
      keywords: [
        "retail fit out company in india",
        "retail fit out company",
        "commercial interior design India",
      ],
    },
  },
];

export const BLOG = {
  seo: {
    title: "Blog | Retail Design Insights | AVR Retail",
    description:
      "Expert insights on optical showroom design, retail space planning, shop interior design, and retail fit out trends from AVR Retail.",
    keywords: [
      PAGE_KEYWORDS.blog.primary,
      ...PAGE_KEYWORDS.blog.secondary,
    ],
  },
  hero: {
    title: "Our Blog",
    subtitle: "Insights on retail design, space planning, and industry trends",
  },
} as const;

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return BLOG_POSTS.map((p) => p.slug);
}
