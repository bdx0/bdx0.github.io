import type { Metadata } from "next";
import Link from "next/link";
import { Box, Divider, Typography } from "@mui/material";

export const metadata: Metadata = {
  title: "Apps",
  description: "Small interactive apps and tools in the BDX0 system.",
};

const apps = [
  {
    href: "/apps/knowledge",
    mark: "KN",
    title: "BDX0 Knowledge",
    description:
      "Blog and knowledge workspace synchronized from Notion with search and member access.",
    kind: "Knowledge",
  },
  {
    href: "/apps/dau-thau",
    mark: "ĐT",
    title: "Đấu Thầu 360",
    description:
      "Legal research workspace for procurement law, workflows, screening, and AI assistance.",
    kind: "Legal",
  },
  {
    href: "/apps/yi-jing",
    mark: "☯",
    title: "Kinh Dịch",
    description: "Coin casting, 64 hexagrams, lookup, and transformed hexagrams.",
    kind: "Tool",
  },
  {
    href: "/apps/office",
    mark: "OK",
    title: "Office Kit",
    description: "Small utilities for text, lists, dates, percentages, encoding, and JSON.",
    kind: "Utility",
  },
  {
    href: "/apps/buddha",
    mark: "佛",
    title: "Phật Thích Ca 3D",
    description: "Interactive 3D Buddha scene with a halo and immersive presentation.",
    kind: "3D",
  },
  {
    href: "/apps/ly-dragon",
    mark: "龍",
    title: "Rồng thời Lý 3D",
    description: "Interactive 3D study inspired by Vietnamese Lý dynasty dragon forms.",
    kind: "3D",
  },
] as const;

export default function AppsPage() {
  return (
    <Box sx={{ maxWidth: 960 }}>
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 750, mb: 0.5 }}>
          Apps
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Small tools, interactive experiments, and working prototypes.
        </Typography>
      </Box>

      <Box
        sx={{
          borderTop: 1,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        {apps.map((app, index) => (
          <Box key={app.href}>
            <Link href={app.href} style={{ color: "inherit", textDecoration: "none" }}>
              <Box
                sx={{
                  minHeight: 72,
                  px: { xs: 0.5, sm: 1 },
                  py: 1.5,
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "40px minmax(0, 1fr) auto",
                    sm: "48px 190px minmax(0, 1fr) 100px auto",
                  },
                  gap: { xs: 1, sm: 2 },
                  alignItems: "center",
                  transition: "background-color 120ms ease",
                  "&:hover": { bgcolor: "action.hover" },
                  "&:focus-within": { bgcolor: "action.hover" },
                }}
              >
                <Box
                  aria-hidden="true"
                  sx={{
                    width: 36,
                    height: 36,
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 1.5,
                    bgcolor: "action.hover",
                    display: "grid",
                    placeItems: "center",
                    fontSize: 13,
                    fontWeight: 800,
                  }}
                >
                  {app.mark}
                </Box>

                <Typography variant="body1" sx={{ fontWeight: 700, minWidth: 0 }}>
                  {app.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    gridColumn: { xs: "2 / -1", sm: "auto" },
                    gridRow: { xs: 2, sm: "auto" },
                    minWidth: 0,
                  }}
                >
                  {app.description}
                </Typography>

                <Typography
                  variant="caption"
                  color="text.disabled"
                  sx={{ display: { xs: "none", sm: "block" }, textAlign: "right" }}
                >
                  {app.kind}
                </Typography>

                <Typography
                  aria-hidden="true"
                  variant="body2"
                  color="text.disabled"
                  sx={{ gridColumn: { xs: 3, sm: "auto" }, gridRow: { xs: 1, sm: "auto" } }}
                >
                  →
                </Typography>
              </Box>
            </Link>
            {index < apps.length - 1 && <Divider />}
          </Box>
        ))}
      </Box>

      <Typography variant="caption" color="text.disabled" sx={{ display: "block", mt: 1.5 }}>
        {apps.length} apps
      </Typography>
    </Box>
  );
}
