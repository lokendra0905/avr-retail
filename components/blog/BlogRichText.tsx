import Link from "next/link";
import { linkifyBlogText } from "@/lib/blog-links";

export function BlogRichText({ text }: { text: string }) {
  const segments = linkifyBlogText(text);

  return (
    <>
      {segments.map((seg, i) =>
        seg.type === "link" ? (
          <Link
            key={`${seg.href}-${i}-${seg.value}`}
            href={seg.href}
            className="font-semibold text-gold-500 underline decoration-gold-500/40 underline-offset-4 transition-colors hover:text-gold-600 hover:decoration-gold-600"
          >
            {seg.value}
          </Link>
        ) : (
          <span key={`t-${i}`}>{seg.value}</span>
        )
      )}
    </>
  );
}
