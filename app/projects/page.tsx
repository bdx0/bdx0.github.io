import Link from "next/link";
import { Box, Divider, Typography } from "@mui/material";

import { getAllContent } from "@/lib/markdown";

type ProjectListItem = {
  slug: string;
  title?: string;
  description?: string;
  status?: string;
  tech?: string | string[];
  tags?: string[];
};

function projectMeta(project: ProjectListItem) {
  if (Array.isArray(project.tech) && project.tech.length > 0) {
    return project.tech.slice(0, 3).join(" · ");
  }

  if (typeof project.tech === "string" && project.tech.trim()) {
    return project.tech;
  }

  if (Array.isArray(project.tags) && project.tags.length > 0) {
    return project.tags.slice(0, 3).join(" · ");
  }

  return project.status ?? "Project";
}

export default function ProjectsPage() {
  const projects = getAllContent("projects") as ProjectListItem[];

  return (
    <Box sx={{ maxWidth: 960 }}>
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 750, mb: 0.5 }}>
          Projects
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Systems, experiments, infrastructure, and selected builds.
        </Typography>
      </Box>

      <Box
        sx={{
          borderTop: 1,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        {projects.map((project, index) => (
          <Box key={project.slug}>
            <Link
              href={`/projects/${project.slug}`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Box
                sx={{
                  minHeight: 68,
                  px: { xs: 0.5, sm: 1 },
                  py: 1.5,
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr auto",
                    sm: "190px minmax(0, 1fr) 160px auto",
                  },
                  gap: { xs: 0.5, sm: 2 },
                  alignItems: "center",
                  transition: "background-color 120ms ease",
                  "&:hover": { bgcolor: "action.hover" },
                  "&:focus-within": { bgcolor: "action.hover" },
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 700 }}>
                  {project.title ?? project.slug}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    gridColumn: { xs: "1 / -1", sm: "auto" },
                    gridRow: { xs: 2, sm: "auto" },
                    minWidth: 0,
                  }}
                >
                  {project.description ?? "Project notes and implementation details."}
                </Typography>

                <Typography
                  variant="caption"
                  color="text.disabled"
                  sx={{
                    display: { xs: "none", sm: "block" },
                    textAlign: "right",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {projectMeta(project)}
                </Typography>

                <Typography
                  aria-hidden="true"
                  variant="body2"
                  color="text.disabled"
                  sx={{ gridColumn: { xs: 2, sm: "auto" }, gridRow: { xs: 1, sm: "auto" } }}
                >
                  →
                </Typography>
              </Box>
            </Link>
            {index < projects.length - 1 && <Divider />}
          </Box>
        ))}
      </Box>

      <Typography variant="caption" color="text.disabled" sx={{ display: "block", mt: 1.5 }}>
        {projects.length} projects
      </Typography>
    </Box>
  );
}
