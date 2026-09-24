import Link from "next/link";
import {
  Box,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import BlogDocsShell from "@/components/BlogDocsShell";
import { getSortedBlogPosts } from "@/lib/blog";

export function generateStaticParams() {
  const posts = getSortedBlogPosts();
  const tags = new Set<string>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags).map((tag) => ({ tag }));
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getSortedBlogPosts();
  const filteredPosts = posts.filter((post) =>
    post.tags.some(
      (postTag) => postTag.toLowerCase() === decodedTag.toLowerCase(),
    ),
  );

  return (
    <BlogDocsShell posts={posts}>
      <Box sx={{ width: "100%", mx: "auto" }}>
        <Stack
          direction="row"
          spacing={1.25}
          alignItems="center"
          sx={{ mb: 3 }}
        >
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: 30, md: 36 },
              fontWeight: 750,
              letterSpacing: "-0.02em",
            }}
          >
            Tag
          </Typography>
          <Chip label={decodedTag} size="small" />
        </Stack>

        <Box
          sx={{
            borderTop: 1,
            borderColor: "divider",
          }}
        >
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <Box key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", sm: "1fr auto" },
                      gap: 1.5,
                      py: 2,
                      "&:hover": { bgcolor: "action.hover" },
                    }}
                  >
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 700, mb: 0.4 }}
                      >
                        {post.title}
                      </Typography>
                      {post.description && (
                        <Typography variant="body2" color="text.secondary">
                          {post.description}
                        </Typography>
                      )}
                    </Box>
                    <Typography variant="caption" color="text.disabled">
                      {post.publishDate}
                    </Typography>
                  </Box>
                </Link>
                {index < filteredPosts.length - 1 && <Divider />}
              </Box>
            ))
          ) : (
            <Typography color="text.secondary" sx={{ py: 3 }}>
              No posts found for this tag.
            </Typography>
          )}
        </Box>
      </Box>
    </BlogDocsShell>
  );
}
