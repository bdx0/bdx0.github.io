import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

import DateComponent from "@/components/Date";
import { getAllContent, getContentBySlug } from "@/lib/markdown";
import { useMDXComponents } from "@/mdx-components";

export function generateStaticParams() {
  return getAllContent("blog").map((post: any) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getContentBySlug("blog", slug);

  if (!post) notFound();

  const components = useMDXComponents({});

  return (
    <Box sx={{ maxWidth: 860, mx: "auto" }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={1.5}
        sx={{ mb: 2 }}
      >
        <Typography variant="body2" color="text.secondary">
          <DateComponent date={post.frontmatter.publish_date} />
        </Typography>

        {Array.isArray(post.frontmatter.tags) && post.frontmatter.tags.length > 0 && (
          <Stack direction="row" spacing={0.75} sx={{ flexWrap: "wrap", gap: 0.75 }}>
            {post.frontmatter.tags.map((tag: string) => (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag)}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <Chip label={tag} size="small" clickable variant="outlined" />
              </Link>
            ))}
          </Stack>
        )}
      </Stack>

      <Paper
        variant="outlined"
        sx={{
          p: { xs: 2.25, sm: 3.5, md: 4.5 },
          borderRadius: 3,
          bgcolor: "background.paper",
        }}
      >
        <MDXRemote
          source={post.content}
          components={components}
          options={{ scope: { frontmatter: post.frontmatter } }}
        />
      </Paper>
    </Box>
  );
}
