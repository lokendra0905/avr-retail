import { PAGE_KEYWORDS } from "@/constants/seo-keywords";

export const CONTACT = {
  seo: {
    title: "Contact AVR Retail | Get a Quote Today",
    description:
      "Contact AVR Retail — India's leading retail solutions provider. Call, WhatsApp, or email us for optical showroom design, shop interior design, and retail fit out services.",
    keywords: [
      PAGE_KEYWORDS.contact.primary,
      ...PAGE_KEYWORDS.contact.secondary,
    ],
  },
  hero: {
    title: "Let's Get In Touch",
    subtitle:
      "Ready to transform your retail space? Reach out for showroom design services, shop renovation, or a free consultation.",
  },
  officeHours: [
    { day: "Monday – Saturday", hours: "9:00 AM – 6:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ],
} as const;
