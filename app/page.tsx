import type { Metadata } from "next";
import Link from "next/link";
import { Box, Divider, Typography } from "@mui/material";

export const metadata: Metadata = {
  title: "Dương Bảo Duy",
  description:
    "Software engineer focused on performance, AI, distributed systems, and practical software.",
};

const workItems = [
  {
    href: "/projects",
    title: "Projects",
    description: "Systems, experiments, infrastructure, and selected builds.",
  },
  {
    href: "/blog",
    title: "Blog",
    description: "Technical notes, research, and things worth keeping.",
  },
  {
    href: "/apps",
    title: "Apps",
    description: "Small tools, interactive experiments, and working prototypes.",
  },
];

export default function HomePage() {
  return (
    <Box sx={{ maxWidth: 920 }}>
      <Box component="section" aria-labelledby="profile-heading" sx={{ mb: { xs: 4, md: 5 } }}>
        <Typography
          variant="overline"
          color="text.disabled"
          sx={{ letterSpacing: "0.1em" }}
        >
          Profile
        </Typography>

        <Typography
          id="profile-heading"
          component="h1"
          variant="h4"
          sx={{ fontWeight: 750, mt: 0.5, mb: 1.25 }}
        >
          Dương Bảo Duy
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 760, lineHeight: 1.75 }}
        >
          Software engineer focused on performance, AI, distributed systems,
          and practical software across web, mobile, and infrastructure.
        </Typography>

        <Box
          sx={{
            mt: 2.5,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "120px 1fr" },
            columnGap: 2,
            rowGap: 1,
            maxWidth: 760,
          }}
        >
          <Typography variant="body2" color="text.disabled">
            Focus
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Performance · AI/ML · distributed systems · developer tools
          </Typography>

          <Typography variant="body2" color="text.disabled">
            Stack
          </Typography>
          <Typography variant="body2" color="text.secondary">
            TypeScript · Python · Go · Next.js · Flutter · Kubernetes
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: { xs: 3, md: 4 } }} />

      <Box component="section" aria-labelledby="work-heading">
        <Typography
          id="work-heading"
          variant="h6"
          component="h2"
          sx={{ fontWeight: 750, mb: 0.5 }}
        >
          Work
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          What I build, write, and experiment with.
        </Typography>

        <Box
          sx={{
            borderTop: 1,
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          {workItems.map((item, index) => (
            <Box key={item.href}>
              <Link href={item.href} style={{ color: "inherit", textDecoration: "none" }}>
                <Box
                  sx={{
                    minHeight: 64,
                    px: { xs: 0.5, sm: 1 },
                    py: 1.5,
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr auto", sm: "150px 1fr auto" },
                    gap: { xs: 0.5, sm: 2 },
                    alignItems: "center",
                    transition: "background-color 120ms ease",
                    "&:hover": { bgcolor: "action.hover" },
                    "&:focus-within": { bgcolor: "action.hover" },
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>
                    {item.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      gridColumn: { xs: "1 / -1", sm: "auto" },
                      gridRow: { xs: 2, sm: "auto" },
                    }}
                  >
                    {item.description}
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
              {index < workItems.length - 1 && <Divider />}
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        component="section"
        aria-labelledby="resume-heading"
        sx={{
          mt: { xs: 4, md: 5 },
          pt: 2.5,
          borderTop: 1,
          borderColor: "divider",
        }}
      >
        <Link href="/resume" style={{ color: "inherit", textDecoration: "none" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: 2,
              py: 0.75,
              "&:hover .resume-title": { textDecoration: "underline" },
            }}
          >
            <Box>
              <Typography
                id="resume-heading"
                className="resume-title"
                variant="body2"
                sx={{ fontWeight: 700 }}
              >
                Resume
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Experience, education, and detailed technical background.
              </Typography>
            </Box>
            <Typography variant="body2" color="text.disabled">
              →
            </Typography>
          </Box>
        </Link>
      </Box>
    </Box>
  );
}
