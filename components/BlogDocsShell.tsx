import SearchRounded from "@mui/icons-material/SearchRounded";
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import type { ReactNode } from "react";

import { getBlogSections, type BlogNavItem, type BlogTocItem } from "@/lib/blog";

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
  const sections = getBlogSections(posts);

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

      {sections.map((section) => (
        <Box key={section.id} sx={{ mt: 2 }}>
          <Typography
            variant="caption"
            color="text.disabled"
            sx={{
              display: "block",
              px: 1.25,
              pb: 0.65,
              fontWeight: 700,
              letterSpacing: "0.055em",
              textTransform: "uppercase",
            }}
          >
            {section.title}
          </Typography>

          <List disablePadding>
            {section.posts.map((post) => {
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
                        py: 0.85,
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
        </Box>
      ))}
    </>
  );

  return (
    <Box>
      <Box
        component="header"
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 5,
          mb: 3,
          py: 1.5,
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: "background.default",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Box>
            <Typography
              variant="caption"
              color="text.disabled"
              sx={{
                display: "block",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              BDX0 / Knowledge
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 750, lineHeight: 1.25 }}>
              Blog
            </Typography>
          </Box>

          <Button
            component={Link}
            href="/writing#blog-search"
            size="small"
            variant="outlined"
            startIcon={<SearchRounded />}
            sx={{ borderRadius: 2, textTransform: "none" }}
          >
            Search
          </Button>
        </Stack>
      </Box>

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
            lg: "230px minmax(0, 1fr)",
            xl: "230px minmax(0, 760px) 210px",
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
            top: 92,
            maxHeight: "calc(100vh - 116px)",
            overflowY: "auto",
            pr: 0.5,
          }}
        >
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
            top: 92,
            maxHeight: "calc(100vh - 116px)",
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
