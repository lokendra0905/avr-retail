export const TARGET_KEYWORDS = [
  "retail solutions provider in India",
  "optical showroom design",
  "retail fit out company in india",
  "retail fit out company",
  "showroom design services",
  "Optical store interior design",
  "optical shop interior design",
  "optical shop layout designer in India",
  "commercial interior design India",
  "optical store display solutions",
  "retail space planning",
  "shop renovation services",
  "best optical shop 3D designers in India",
  "shop interior design India",
  "optical shop display solutions",
] as const;

export const PAGE_KEYWORDS = {
  home: {
    primary: "retail solutions provider in India",
    secondary: [
      "retail fit out company in India",
      "retail fit out company",
      "commercial interior design India",
      "best optical shop 3D designers in India",
    ],
  },
  about: {
    primary: "retail fit out company in India",
    secondary: ["retail fit out company", "commercial interior design India"],
  },
  services: {
    primary: "showroom design services",
    secondary: [
      "shop interior design India",
      "retail space planning",
      "shop renovation services",
    ],
  },
  optical: {
    primary: "optical showroom design",
    secondary: [
      "Optical store interior design",
      "optical shop interior design",
      "optical shop layout designer in India",
      "optical store display solutions",
      "optical shop display solutions",
      "best optical shop 3D designers in India",
    ],
  },
  contact: {
    primary: "retail solutions provider in India",
    secondary: ["retail fit out company in India", "shop interior design India"],
  },
  blog: {
    primary: "retail space planning",
    secondary: ["showroom design services", "shop interior design India"],
  },
} as const;
