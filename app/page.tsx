import BlogFeed, { type BlogFeedPost } from "@/components/BlogFeed";
import { normalizeDateOnly } from "@/lib/date";
import { getAllContent } from "@/lib/markdown";

export default function HomePage() {
  const posts: BlogFeedPost[] = getAllContent("blog")
    .map((post: any) => ({
      slug: post.slug,
      title: String(post.title ?? ""),
      description: String(post.description ?? ""),
      publishDate: normalizeDateOnly(post.publish_date),
      tags: Array.isArray(post.tags) ? post.tags.map(String) : [],
    }))
    .sort((a, b) => b.publishDate.localeCompare(a.publishDate));

  return <BlogFeed posts={posts} />;
}
