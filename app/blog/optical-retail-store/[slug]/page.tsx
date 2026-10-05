import {
  buildBlogPostMetadata,
  BlogPostPageContent,
} from "@/components/blog/BlogPostPageContent";
import { getBlogSlugsForCategoryRoute } from "@/constants/blog";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getBlogSlugsForCategoryRoute().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
const { slug } = await params;
  return buildBlogPostMetadata(slug);
}

export default async function BlogPostCategoryPage({ params }: Props) {
  const { slug } = await params;
  return <BlogPostPageContent slug={slug} />;
}
