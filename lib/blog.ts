import { normalizeDateOnly } from "@/lib/date";
import { getAllContent } from "@/lib/markdown";

export type BlogNavItem = {
  slug: string;
  title: string;
  description: string;
  publishDate: string;
  tags: string[];
};

export type BlogTocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type BlogSection = {
  id: string;
  title: string;
  posts: BlogNavItem[];
};

const sectionRules = [
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    terms: ["ai", "deep learning", "machine learning", "nlp", "transformer"],
  },
  {
    id: "cloud-infrastructure",
    title: "Kubernetes & Cloud",
    terms: ["kubernetes", "devops", "cloud native", "control plane", "master node"],
  },
  {
    id: "software-career",
    title: "Software Engineering & Career",
    terms: ["jobs", "career", "software engineering", "software engineer"],
  },
] as const;

export function slugifyHeading(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function getSortedBlogPosts(): BlogNavItem[] {
  return getAllContent("blog")
    .map((post: any) => ({
      slug: String(post.slug ?? ""),
      title: String(post.title ?? post.slug ?? ""),
      description: String(post.description ?? ""),
      publishDate: normalizeDateOnly(post.publish_date),
      tags: Array.isArray(post.tags) ? post.tags.map(String) : [],
    }))
    .sort((a, b) => b.publishDate.localeCompare(a.publishDate));
}

export function getBlogSections(posts: BlogNavItem[]): BlogSection[] {
  const groups = new Map<string, BlogNavItem[]>();
  for (const rule of sectionRules) groups.set(rule.id, []);
  groups.set("notes", []);

  for (const post of posts) {
    const haystack = [post.title, ...post.tags].join(" ").toLowerCase();
    const rule = sectionRules.find((candidate) =>
      candidate.terms.some((term) => haystack.includes(term)),
    );

    groups.get(rule?.id ?? "notes")?.push(post);
  }

  const sections: BlogSection[] = sectionRules.map((rule) => ({
    id: rule.id,
    title: rule.title,
    posts: groups.get(rule.id) ?? [],
  }));

  sections.push({
    id: "notes",
    title: "Notes",
    posts: groups.get("notes") ?? [],
  });

  return sections.filter((section) => section.posts.length > 0);
}

export function extractBlogToc(content: string): BlogTocItem[] {
  return content
    .split("\n")
    .map((line) => {
      const match = /^(##|###)\s+(.+?)\s*$/.exec(line);
      if (!match) return null;

      const text = match[2]
        .replace(/\[(.*?)\]\(.*?\)/g, "$1")
        .replace(/[\*_~]/g, "")
        .replace(/\x60/g, "")
        .trim();

      return {
        id: slugifyHeading(text),
        text,
        level: match[1] === "##" ? (2 as const) : (3 as const),
      };
    })
    .filter((item): item is BlogTocItem => Boolean(item));
}

export function stripMatchingH1(content: string, title: string) {
  const match = /^\s*#\s+(.+?)\s*\n+/.exec(content);
  if (!match) return content;

  const heading = match[1]
    .replace(/[\*_~]/g, "")
    .replace(/\x60/g, "")
    .trim();

  if (slugifyHeading(heading) !== slugifyHeading(title)) return content;

  return content.slice(match[0].length);
}
