import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

type BreadcrumbItem = {
  name: string;
  path: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "inline-flex flex-wrap items-center gap-1 rounded-full border border-navy-700/60 bg-white/80 px-4 py-2 font-accent text-sm shadow-sm backdrop-blur-sm",
        className
      )}
    >
      <Link
        href="/"
        className="flex items-center text-ink-muted transition-colors hover:text-gold-500"
      >
        <Home className="h-3.5 w-3.5" />
      </Link>
      {items.map((item, i) => (
        <span key={item.path} className="flex items-center gap-1">
          <ChevronRight className="h-3.5 w-3.5 text-ink-muted/40" />
          {i === items.length - 1 ? (
            <span className="font-medium text-gold-500">{item.name}</span>
          ) : (
            <Link href={item.path} className="text-ink-muted transition-colors hover:text-ink">
              {item.name}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
