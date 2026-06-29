import { buildMetadata } from "@/lib/seo";
import { HOME } from "@/constants/home";
import { Hero } from "@/components/home/Hero";
import { IntroSection } from "@/components/home/IntroSection";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { StatsSection } from "@/components/home/StatsSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { LogoMarquee } from "@/components/home/LogoMarquee";
import { FeaturedWorks } from "@/components/home/FeaturedWorks";
import { CTABlock } from "@/components/shared/CTABlock";

export const metadata = buildMetadata({
  title: HOME.seo.title,
  description: HOME.seo.description,
  keywords: [...HOME.seo.keywords],
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <IntroSection />
      <ServicesPreview />
      <StatsSection />
      <FeaturedWorks />
      <ReviewsSection />
      <LogoMarquee />
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <CTABlock />
        </div>
      </section>
    </>
  );
}
