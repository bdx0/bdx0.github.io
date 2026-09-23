import { Box, Chip, Stack, Typography } from "@mui/material";

import BlogDocsShell from "@/components/BlogDocsShell";
import BlogFeed from "@/components/BlogFeed";
import { getSortedBlogPosts } from "@/lib/blog";

export default function WritingHomePage() {
  const posts = getSortedBlogPosts();

  return (
    <BlogDocsShell posts={posts}>
      <Box sx={{ maxWidth: 760, mx: "auto" }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={1.5}
          sx={{ mb: 2.5 }}
        >
          <Box>
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: 34, md: 42 },
                lineHeight: 1.14,
                fontWeight: 760,
                letterSpacing: "-0.025em",
                mb: 1,
              }}
            >
              Blog
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ lineHeight: 1.7, maxWidth: 620 }}
            >
              Technical notes, research, and practical explanations collected in
              one place.
            </Typography>
          </Box>

          <Chip
            label={`${posts.length} articles`}
            size="small"
            variant="outlined"
          />
        </Stack>

        <BlogFeed posts={posts} embedded />
      </Box>
    </BlogDocsShell>
  );
}
