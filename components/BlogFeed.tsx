"use client";

import CloseRounded from "@mui/icons-material/CloseRounded";
import SearchRounded from "@mui/icons-material/SearchRounded";
import {
  Box,
  Chip,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useMemo, useState } from "react";

export type BlogFeedPost = {
  slug: string;
  title: string;
  description: string;
  publishDate: string;
  tags: string[];
};

function formatDate(value: string) {
  const match = value.match(/^(\\d{4})-(\\d{2})-(\\d{2})$/);
  if (!match) return value;

  const [, year, month, day] = match;
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export default function BlogFeed({ posts }: { posts: BlogFeedPost[] }) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const tags = useMemo(
    () => Array.from(new Set(posts.flatMap((post) => post.tags))).sort(),
    [posts],
  );

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesTag = !activeTag || post.tags.includes(activeTag);
      if (!matchesTag) return false;
      if (!normalizedQuery) return true;

      return [post.title, post.description, ...post.tags]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);
    });
  }, [activeTag, posts, query]);

  const hasFilter = Boolean(query || activeTag);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
          gap: 2,
          mb: 2.5,
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
        <Chip
          label={`${filteredPosts.length}/${posts.length}`}
          size="small"
          variant="outlined"
        />
      </Box>

      <TextField
        fullWidth
        size="small"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search notes…"
        aria-label="Search blog posts"
        sx={{ mb: 1.5 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchRounded fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: query ? (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  size="small"
                  aria-label="Clear search"
                  onClick={() => setQuery("")}
                >
                  <CloseRounded fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : null,
          },
        }}
      />

      {tags.length > 0 && (
        <Stack
          direction="row"
          spacing={0.75}
          sx={{
            mb: 2,
            overflowX: "auto",
            pb: 0.5,
            scrollbarWidth: "thin",
          }}
        >
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              variant={activeTag === tag ? "filled" : "outlined"}
              onClick={() => setActiveTag((current) => (current === tag ? null : tag))}
              sx={{ flexShrink: 0 }}
            />
          ))}
          {hasFilter && (
            <Chip
              label="Clear"
              size="small"
              onClick={() => {
                setQuery("");
                setActiveTag(null);
              }}
              sx={{ flexShrink: 0 }}
            />
          )}
        </Stack>
      )}

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
          filteredPosts.map((post, index) => (
            <Box key={post.slug}>
              <Link
                href={`/${post.slug}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      md: "minmax(0, 1fr) 140px",
                    },
                    gap: { xs: 1, md: 3 },
                    px: { xs: 2, sm: 2.5 },
                    py: 2,
                    transition: "background-color 120ms ease",
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 700, mb: 0.5 }}
                    >
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

                    {post.tags.length > 0 && (
                      <Stack
                        direction="row"
                        spacing={0.75}
                        sx={{ mt: 1.25, flexWrap: "wrap", gap: 0.75 }}
                      >
                        {post.tags.map((tag) => (
                          <Typography
                            key={tag}
                            variant="caption"
                            color="text.disabled"
                          >
                            #{tag}
                          </Typography>
                        ))}
                      </Stack>
                    )}
                  </Box>

                  <Typography
                    variant="caption"
                    color="text.disabled"
                    sx={{ pt: 0.25, whiteSpace: "nowrap" }}
                  >
                    {formatDate(post.publishDate)}
                  </Typography>
                </Box>
              </Link>
              {index < filteredPosts.length - 1 && <Divider />}
            </Box>
          ))
        ) : (
          <Box sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              No notes match this filter.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
