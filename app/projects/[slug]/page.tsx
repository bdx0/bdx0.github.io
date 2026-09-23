import { Box, Paper } from "@mui/material";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

import { getAllContent, getContentBySlug } from "@/lib/markdown";
import { useMDXComponents } from "@/mdx-components";

export function generateStaticParams() {
  return getAllContent("projects").map((project: any) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getContentBySlug("projects", slug);

  if (!project) notFound();

  const components = useMDXComponents({});

  return (
    <Box sx={{ maxWidth: 860, mx: "auto" }}>
      <Paper
        variant="outlined"
        sx={{
          p: { xs: 2.25, sm: 3.5, md: 4.5 },
          borderRadius: 3,
          bgcolor: "background.paper",
        }}
      >
        <MDXRemote
          source={project.content}
          components={components}
          options={{ scope: { frontmatter: project.frontmatter } }}
        />
      </Paper>
    </Box>
  );
}
