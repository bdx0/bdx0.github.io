import type { ReactNode } from "react";

import BlogDocsLayout from "@/components/BlogDocsLayout";
import {
  getBlogSections,
  type BlogNavItem,
  type BlogTocItem,
} from "@/lib/blog";

type BlogDocsShellProps = {
  posts: BlogNavItem[];
  currentSlug?: string;
  toc?: BlogTocItem[];
  children: ReactNode;
};

export default function BlogDocsShell({
  posts,
  currentSlug,
  toc = [],
  children,
}: BlogDocsShellProps) {
  return (
    <BlogDocsLayout
      sections={getBlogSections(posts)}
      currentSlug={currentSlug}
      toc={toc}
    >
      {children}
    </BlogDocsLayout>
  );
}
