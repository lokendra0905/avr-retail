import { buildMetadata } from "@/lib/seo";
import { PortfolioContent } from "@/components/portfolio/PortfolioContent";

export const metadata = buildMetadata({
  title: "Portfolio | Our Retail Fit-Out Projects | AVR Retail",
  description:
    "Explore AVR Retail portfolio — optical showroom design, jewellery, footwear, mobile, garments and retail interior projects across India.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return <PortfolioContent />;
}
