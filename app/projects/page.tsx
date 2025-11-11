import { Typography, Card, CardContent, Link as MuiLink } from '@mui/material';
import NextLink from "next/link";
import LinkBehavior from "@/components/LinkBehavior";
import { getAllContent } from "@/lib/markdown";

// Fetch all projects for the landing page
export async function generateStaticParams() {
  const projects = getAllContent("projects");
  return projects;
}

const ProjectsPage = async () => {
  const projects = await getAllContent("projects");

  return (
    <div className="container mx-auto py-8">
      <Typography variant="h3" component="h1" gutterBottom>Projects</Typography>
      <div className="flex flex-col gap-4">
        {projects.map((project: any) => (
          <MuiLink
            key={project.slug}
            component={LinkBehavior}
            href={`/projects/${project.slug}`} // Link to the individual project page
            underline="none"
          >
            <Card sx={{ '&:hover': { boxShadow: 6 } }}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom color="primary">
                  {project.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">{project.description}</Typography>
              </CardContent>
            </Card>
          </MuiLink>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
