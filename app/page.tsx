import BlogFeed, { type BlogFeedPost } from "@/components/BlogFeed";
import { getAllContent } from "@/lib/markdown";

function toDateString(value: unknown) {
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "string") return value;
  if (typeof value === "number") return new Date(value).toISOString();
  return "";
}

export default function HomePage() {
  const posts: BlogFeedPost[] = getAllContent("blog")
    .map((post: any) => ({
      slug: post.slug,
      title: String(post.title ?? ""),
      description: String(post.description ?? ""),
      publishDate: toDateString(post.publish_date),
      tags: Array.isArray(post.tags) ? post.tags.map(String) : [],
    }))
    .sort(
      (a, b) =>
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime(),
    );

  return <BlogFeed posts={posts} />;
}
