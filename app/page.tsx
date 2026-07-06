import { buildMetadata } from "@/lib/seo";
import { HOME } from "@/constants/home";
import { HomeExperience } from "@/components/home/HomeExperience";

export const metadata = buildMetadata({
  title: HOME.seo.title,
  description: HOME.seo.description,
  keywords: [...HOME.seo.keywords],
  path: "/",
});

export default function HomePage() {
  return <HomeExperience />;
}
