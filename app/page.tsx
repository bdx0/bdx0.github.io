import Link from "next/link";
import {
  Box,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import { getAllContent } from "@/lib/markdown";

export default function HomePage() {
  const posts = getAllContent("blog");

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>
            Blog
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Notes, research, and things worth keeping.
          </Typography>
        </Box>
        <Chip label={`${posts.length} posts`} size="small" variant="outlined" />
      </Box>

      <Box
        sx={{
          border: 1,
          borderColor: "divider",
          borderRadius: 3,
          overflow: "hidden",
          bgcolor: "background.paper",
        }}
      >
        {posts.map((post: any, index: number) => (
          <Box key={post.slug}>
            <Link href={`/${post.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) 140px" },
                  gap: { xs: 1, md: 3 },
                  px: { xs: 2, sm: 2.5 },
                  py: 2,
                  transition: "background-color 120ms ease",
                  "&:hover": { bgcolor: "action.hover" },
                  "&:focus-within": {
                    outline: "2px solid",
                    outlineColor: "primary.main",
                    outlineOffset: -2,
                  },
                }}
              >
                <Box sx={{ minWidth: 0 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {post.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {post.description}
                  </Typography>

                  {Array.isArray(post.tags) && post.tags.length > 0 && (
                    <Stack
                      direction="row"
                      spacing={0.75}
                      sx={{ mt: 1.25, flexWrap: "wrap", gap: 0.75 }}
                    >
                      {post.tags.map((tag: string) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          variant="outlined"
                          sx={{ height: 22, fontSize: 11 }}
                        />
                      ))}
                    </Stack>
                  )}
                </Box>

                <Typography
                  variant="caption"
                  color="text.disabled"
                  sx={{ pt: 0.25, whiteSpace: "nowrap" }}
                >
                  {new Date(post.publish_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </Typography>
              </Box>
            </Link>
            {index < posts.length - 1 && <Divider />}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
