import { PAGE_KEYWORDS } from "@/constants/seo-keywords";
import { OLD_SITE_IMAGES } from "@/constants/old-site-images";

export const ABOUT = {
  seo: {
    title: "About AVR Retail | Retail Fit Out Company in India",
    description:
      "Learn about AVR Retail — a leading retail fit out company in India delivering commercial interior design, optical showroom design, and end-to-end retail solutions since 2013.",
    keywords: [
      PAGE_KEYWORDS.about.primary,
      ...PAGE_KEYWORDS.about.secondary,
    ],
  },
  hero: {
    title: "About AVR Retail",
    subtitle: "Pioneering retail interior solutions across India since 2013",
  },
  company: {
    title: "Why Us?",
    paragraphs: [
      "AVR Retail Solution Pvt. Ltd. is a leading retail solution provider of India with its presence in almost all major cities. Excellent customer service and product quality has enabled the company to develop a good clientele base and continuous increase in the business volume.",
      "The promoters dreamed of designing business places displayed perfectly, lively and naturally — spaces depicted in their content, specialty, imagination and reflection. That dream became AVR Retail Solution Private Limited. Today AVR is a leading retail solution service provider in India with core operational deliverables varying from conceptualizing, manufacturing and installation.",
      "AVR is dedicated to developing products according to proven developmental policies that ensure the stability and quality of end products. The best brands deserve to be displayed in the best manner — and we consistently meet this commitment through world-class end-to-end display solutions.",
    ],
  },
  vision: {
    title: "Vision",
    quote:
      "We want to establish AVR Retail Solutions Pvt. Ltd. as a pioneer and the most trusted solution provider in retail management across the globe by delivering value to our stakeholders.",
  },
  mission: {
    title: "Mission",
    quote:
      "Our in-house manufacturing team is committed to provide innovative, modern day quality solution in the retail display. We will bring affordable, durable and superior quality products in retail by developing a good clientele base and continuous increase in the business volume.",
  },
  timeline: [
    { year: "2013", title: "Founded", description: "AVR Retail Solutions established in Gurugram." },
    { year: "2014", title: "Expansion", description: "Expanded optical showroom design services across North India." },
    { year: "2015", title: "Manufacturing", description: "In-house production facility with German technology machinery." },
    { year: "2016", title: "National Reach", description: "Projects delivered in 20+ cities across India." },
    { year: "2017", title: "Diversification", description: "Added jewellery, footwear, and mobile showroom design." },
    { year: "2018", title: "3D Design Studio", description: "Launched dedicated 3D visualization team." },
    { year: "2019", title: "International", description: "Projects delivered outside India for optical brands." },
    { year: "2020", title: "Growth", description: "Crossed 1500+ retail projects milestone." },
    { year: "2021", title: "Innovation", description: "Advanced display solutions and smart lighting systems." },
    { year: "2024", title: "Today", description: "Leading retail fit out company serving clients nationwide." },
  ],
  achievements: [
    { value: "1500+", label: "Projects Completed" },
    { value: "50K+", label: "Sqft Production" },
    { value: "100+", label: "Cities Served" },
    { value: "12+", label: "Years of Excellence" },
  ],
  team: [
    {
      name: "Ramesh Jangir",
      role: "Founder & CEO",
      bio: "Founder member passionate about innovative retail display designs. His expertise in bringing retail solutions to ground reality has helped thousands of customers across India.",
      image: OLD_SITE_IMAGES.team.ramesh,
    },
    {
      name: "Sharmila",
      role: "Director",
      bio: "Founder member providing continuous support from the beginning. Timely execution, quality work and trust building are core to her strategy.",
      image: OLD_SITE_IMAGES.team.sharmila,
    },
    {
      name: "Yashpal Singh",
      role: "Advisory Board Member",
      bio: "IIM Ahmedabad graduate with extensive experience in marketing and business management, guiding AVR's growth planning and quality control.",
      image: OLD_SITE_IMAGES.team.yashpal,
    },
    {
      name: "Satish Jangir",
      role: "Advisory Board Member",
      bio: "Expert in vastu and layout plans, helping clients achieve remarkable market share through strategic store planning.",
      image: OLD_SITE_IMAGES.team.satish,
    },
    {
      name: "Yogender",
      role: "Advisory Board Member",
      bio: "Embedded developer providing practical solutions for display management, lighting, and electrical circuits.",
      image: OLD_SITE_IMAGES.team.yogender,
    },
    {
      name: "Yogesh",
      role: "Advisory Board Member",
      bio: "NIIT Mumbai graduate with international industry exposure, driving innovative retail display design solutions.",
      image: OLD_SITE_IMAGES.team.yogesh,
    },
  ],
} as const;
