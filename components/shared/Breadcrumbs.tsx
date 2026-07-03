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
    <nav aria-label="Breadcrumb" className={cn("flex items-center gap-1 text-sm", className)}>
      <Link
        href="/"
        className="flex items-center text-ink-muted/80 transition-colors hover:text-gold-400"
      >
        <Home className="h-4 w-4" />
      </Link>
      {items.map((item, i) => (
        <span key={item.path} className="flex items-center gap-1">
          <ChevronRight className="h-4 w-4 text-ink-muted/40" />
          {i === items.length - 1 ? (
            <span className="text-gold-400">{item.name}</span>
          ) : (
            <Link
              href={item.path}
              className="text-ink-muted/80 transition-colors hover:text-ink"
            >
              {item.name}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
