import {
  Box,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import type { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

import BlogDocsShell from "@/components/BlogDocsShell";
import { blogMdxComponents } from "@/components/BlogMdx";
import DateComponent from "@/components/Date";
import {
  extractBlogToc,
  getSortedBlogPosts,
  stripMatchingH1,
} from "@/lib/blog";
import { getContentBySlug } from "@/lib/markdown";

export function generateStaticParams() {
  return getSortedBlogPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getContentBySlug("blog", slug);

  if (!post) return {};

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
  };
}

export default async function WritingPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getContentBySlug("blog", slug);

  if (!post) notFound();

  const posts = getSortedBlogPosts();
  const currentIndex = posts.findIndex((item) => item.slug === slug);
  const previousPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost =
    currentIndex >= 0 && currentIndex < posts.length - 1
      ? posts[currentIndex + 1]
      : null;

  const title = String(post.frontmatter.title ?? slug);
  const description = String(post.frontmatter.description ?? "");
  const body = stripMatchingH1(post.content, title);
  const toc = extractBlogToc(body);
  const tags = Array.isArray(post.frontmatter.tags)
    ? post.frontmatter.tags.map(String)
    : [];

  return (
    <BlogDocsShell posts={posts} currentSlug={slug} toc={toc}>
      <Box sx={{ maxWidth: 760, mx: "auto" }}>
        <Stack
          direction="row"
          spacing={0.75}
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Link href="/writing" style={{ color: "inherit", textDecoration: "none" }}>
            <Typography variant="caption" color="text.secondary">
              Blog
            </Typography>
          </Link>
          <Typography variant="caption" color="text.disabled">
            /
          </Typography>
          <Typography
            variant="caption"
            color="text.disabled"
            sx={{
              maxWidth: 360,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </Typography>
        </Stack>

        <Typography
          component="h1"
          sx={{
            mb: 1.5,
            fontSize: { xs: 34, md: 42 },
            lineHeight: 1.14,
            fontWeight: 760,
            letterSpacing: "-0.025em",
          }}
        >
          {title}
        </Typography>

        {description && (
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ mb: 2.25, lineHeight: 1.6, fontWeight: 400 }}
          >
            {description}
          </Typography>
        )}

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.25}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          sx={{ mb: 3 }}
        >
          <Typography variant="body2" color="text.secondary">
            <DateComponent date={post.frontmatter.publish_date} />
          </Typography>

          {tags.length > 0 && (
            <Stack
              direction="row"
              spacing={0.75}
              sx={{ flexWrap: "wrap", gap: 0.75 }}
            >
              {tags.map((tag: string) => (
                <Link
                  key={tag}
                  href={`/tags/${encodeURIComponent(tag)}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <Chip label={tag} size="small" variant="outlined" clickable />
                </Link>
              ))}
            </Stack>
          )}
        </Stack>

        <Divider sx={{ mb: 3.5 }} />

        <Box
          sx={{
            "& > :first-of-type": { mt: 0 },
            "& hr": { my: 4, borderColor: "divider" },
          }}
        >
          <MDXRemote source={body} components={blogMdxComponents} />
        </Box>

        <Divider sx={{ mt: 5, mb: 2 }} />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: previousPost && nextPost ? "1fr 1fr" : "1fr",
            },
            gap: 1.5,
          }}
        >
          {previousPost && (
            <Link
              href={`/writing/${previousPost.slug}`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  height: "100%",
                  borderRadius: 2,
                  "&:hover": { bgcolor: "action.hover" },
                }}
              >
                <Typography
                  variant="caption"
                  color="text.disabled"
                  sx={{ display: "block", mb: 0.5 }}
                >
                  Previous
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  ← {previousPost.title}
                </Typography>
              </Paper>
            </Link>
          )}

          {nextPost && (
            <Link
              href={`/writing/${nextPost.slug}`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  height: "100%",
                  borderRadius: 2,
                  textAlign: previousPost ? "right" : "left",
                  "&:hover": { bgcolor: "action.hover" },
                }}
              >
                <Typography
                  variant="caption"
                  color="text.disabled"
                  sx={{ display: "block", mb: 0.5 }}
                >
                  Next
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {nextPost.title} →
                </Typography>
              </Paper>
            </Link>
          )}
        </Box>
      </Box>
    </BlogDocsShell>
  );
}
