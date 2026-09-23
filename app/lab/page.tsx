import Link from "next/link";
import { Box, Divider, Paper, Typography } from "@mui/material";

const experiments = [
  {
    href: "/lab/ly-dragon/",
    title: "Ly Dynasty Dragon",
    description: "Interactive 3D study inspired by Ly dynasty dragon forms.",
  },
  {
    href: "/lab/buddha/",
    title: "Shakyamuni Buddha",
    description: "Interactive 3D Buddha mesh rendered with Three.js and WebGL.",
  },
];

export default function LabPage() {
  return (
    <Box sx={{ maxWidth: 900 }}>
      <Typography variant="h5" component="h1" sx={{ fontWeight: 700, mb: 0.75 }}>
        Lab
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Visual experiments, interactive prototypes, and things worth exploring.
      </Typography>

      <Paper variant="outlined" sx={{ borderRadius: 3, overflow: "hidden" }}>
        {experiments.map((item, index) => (
          <Box key={item.href}>
            <Link
              href={item.href}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Box
                sx={{
                  px: { xs: 2, sm: 2.5 },
                  py: 2,
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "220px 1fr auto" },
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
            {index < experiments.length - 1 && <Divider />}
          </Box>
        ))}
      </Paper>
    </Box>
  );
}
