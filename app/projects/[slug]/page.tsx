import { getContentBySlug, getAllContent } from "@/lib/markdown";
import { useMDXComponents } from "@/mdx-components";
import { MDXRemote } from "next-mdx-remote/rsc";

// Function to generate static paths for individual projects
export async function generateStaticParams() {
  const projects = getAllContent("projects"); // Assuming 'projects' directory in content/
  return projects.map((project: any) => ({
    slug: project.slug,
  }));
}

// Get the components from mdx-components.tsx
const components = useMDXComponents({});

import { Container, Box } from '@mui/material';

// Page component for rendering a single project
const ProjectPage = async ({ params }: { params: { slug: string } }) => {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const project = await getContentBySlug("projects", slug); // Fetch project content

  if (!project) {
    return <div>Project not found</div>;
  }

  // Prepare scope for MDXRemote, similar to blog posts
  const scope = {
    frontmatter: project?.frontmatter,
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box>
        <MDXRemote
          source={project?.content}
          components={components}
          options={{ scope: scope }}
        />
      </Box>
    </Container>
  );
};

export default ProjectPage;
