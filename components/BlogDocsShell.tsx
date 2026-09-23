import {
  Box,
  Divider,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import Link from "next/link";
import type { ReactNode } from "react";

import type { BlogNavItem, BlogTocItem } from "@/lib/blog";

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
  const navigation = (
    <>
      <Link href="/writing" style={{ color: "inherit", textDecoration: "none" }}>
        <Box
          sx={{
            px: 1.25,
            py: 1,
            borderRadius: 1.5,
            bgcolor: currentSlug ? "transparent" : "action.selected",
            "&:hover": { bgcolor: "action.hover" },
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            Overview
          </Typography>
        </Box>
      </Link>

      <Typography
        variant="caption"
        color="text.disabled"
        sx={{
          display: "block",
          px: 1.25,
          pt: 2.25,
          pb: 0.75,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Articles
      </Typography>

      <List disablePadding>
        {posts.map((post) => {
          const selected = post.slug === currentSlug;

          return (
            <ListItem key={post.slug} disablePadding sx={{ mb: 0.25 }}>
              <Link
                href={`/writing/${post.slug}`}
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    px: 1.25,
                    py: 0.9,
                    borderRadius: 1.5,
                    bgcolor: selected ? "action.selected" : "transparent",
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: selected ? 700 : 500,
                      lineHeight: 1.35,
                    }}
                  >
                    {post.title}
                  </Typography>
                </Box>
              </Link>
            </ListItem>
          );
        })}
      </List>
    </>
  );

  return (
    <Box>
      <Box
        component="details"
        sx={{
          display: { xs: "block", lg: "none" },
          mb: 2.5,
          border: 1,
          borderColor: "divider",
          borderRadius: 2,
          bgcolor: "background.paper",
          "& summary": {
            cursor: "pointer",
            px: 1.75,
            py: 1.25,
            fontSize: 14,
            fontWeight: 700,
          },
        }}
      >
        <Box component="summary">Browse blog</Box>
        <Divider />
        <Box sx={{ p: 1 }}>{navigation}</Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "minmax(0, 1fr)",
            lg: "220px minmax(0, 1fr)",
            xl: "220px minmax(0, 760px) 210px",
          },
          gap: { xs: 0, lg: 4, xl: 5 },
          alignItems: "start",
          justifyContent: "center",
        }}
      >
        <Box
          component="aside"
          sx={{
            display: { xs: "none", lg: "block" },
            position: "sticky",
            top: 24,
            maxHeight: "calc(100vh - 48px)",
            overflowY: "auto",
            pr: 0.5,
          }}
        >
          <Typography
            variant="caption"
            color="text.disabled"
            sx={{
              display: "block",
              px: 1.25,
              pb: 1,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Blog
          </Typography>
          {navigation}
        </Box>

        <Box component="article" sx={{ minWidth: 0 }}>
          {children}
        </Box>

        <Box
          component="aside"
          sx={{
            display: { xs: "none", xl: toc.length ? "block" : "none" },
            position: "sticky",
            top: 24,
            maxHeight: "calc(100vh - 48px)",
            overflowY: "auto",
          }}
        >
          <Typography
            variant="caption"
            color="text.disabled"
            sx={{
              display: "block",
              mb: 1,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            On this page
          </Typography>

          <Box
            sx={{
              borderLeft: 1,
              borderColor: "divider",
              pl: 1.5,
            }}
          >
            {toc.map((item) => (
              <Link
                key={item.id}
                href={`#${item.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: "block",
                    py: 0.55,
                    pl: item.level === 3 ? 1.5 : 0,
                    fontSize: 13,
                    lineHeight: 1.35,
                    "&:hover": { color: "text.primary" },
                  }}
                >
                  {item.text}
                </Typography>
              </Link>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
