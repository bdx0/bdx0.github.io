"use client";

import {
  Box,
  Divider,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import type { ReactNode } from "react";

import type {
  BlogSection,
  BlogTocItem,
} from "@/lib/blog";

type BlogDocsLayoutProps = {
  sections: BlogSection[];
  currentSlug?: string;
  toc?: BlogTocItem[];
  children: ReactNode;
};

export default function BlogDocsLayout({
  sections,
  currentSlug,
  toc = [],
  children,
}: BlogDocsLayoutProps) {
  const theme = useTheme();
  const { blog, surfaces, navigation: navTheme, density, mobile, typography } = theme.site;
  const docsMode = blog.variant === "docs-three-column";
  const mobilePanelSx = {
    mb: 2.5,
    border: surfaces.showBorders ? 1 : 0,
    borderColor: "divider",
    borderRadius: surfaces.radius,
    boxShadow: surfaces.style === "elevated" ? 2 : "none",
    bgcolor: "background.paper",
    "& summary": {
      cursor: "pointer",
      px: density.mobilePanelPaddingX,
      py: density.mobilePanelPaddingY,
      fontSize: navTheme.itemFontSize,
      fontWeight: 700,
    },
  } as const;
  const selectedSx = {
    bgcolor: navTheme.selectedStyle === "filled" ? "action.selected" : "transparent",
    border: navTheme.selectedStyle === "outlined" ? 1 : undefined,
    borderColor: "divider",
  } as const;

  const navigation = (
    <>
      <Link href="/blog" style={{ color: "inherit", textDecoration: "none" }}>
        <Box
          sx={{
            px: 1.25,
            py: 1,
            borderRadius: surfaces.compactRadius,
            ...(currentSlug ? {} : selectedSx),
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
              fontSize: navTheme.sectionFontSize,
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
                    href={`/blog/${post.slug}`}
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
                        borderRadius: surfaces.compactRadius,
                        ...(selected ? selectedSx : {}),
                        "&:hover": { bgcolor: "action.hover" },
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: selected ? 700 : 500,
                          fontSize: navTheme.itemFontSize,
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

  const tocLinks = (
    <>
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
              py: density.tocItemPaddingY,
              pl: item.level === 3 ? 1.5 : 0,
              lineHeight: 1.4,
              "&:hover": { color: "text.primary" },
            }}
          >
            {item.text}
          </Typography>
        </Link>
      ))}
    </>
  );

  return (
    <Box
      sx={{
        "--blog-body-size": `${typography.blogBodySize}px`,
        "--blog-body-line-height": typography.blogBodyLineHeight,
        "--blog-h2-xs-size": `${typography.blogHeading2.xs}px`,
        "--blog-h2-md-size": `${typography.blogHeading2.md}px`,
        "--blog-h3-xs-size": `${typography.blogHeading3.xs}px`,
        "--blog-h3-md-size": `${typography.blogHeading3.md}px`,
        "--blog-code-size": `${typography.blogCodeSize}px`,
        "--blog-block-spacing": `${density.articleBlockSpacing * 8}px`,
      }}
    >
      <Box
        component="details"
        sx={{
          ...mobilePanelSx,
          display: { xs: "block", lg: "none" },
        }}
      >
        <Box component="summary">Browse blog</Box>
        <Divider />
        <Box sx={{ p: 1 }}>{navigation}</Box>
      </Box>

      {toc.length > 0 && (
        mobile.toc === "collapsible" ? (
          <Box
            component="details"
            open={mobile.tocDefaultOpen}
            sx={{ ...mobilePanelSx, display: { xs: "block", lg: "none" } }}
          >
            <Box component="summary">On this page</Box>
            <Divider />
            <Box sx={{ px: density.mobilePanelPaddingX, py: 1 }}>{tocLinks}</Box>
          </Box>
        ) : (
          <Box
            component="section"
            aria-label="On this page"
            sx={{ ...mobilePanelSx, display: { xs: "block", lg: "none" } }}
          >
            <Typography variant="subtitle2" sx={{
              px: density.mobilePanelPaddingX,
              py: density.mobilePanelPaddingY,
              fontWeight: 700,
            }}>
              On this page
            </Typography>
            <Divider />
            <Box sx={{ px: density.mobilePanelPaddingX, py: 1 }}>{tocLinks}</Box>
          </Box>
        )
      )}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "minmax(0, 1fr)",
            lg: docsMode
              ? `${blog.navWidthLg}px minmax(0, 1fr) ${blog.tocWidthLg}px`
              : "minmax(0, 1fr)",
            xl: docsMode
              ? `${blog.navWidthXl}px minmax(0, ${blog.articleMaxWidth}px) ${blog.tocWidthXl}px`
              : `minmax(0, ${blog.articleMaxWidth}px)`,
          },
          gap: { xs: 0, lg: blog.gapLg, xl: blog.gapXl },
          alignItems: "start",
          justifyContent: "center",
        }}
      >
        <Box
          component="aside"
          sx={{
            display: { xs: "none", lg: docsMode ? "block" : "none" },
            position: "sticky",
            top: blog.stickyTop,
            maxHeight: `calc(100vh - ${blog.stickyTop + blog.stickyBottomGap}px)`,
            overflowY: "auto",
            pr: 0.5,
          }}
        >
          {navigation}
        </Box>

        <Box
          component="article"
          sx={{
            minWidth: 0,
            width: "100%",
            maxWidth: blog.articleMaxWidth,
            mx: "auto",
          }}
        >
          {children}
        </Box>

        <Box
          component="aside"
          sx={{
            display: { xs: "none", lg: docsMode && toc.length ? "block" : "none" },
            position: "sticky",
            top: blog.stickyTop,
            maxHeight: `calc(100vh - ${blog.stickyTop + blog.stickyBottomGap}px)`,
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
              "& .MuiTypography-root": {
                fontSize: navTheme.itemFontSize - 1,
                lineHeight: 1.35,
              },
            }}
          >
            {tocLinks}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
