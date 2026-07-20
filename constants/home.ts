import { PAGE_KEYWORDS } from "@/constants/seo-keywords";
import { OLD_SITE_IMAGES } from "@/constants/old-site-images";

export const HOME = {
  seo: {
    title: "Retail Solutions Provider in India | AVR Retail",
    description:
      "AVR Retail is a leading retail fit out company in India offering optical showroom design, shop interior design, retail space planning, and commercial interior design solutions nationwide.",
    keywords: [
      PAGE_KEYWORDS.home.primary,
      ...PAGE_KEYWORDS.home.secondary,
    ],
  },
  hero: {
    headline: "Premium Retail Fit-Out Solutions Across India",
    subheadline:
      "Transforming retail environments with innovative design, precision manufacturing, and seamless installation for brands that want to stand out.",
    ctaPrimary: { label: "Call Us Now", type: "phone" as const },
    ctaSecondary: { label: "View Our Work", href: "/portfolio" },
    backgroundVideo: "/assets/video/hero.mp4",
    backgroundPoster: OLD_SITE_IMAGES.hero.banner1,
  },
  intro: {
    title: "India's Trusted Retail Fit Out Company",
    paragraphs: [
      "AVR Retail Solution Pvt. Ltd. is a leading retail solutions provider in India with presence in almost all major cities. Excellent customer service and product quality has enabled the company to develop a strong clientele and continuous business growth.",
      "From optical store interior design to jewellery, footwear, and mobile showrooms — we deliver commercial interior design India businesses rely on. Our German technology-based machinery enables faster manufacturing without compromising quality.",
    ],
    capabilities: [
      {
        title: "3D Design",
        description:
          "Retail concepts come to reality through 3D designing with proper alignment to client imagination. Among the best optical shop 3D designers in India.",
        icon: "box" as const,
      },
      {
        title: "Display Design",
        description:
          "Strategic custom display creation that differentiates brands, heightens consumer interaction, and drives product sales.",
        icon: "layout" as const,
      },
      {
        title: "Showroom Design",
        description:
          "Successful retailing through creativity, product display, and budget-conscious showroom design services.",
        icon: "store" as const,
      },
      {
        title: "Signages Design",
        description:
          "Clear visibility and attention-seeking signage that has increased footfall many fold for various clients.",
        icon: "signpost" as const,
      },
    ],
  },
  stats: [
    { value: 12, suffix: "+", label: "Years Experience" },
    { value: 5, suffix: "+", label: "Countries Active" },
    { value: 2, suffix: "K+", label: "Retail Projects" },
    { value: 50, suffix: "K+", label: "Sqft Production House" },
  ],
  reviews: [
    {
      quote:
        "Wonderful experience, great work by those guys at a very reasonable price. The design is really awesome.",
      author: "Anvesh Reddy",
      company: "Reddy Optical",
    },
    {
      quote:
        "I really appreciate the art work of AVR Retail Solutions for my upcoming showroom. Though I am associated with you from last 4 years and also had very good experience working in past for my other showroom.",
      author: "Manzar Alam",
      company: "Optical Palace, Dhanbad",
    },
    {
      quote:
        "AVR delivered exceptional optical shop display solutions. Their attention to retail space planning made our store stand out in the market.",
      author: "Rajesh Kumar",
      company: "Vision Care Plus",
    },
  ],
  clientLogos: OLD_SITE_IMAGES.clients.map((c) => ({ name: c.name, src: c.src })),
  sections: {
    services: { title: "Our Services", subtitle: "Showroom design services across every retail segment" },
    stats: { title: "Our Track Record", subtitle: "Numbers that reflect our commitment to excellence" },
    reviews: { title: "Customer Reviews", subtitle: "What our clients say about us" },
    clients: { title: "Trusted By Leading Brands", subtitle: "Proud partners across India" },
    featured: { title: "Featured Work", subtitle: "Explore our latest retail interior projects" },
  },
} as const;
