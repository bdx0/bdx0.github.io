import type { MDXComponents } from "mdx/types";

import { Typography, Link, List, ListItem, ListItemText, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

// Define custom MDX components following Material Design 3 style guide
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Date: ({ publish_date, ...props }) => {
      const formattedDate = new Date(publish_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      return <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>{formattedDate}</Typography>;
    },
    h1: ({ children, ...props }) => (
      <Typography variant="h3" component="h1" gutterBottom {...props}>
        {children}
      </Typography>
    ),
    h2: ({ children, ...props }) => (
      <Typography variant="h4" component="h2" gutterBottom {...props}>
        {children}
      </Typography>
    ),
    h3: ({ children, ...props }) => (
      <Typography variant="h5" component="h3" gutterBottom {...props}>
        {children}
      </Typography>
    ),
    h4: ({ children, ...props }) => (
      <Typography variant="h6" component="h4" gutterBottom {...props}>
        {children}
      </Typography>
    ),
    p: ({ children, ...props }) => (
      <Typography variant="body1" paragraph {...props}>
        {children}
      </Typography>
    ),
    ul: ({ children, ...props }) => (
      <List sx={{ listStyleType: 'disc', pl: 2 }} {...props}>
        {children}
      </List>
    ),
    ol: ({ children, ...props }) => (
      <List sx={{ listStyleType: 'decimal', pl: 2 }} {...props}>
        {children}
      </List>
    ),
    li: ({ children, ...props }) => (
      <ListItem disablePadding sx={{ display: 'list-item' }} {...props}>
        <ListItemText primary={children} />
      </ListItem>
    ),
    blockquote: ({ children, ...props }) => (
      <Typography component="blockquote" sx={{ borderLeft: '4px solid', borderColor: 'primary.main', pl: 2, fontStyle: 'italic', my: 2 }} {...props}>
        {children}
      </Typography>
    ),
    code: ({ children, ...props }) => {
      const isInline =
        !("className" in props) ||
        !props.className?.toString().includes("language-");

      if (isInline) {
        return (
          <Typography component="span" sx={{ fontFamily: 'monospace', bgcolor: 'grey.200', p: 0.5, borderRadius: 1 }} {...props}>
            {children}
          </Typography>
        );
      } else {
        return <code {...props}>{children}</code>;
      }
    },
    pre: ({ children, ...props }) => {
      return (
        <Typography component="pre" sx={{ fontFamily: 'monospace', bgcolor: 'grey.900', color: 'common.white', p: 2, borderRadius: 1, overflowX: 'auto', my: 2 }} {...props}>
          {children}
        </Typography>
      );
    },
    img: ({ src, alt, ...props }) => (
      // Using a simple img tag for now, consider Next.js Image component with MUI styling later
      <img src={src} alt={alt} style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '16px 0' }} {...props} />
    ),
    a: ({ children, href, ...props }) => (
      <Link href={href || '#'} {...props}>
        {children}
      </Link>
    ),
    em: ({ children, ...props }) => (
      <Typography component="em" fontStyle="italic" {...props}>
        {children}
      </Typography>
    ),
    strong: ({ children, ...props }) => (
      <Typography component="strong" fontWeight="bold" {...props}>
        {children}
      </Typography>
    ),
    table: ({ children, ...props }) => (
      <Table sx={{ my: 2, border: '1px solid', borderColor: 'divider' }} {...props}>
        {children}
      </Table>
    ),
    th: ({ children, ...props }) => (
      <TableCell component="th" sx={{ fontWeight: 'bold', bgcolor: 'action.hover', border: '1px solid', borderColor: 'divider' }} {...props}>
        {children}
      </TableCell>
    ),
    td: ({ children, ...props }) => (
      <TableCell sx={{ border: '1px solid', borderColor: 'divider' }} {...props}>
        {children}
      </TableCell>
    ),
  };
}

// Helper component to make React available for the type checking above
import React from "react";
