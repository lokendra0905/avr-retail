"use client";

import { CursorGlow } from "@/components/home/CursorGlow";
import { ImmersiveHero } from "@/components/home/ImmersiveHero";
import { MarqueeStrip } from "@/components/home/MarqueeStrip";
import { InteractiveServices } from "@/components/home/InteractiveServices";
import { ProjectCarousel } from "@/components/home/ProjectCarousel";
import { SpotlightGrid } from "@/components/home/SpotlightGrid";
import { DesignProcess } from "@/components/home/DesignProcess";
import { StatsArena } from "@/components/home/StatsArena";
import { TestimonialCarousel } from "@/components/home/TestimonialCarousel";
import { LogoMarquee } from "@/components/home/LogoMarquee";
import { HomeCTA } from "@/components/home/HomeCTA";

export function HomeExperience() {
  return (
    <div className="home-experience">
      <CursorGlow />
      <ImmersiveHero />
      <MarqueeStrip />
      <InteractiveServices />
      <ProjectCarousel />
      <SpotlightGrid />
      <DesignProcess />
      <StatsArena />
      <TestimonialCarousel />
      <LogoMarquee />
      <HomeCTA />
    </div>
  );
}
