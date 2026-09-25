import {
  Box,
  Link,
  List,
  ListItem,
  Table,
  TableCell,
  Typography,
} from "@mui/material";
import type { MDXComponents } from "mdx/types";

import { slugifyHeading } from "@/lib/blog";

function headingText(children: unknown): string {
  if (Array.isArray(children)) return children.map(headingText).join("");
  if (children === null || children === undefined) return "";
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  return "";
}

function headingId(children: unknown) {
  return slugifyHeading(headingText(children));
}

export const blogMdxComponents: MDXComponents = {
  h1: ({ children, ...props }) => (
    <Typography
      id={headingId(children)}
      component="h1"
      sx={{
        mt: 5,
        mb: 2,
        fontSize: { xs: 30, md: 36 },
        lineHeight: 1.18,
        fontWeight: 750,
        letterSpacing: "-0.02em",
        scrollMarginTop: 24,
      }}
      {...props}
    >
      {children}
    </Typography>
  ),
  h2: ({ children, ...props }) => (
    <Typography
      id={headingId(children)}
      component="h2"
      sx={{
        mt: 5,
        mb: 1.5,
        pt: 0.5,
        fontSize: {
          xs: "var(--blog-h2-xs-size, 23px)",
          md: "var(--blog-h2-md-size, 26px)",
        },
        lineHeight: 1.3,
        fontWeight: 720,
        letterSpacing: "-0.015em",
        scrollMarginTop: 24,
      }}
      {...props}
    >
      {children}
    </Typography>
  ),
  h3: ({ children, ...props }) => (
    <Typography
      id={headingId(children)}
      component="h3"
      sx={{
        mt: 3.5,
        mb: 1,
        fontSize: {
          xs: "var(--blog-h3-xs-size, 18px)",
          md: "var(--blog-h3-md-size, 20px)",
        },
        lineHeight: 1.4,
        fontWeight: 700,
        scrollMarginTop: 24,
      }}
      {...props}
    >
      {children}
    </Typography>
  ),
  h4: ({ children, ...props }) => (
    <Typography
      component="h4"
      sx={{ mt: 3, mb: 1, fontSize: 17, fontWeight: 700 }}
      {...props}
    >
      {children}
    </Typography>
  ),
  p: ({ children, ...props }) => (
    <Typography
      component="p"
      variant="body1"
      sx={{
        my: "var(--blog-block-spacing, 12px)",
        fontSize: "var(--blog-body-size, 16px)",
        lineHeight: "var(--blog-body-line-height, 1.8)",
        color: "text.primary",
      }}
      {...props}
    >
      {children}
    </Typography>
  ),
  ul: ({ children, ...props }) => (
    <Box
      component="ul"
      sx={{
        my: 1.5,
        pl: 3,
        "& li": { mb: 0.75 },
      }}
      {...props}
    >
      {children}
    </Box>
  ),
  ol: ({ children, ...props }) => (
    <Box
      component="ol"
      sx={{
        my: 1.5,
        pl: 3,
        "& li": { mb: 0.75 },
      }}
      {...props}
    >
      {children}
    </Box>
  ),
  li: ({ children, ...props }) => (
    <ListItem
      component="li"
      disableGutters
      sx={{
        display: "list-item",
        py: 0,
        fontSize: 16,
        lineHeight: 1.75,
      }}
      {...props}
    >
      {children}
    </ListItem>
  ),
  blockquote: ({ children, ...props }) => (
    <Box
      component="blockquote"
      sx={{
        my: 2.5,
        mx: 0,
        pl: 2,
        borderLeft: 3,
        borderColor: "divider",
        color: "text.secondary",
        "& p": { color: "text.secondary" },
      }}
      {...props}
    >
      {children}
    </Box>
  ),
  a: ({ children, href, ...props }) => (
    <Link
      href={href || "#"}
      underline="hover"
      sx={{ fontWeight: 550, textUnderlineOffset: "3px" }}
      {...props}
    >
      {children}
    </Link>
  ),
  code: ({ children, ...props }) => {
    const className =
      "className" in props && typeof props.className === "string"
        ? props.className
        : "";
    const isBlock = className.includes("language-");

    if (isBlock) return <code {...props}>{children}</code>;

    return (
      <Box
        component="code"
        sx={{
          px: 0.55,
          py: 0.2,
          borderRadius: 1,
          border: 1,
          borderColor: "divider",
          bgcolor: "action.hover",
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: "0.88em",
        }}
        {...props}
      >
        {children}
      </Box>
    );
  },
  pre: ({ children, ...props }) => (
    <Box
      component="pre"
      sx={{
        my: 2.5,
        p: 2,
        overflowX: "auto",
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
        bgcolor: "action.hover",
        fontFamily: "var(--font-jetbrains-mono), monospace",
        fontSize: "var(--blog-code-size, 13.5px)",
        lineHeight: 1.7,
      }}
      {...props}
    >
      {children}
    </Box>
  ),
  img: ({ src, alt, ...props }) => (
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{
        display: "block",
        width: "100%",
        height: "auto",
        my: 3,
        borderRadius: 2,
        border: 1,
        borderColor: "divider",
      }}
      {...props}
    />
  ),
  table: ({ children, ...props }) => (
    <Box sx={{ overflowX: "auto", my: 2.5 }}>
      <Table
        size="small"
        sx={{
          minWidth: 560,
          border: 1,
          borderColor: "divider",
          "& th, & td": { fontSize: 14 },
        }}
        {...props}
      >
        {children}
      </Table>
    </Box>
  ),
  th: ({ children, ...props }) => (
    <TableCell
      component="th"
      sx={{
        fontWeight: 700,
        bgcolor: "action.hover",
        borderRight: 1,
        borderColor: "divider",
      }}
      {...props}
    >
      {children}
    </TableCell>
  ),
  td: ({ children, ...props }) => (
    <TableCell
      sx={{ borderRight: 1, borderColor: "divider" }}
      {...props}
    >
      {children}
    </TableCell>
  ),
};
