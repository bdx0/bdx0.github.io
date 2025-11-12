import LinkBehavior from "@/components/LinkBehavior";
import { getAllContent } from "@/lib/markdown";
import { Card, CardContent, Link as MuiLink, Typography } from "@mui/material";

// Fetch all projects for the landing page
export async function generateStaticParams() {
  const projects = getAllContent("projects");
  return projects;
}

const ProjectsPage = async () => {
  const projects = await getAllContent("projects");

  return (
    <div className="container mx-auto py-8">
      <Typography variant="h3" component="h1" gutterBottom>
        Projects
      </Typography>
      <div className="flex flex-col gap-2">
        {projects.map((project: any) => (
          <MuiLink
            key={project.slug}
            component={LinkBehavior}
            href={`/projects/${project.slug}`} // Link to the individual project page
            underline="none"
          >
            <Card
              variant="outlined"
              sx={{ "&:hover": { borderColor: "primary.main" } }}
            >
              <CardContent sx={{ py: 1, px: 2 }}>
                <Typography variant="h6" component="h2" color="primary">
                  {project.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {project.description}
                </Typography>
              </CardContent>
            </Card>
          </MuiLink>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
