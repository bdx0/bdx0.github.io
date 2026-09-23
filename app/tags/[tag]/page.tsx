import Link from "next/link";
import {
  Box,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import { getAllContent } from "@/lib/markdown";

export function generateStaticParams() {
  const posts = getAllContent("blog");
  const tags = new Set<string>();

  posts.forEach((post: any) => {
    if (Array.isArray(post.tags)) {
      post.tags.forEach((tag: string) => tags.add(tag));
    }
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
  const allPosts = getAllContent("blog");
  const filteredPosts = allPosts.filter((post: any) => {
    if (!Array.isArray(post.tags)) return false;
    return post.tags.some(
      (postTag: string) => postTag.toLowerCase() === decodedTag.toLowerCase(),
    );
  });

  return (
    <Box>
      <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>
          Tag
        </Typography>
        <Chip label={decodedTag} size="small" />
      </Stack>

      <Box
        sx={{
          border: 1,
          borderColor: "divider",
          borderRadius: 3,
          overflow: "hidden",
          bgcolor: "background.paper",
        }}
      >
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post: any, index: number) => (
            <Box key={post.slug}>
              <Link href={`/blog/${post.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr auto" },
                    gap: 1.5,
                    px: 2.5,
                    py: 2,
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 650 }}>
                    {post.title}
                  </Typography>
                  <Typography variant="caption" color="text.disabled">
                    {post.publish_date}
                  </Typography>
                </Box>
              </Link>
              {index < filteredPosts.length - 1 && <Divider />}
            </Box>
          ))
        ) : (
          <Typography color="text.secondary" sx={{ p: 2.5 }}>
            No posts found for this tag.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
