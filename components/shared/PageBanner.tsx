import Image from "next/image";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

type PageBannerProps = {
  title: string;
  subtitle?: string;
  image: string;
  imageAlt?: string;
};

export function PageBanner({ title, subtitle, image, imageAlt }: PageBannerProps) {
  return (
    <section className="relative flex min-h-[280px] items-end overflow-hidden md:min-h-[340px]">
      <Image
        src={image}
        alt={imageAlt || title}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-12 pt-28 md:px-6 md:pb-16">
        <AnimatedSection>
          <h1 className="font-display text-3xl font-bold text-white drop-shadow-md md:text-4xl lg:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 max-w-2xl text-lg text-white/90 drop-shadow">{subtitle}</p>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}
