import type { Metadata } from "next";
import Link from "next/link";
import {
  Box,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

export const metadata: Metadata = {
  title: "Dương Bảo Duy",
  description:
    "Software engineer focused on performance, AI, distributed systems, and practical software.",
};

const workItems = [
  {
    href: "/projects",
    title: "Projects",
    description: "Selected systems, experiments, apps, and infrastructure work.",
  },
  {
    href: "/writing",
    title: "Blog",
    description: "Technical notes, research, and things worth keeping.",
  },
];

export default function HomePage() {
  return (
    <Box sx={{ maxWidth: 900 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ letterSpacing: "0.12em" }}
        >
          About me
        </Typography>
        <Typography
          component="h1"
          variant="h3"
          sx={{ fontWeight: 750, mt: 0.5, mb: 1.5 }}
        >
          Dương Bảo Duy
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: 760, lineHeight: 1.6, fontWeight: 400 }}
        >
          Software engineer with 9 years of experience optimizing application
          performance and building practical solutions across web, mobile, AI,
          and infrastructure.
        </Typography>

        <Stack direction="row" spacing={1.5} sx={{ mt: 2.5, flexWrap: "wrap", gap: 1.5 }}>
          <Link href="/resume" style={{ color: "inherit", textDecoration: "none" }}>
            <Paper
              variant="outlined"
              sx={{
                px: 2,
                py: 1.25,
                borderRadius: 2,
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                View resume →
              </Typography>
            </Paper>
          </Link>
        </Stack>
      </Box>

      <Divider sx={{ mb: 4 }} />

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1.5 }}>
          My journey
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
          I hold a Bachelor&apos;s degree in Mathematics &amp; Computer Science
          from Ho Chi Minh University of Science. Over the years I&apos;ve worked
          with companies including VNG Corp and Rever Corp, and have also worked
          independently as an AI researcher across several domains.
        </Typography>
      </Box>

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1.5 }}>
          Technical focus
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
          My work spans Python, JavaScript/TypeScript, C/C++, Java, Objective-C,
          Dart, and Go; frontend and mobile work with Next.js and Flutter;
          backend systems with FastAPI, Django, and Gin; and infrastructure with
          Kubernetes. I&apos;m especially interested in AI, machine learning,
          Vietnamese language technology, WebRTC, and systems that make complex
          technology easier to use.
        </Typography>
      </Box>

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1.5 }}>
          What drives me
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
          I value clean, efficient, maintainable software, continuous learning,
          and practical problem solving. Outside day-to-day product work, I spend
          time on personal infrastructure, a Kubernetes homelab, and AI research
          focused on adapting models and tools for Vietnamese users.
        </Typography>
      </Box>

      <Box component="section">
        <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 0.75 }}>
          Work
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Explore what I build and what I write.
        </Typography>

        <Paper
          variant="outlined"
          sx={{ borderRadius: 3, overflow: "hidden", bgcolor: "background.paper" }}
        >
          {workItems.map((item, index) => (
            <Box key={item.href}>
              <Link href={item.href} style={{ color: "inherit", textDecoration: "none" }}>
                <Box
                  sx={{
                    px: { xs: 2, sm: 2.5 },
                    py: 2,
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "180px 1fr auto" },
                    gap: { xs: 0.75, sm: 2 },
                    alignItems: "center",
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                  <Typography variant="body2" color="text.disabled">
                    →
                  </Typography>
                </Box>
              </Link>
              {index < workItems.length - 1 && <Divider />}
            </Box>
          ))}
        </Paper>
      </Box>
    </Box>
  );
}
