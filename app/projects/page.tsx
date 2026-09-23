import Link from "next/link";
import { Box, Chip, Divider, Typography } from "@mui/material";

import { getAllContent } from "@/lib/markdown";

export default function ProjectsPage() {
  const projects = getAllContent("projects");

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>
            Projects
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Things I have built, maintained, or explored.
          </Typography>
        </Box>
        <Chip label={`${projects.length} projects`} size="small" variant="outlined" />
      </Box>

      <Box
        sx={{
          border: 1,
          borderColor: "divider",
          borderRadius: 3,
          overflow: "hidden",
          bgcolor: "background.paper",
        }}
      >
        {projects.map((project: any, index: number) => (
          <Box key={project.slug}>
            <Box
              component={Link}
              href={`/projects/${project.slug}`}
              sx={{
                display: "block",
                px: { xs: 2, sm: 2.5 },
                py: 2,
                color: "inherit",
                textDecoration: "none",
                "&:hover": { bgcolor: "action.hover" },
                "&:focus-visible": {
                  outline: "2px solid",
                  outlineColor: "primary.main",
                  outlineOffset: -2,
                },
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
                {project.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {project.description}
              </Typography>
            </Box>
            {index < projects.length - 1 && <Divider />}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
