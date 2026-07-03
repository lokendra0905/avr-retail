export const SITE = {
  name: "AVR Retail Solutions Pvt. Ltd.",
  shortName: "AVR Retail",
  tagline: "Retail Solutions Provider in India",
  brandTagline: "better you display better you sell",
  description:
    "AVR Retail is a leading retail fit out company in India, specializing in optical showroom design, shop interior design, and end-to-end retail display solutions across major cities.",
  url: "https://www.avrretail.com",
  logo: "/images/logo.png",
  contact: {
    phone: "+919821169606",
    phoneDisplay: "+91 982-116-9606",
    email: "hello@avrretail.com",
    whatsapp: "919821169606",
    address:
      "Shed No. 2, Garhi Rd, near Hanuman Mandir, Basai Village, Sector 9B, Gurugram, Haryana 122001",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.223391462141!2d77.0266!3d28.4595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDI3JzM0LjIiTiA3N8KwMDEnMzUuOCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    mapLink: "https://maps.google.com/?q=AVR+Retail+Solutions+Gurugram",
  },
  social: {
    facebook: "https://www.facebook.com/avrretail",
    instagram: "https://www.instagram.com/avrretail",
    linkedin: "https://www.linkedin.com/company/avrretail",
    youtube: "https://www.youtube.com/@avrretail",
  },
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
] as const;

export const FOOTER = {
  description:
    "AVR Retail is a trusted retail fit out company in India, delivering optical store interior design, showroom design services, and commercial interior design solutions nationwide.",
  quickLinks: NAV_LINKS,
  copyright: `© ${new Date().getFullYear()} AVR Retail Solutions Pvt. Ltd. All rights reserved.`,
} as const;

export const PROCESS_STEPS = [
  { title: "Concept", description: "Understanding your brand, space, and retail goals." },
  { title: "3D Design", description: "Visualizing your showroom with modern 3D rendering." },
  { title: "Manufacture", description: "In-house production with German technology machinery." },
  { title: "Install", description: "On-site installation and handover on time and budget." },
] as const;
