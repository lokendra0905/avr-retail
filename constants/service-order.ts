/** Canonical display order for all service categories (matches folder names in public/assets/services/). */
export const SERVICE_FOLDER_ORDER = [
  "Eyewear & Optical Retail",
  "Fashion & Apparel",
  "Luxury Jewellery",
  "Footwear Stores",
  "Mobile & Electronics",
  "Gift & Toy Stores",
  "Beauty & Cosmetics",
  "Watch & Lifestyle",
] as const;

export const SERVICE_SLUG_ORDER = [
  "eyewear-optical-retail",
  "fashion-apparel",
  "luxury-jewellery",
  "footwear-stores",
  "mobile-electronics",
  "gift-toy-stores",
  "beauty-cosmetics",
  "watch-lifestyle",
] as const;

export function sortByServiceSlug<T extends { slug: string }>(items: T[]): T[] {
  const rank = new Map<string, number>(SERVICE_SLUG_ORDER.map((slug, i) => [slug, i]));
  return [...items].sort(
    (a, b) => (rank.get(a.slug) ?? Number.MAX_SAFE_INTEGER) - (rank.get(b.slug) ?? Number.MAX_SAFE_INTEGER)
  );
}

export function sortServiceFolderNames(folders: string[]): string[] {
  const rank = new Map<string, number>(SERVICE_FOLDER_ORDER.map((name, i) => [name, i]));
  return [...folders].sort(
    (a, b) => (rank.get(a) ?? Number.MAX_SAFE_INTEGER) - (rank.get(b) ?? Number.MAX_SAFE_INTEGER)
  );
}
