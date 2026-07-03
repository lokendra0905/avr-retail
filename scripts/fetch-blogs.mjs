import fs from "fs";

const slugs = [
  "build-a-perfect-optical-store-display",
  "ideal-optical-shop-interior-design",
  "introduce-3d-designs-to-your-optical-showroom",
  "most-effective-display-solutions-for-optical-shop",
  "optical-showroom-design-ideas",
  "optical-store-interior-design-guide",
  "perfect-the-layout-of-your-optical-shop-with-avr-retail",
];

function decodeHtml(text) {
  return text
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function extractContent(html) {
  const editorMatch = html.match(
    /class="content CommonEditor"[^>]*>([\s\S]*?)<\/div>\s*<div class="History_link"/i
  );
  if (!editorMatch) return [];

  const editorHtml = editorMatch[1]
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "");

  const blocks = [];
  const tagRegex = /<(h1|h2|h3|p)[^>]*>([\s\S]*?)<\/\1>/gi;
  let match;
  while ((match = tagRegex.exec(editorHtml)) !== null) {
    const tag = match[1].toLowerCase();
    const text = decodeHtml(match[2]);
    if (!text || text.length < 2) continue;
    if (tag === "h1") continue;
    if (tag === "h2") blocks.push(`## ${text}`);
    else if (tag === "h3") blocks.push(`### ${text}`);
    else {
      const boldOnly = match[2].match(/^<b>([^<]+)<\/b>\s*$/i);
      if (boldOnly) blocks.push(`### ${decodeHtml(boldOnly[1])}`);
      else blocks.push(text);
    }
  }
  return blocks;
}

const posts = [];

for (const slug of slugs) {
  const res = await fetch(
    `https://www.avrretail.com/blog/optical-retail-store/${slug}`
  );
  const html = await res.text();
  const title =
    html.match(/<title>\s*([^<|]+)/)?.[1]?.trim().replace(/\s+/g, " ") || slug;
  const description =
    html.match(/name="description" content="([^"]+)"/)?.[1] || "";
  const keywords =
    html
      .match(/name="keywords" content="([^"]+)"/)?.[1]
      ?.split(",")
      .map((s) => s.trim()) || [];
  const coverImage = `https://www.avrretail.com/AvrRetailImages/BlogImage/${slug}.jpg`;

  let paragraphs = extractContent(html);
  if (paragraphs.length === 0) paragraphs = [description];

  posts.push({
    slug,
    title,
    excerpt: description,
    description,
    date: "2024-01-15",
    coverImage,
    author: "AVR Retail Team",
    content: paragraphs,
    seo: {
      title: title,
      description,
      keywords,
    },
  });
  console.log(`✓ ${slug}: ${paragraphs.length} blocks`);
}

fs.writeFileSync(
  "constants/blog-posts.generated.json",
  JSON.stringify(posts, null, 2)
);
