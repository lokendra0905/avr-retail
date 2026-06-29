import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { ServiceCategory } from "@/constants/services";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export function ServiceCategoryCard({ service }: { service: ServiceCategory }) {
  return (
    <AnimatedSection>
      <Link
        href={`/services/${service.slug}`}
        className="group block overflow-hidden rounded-xl border border-navy-700 bg-navy-900/50 transition-all hover:border-gold-500/30"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={service.coverImage}
            alt={`${service.title} — AVR Retail showroom design services`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 to-transparent" />
        </div>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-white group-hover:text-gold-400 transition-colors">
            {service.title}
          </h2>
          <p className="mt-2 line-clamp-3 text-sm text-white/60">{service.description}</p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gold-400">
            {service.projects.length} Project{service.projects.length !== 1 ? "s" : ""}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </AnimatedSection>
  );
}
