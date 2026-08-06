/** Keyword → service path. Longer phrases must come first for correct matching. */
export const BLOG_SERVICE_LINKS: { phrase: string; href: string }[] = [
  { phrase: "optical store display solutions", href: "/services/eyewear-optical-retail" },
  { phrase: "optical shop display solutions", href: "/services/eyewear-optical-retail" },
  { phrase: "optical showroom display solutions", href: "/services/eyewear-optical-retail" },
  { phrase: "optical store interior design", href: "/services/eyewear-optical-retail" },
  { phrase: "optical shop interior design", href: "/services/eyewear-optical-retail" },
  { phrase: "optical showroom interior design", href: "/services/eyewear-optical-retail" },
  { phrase: "optical shop 3d designers in india", href: "/services/eyewear-optical-retail" },
  { phrase: "optical shop 3d designer in india", href: "/services/eyewear-optical-retail" },
  { phrase: "optical shop 3d designers", href: "/services/eyewear-optical-retail" },
  { phrase: "optical shop 3d designer", href: "/services/eyewear-optical-retail" },
  { phrase: "optical shop layout designer", href: "/services/eyewear-optical-retail" },
  { phrase: "optical store display", href: "/services/eyewear-optical-retail" },
  { phrase: "optical shop display", href: "/services/eyewear-optical-retail" },
  { phrase: "optical showroom display", href: "/services/eyewear-optical-retail" },
  { phrase: "optical showroom design", href: "/services/eyewear-optical-retail" },
  { phrase: "optical store design", href: "/services/eyewear-optical-retail" },
  { phrase: "optical shop interior", href: "/services/eyewear-optical-retail" },
  { phrase: "optical showroom", href: "/services/eyewear-optical-retail" },
  { phrase: "optical store", href: "/services/eyewear-optical-retail" },
  { phrase: "optical shop", href: "/services/eyewear-optical-retail" },
  { phrase: "optical display", href: "/services/eyewear-optical-retail" },
  { phrase: "jewellery showroom design", href: "/services/luxury-jewellery" },
  { phrase: "jewellery showroom", href: "/services/luxury-jewellery" },
  { phrase: "shoe showroom design", href: "/services/footwear-stores" },
  { phrase: "footwear showroom", href: "/services/footwear-stores" },
  { phrase: "mobile showroom design", href: "/services/mobile-electronics" },
  { phrase: "mobile showroom", href: "/services/mobile-electronics" },
  { phrase: "garments showroom design", href: "/services/fashion-apparel" },
  { phrase: "garments showroom", href: "/services/fashion-apparel" },
  { phrase: "supermarket design", href: "/services" },
  { phrase: "gift showroom design", href: "/services/gift-toy-stores" },
  { phrase: "toy showroom design", href: "/services/gift-toy-stores" },
  { phrase: "medical store design", href: "/services/beauty-cosmetics" },
  { phrase: "beauty store design", href: "/services/beauty-cosmetics" },
  { phrase: "cosmetics shop interior design", href: "/services/beauty-cosmetics" },
  { phrase: "watch showroom design", href: "/services/watch-lifestyle" },
  { phrase: "watch showroom", href: "/services/watch-lifestyle" },
  { phrase: "retail space planning", href: "/services" },
  { phrase: "showroom design services", href: "/services" },
  { phrase: "shop interior design", href: "/services" },
  { phrase: "retail fit out", href: "/services" },
  { phrase: "retail fit-out", href: "/services" },
  { phrase: "3d design", href: "/services/eyewear-optical-retail" },
  { phrase: "3d designs", href: "/services/eyewear-optical-retail" },
];

export type RichSegment =
  | { type: "text"; value: string }
  | { type: "link"; value: string; href: string };

export function linkifyBlogText(text: string): RichSegment[] {
  const sorted = [...BLOG_SERVICE_LINKS].sort(
    (a, b) => b.phrase.length - a.phrase.length
  );
  const pattern = sorted
    .map((k) => k.phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  if (!pattern) return [{ type: "text", value: text }];

  const regex = new RegExp(`(${pattern})`, "gi");
  const hrefMap = new Map(
    sorted.map((k) => [k.phrase.toLowerCase(), k.href])
  );

  const segments: RichSegment[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: "text", value: text.slice(lastIndex, match.index) });
    }
    const matched = match[0];
    const href = hrefMap.get(matched.toLowerCase()) ?? "/services";
    segments.push({ type: "link", value: matched, href });
    lastIndex = match.index + matched.length;
  }

  if (lastIndex < text.length) {
    segments.push({ type: "text", value: text.slice(lastIndex) });
  }

  return segments.length ? segments : [{ type: "text", value: text }];
}
