/** Keyword → service path. Longer phrases must come first for correct matching. */
export const BLOG_SERVICE_LINKS: { phrase: string; href: string }[] = [
  { phrase: "optical store display solutions", href: "/services/optical-store-design" },
  { phrase: "optical shop display solutions", href: "/services/optical-store-design" },
  { phrase: "optical showroom display solutions", href: "/services/optical-store-design" },
  { phrase: "optical store interior design", href: "/services/optical-store-design" },
  { phrase: "optical shop interior design", href: "/services/optical-store-design" },
  { phrase: "optical showroom interior design", href: "/services/optical-store-design" },
  { phrase: "optical shop 3d designers in india", href: "/services/optical-store-design" },
  { phrase: "optical shop 3d designer in india", href: "/services/optical-store-design" },
  { phrase: "optical shop 3d designers", href: "/services/optical-store-design" },
  { phrase: "optical shop 3d designer", href: "/services/optical-store-design" },
  { phrase: "optical shop layout designer", href: "/services/optical-store-design" },
  { phrase: "optical store display", href: "/services/optical-store-design" },
  { phrase: "optical shop display", href: "/services/optical-store-design" },
  { phrase: "optical showroom display", href: "/services/optical-store-design" },
  { phrase: "optical showroom design", href: "/services/optical-store-design" },
  { phrase: "optical store design", href: "/services/optical-store-design" },
  { phrase: "optical shop interior", href: "/services/optical-store-design" },
  { phrase: "optical showroom", href: "/services/optical-store-design" },
  { phrase: "optical store", href: "/services/optical-store-design" },
  { phrase: "optical shop", href: "/services/optical-store-design" },
  { phrase: "optical display", href: "/services/optical-store-design" },
  { phrase: "jewellery showroom design", href: "/services/jewellery-showroom-design" },
  { phrase: "jewellery showroom", href: "/services/jewellery-showroom-design" },
  { phrase: "shoe showroom design", href: "/services/shoe-showroom-design" },
  { phrase: "footwear showroom", href: "/services/shoe-showroom-design" },
  { phrase: "mobile showroom design", href: "/services/mobile-showroom-design" },
  { phrase: "mobile showroom", href: "/services/mobile-showroom-design" },
  { phrase: "garments showroom design", href: "/services/garments-showroom-design" },
  { phrase: "garments showroom", href: "/services/garments-showroom-design" },
  { phrase: "supermarket design", href: "/services/supermarket-design" },
  { phrase: "gift showroom design", href: "/services/gift-showroom-design" },
  { phrase: "medical store design", href: "/services/medical-store-design" },
  { phrase: "watch showroom design", href: "/services/watch-showroom-design" },
  { phrase: "watch showroom", href: "/services/watch-showroom-design" },
  { phrase: "retail space planning", href: "/services" },
  { phrase: "showroom design services", href: "/services" },
  { phrase: "shop interior design", href: "/services" },
  { phrase: "retail fit out", href: "/services" },
  { phrase: "retail fit-out", href: "/services" },
  { phrase: "3d design", href: "/services/optical-store-design" },
  { phrase: "3d designs", href: "/services/optical-store-design" },
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
