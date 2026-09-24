import type { Metadata } from "next";
import { Box } from "@mui/material";

export const metadata: Metadata = {
  title: "Kinh Dịch",
  description: "Kinh Dịch mở bên trong BDX0 Apps.",
};

export default function YiJingAppPage() {
  return (
    <Box sx={{ width: "100%", height: "100%", bgcolor: "#f5efe5" }}>
      <Box
        component="iframe"
        src="https://yi-jing-khaki.vercel.app/embed"
        title="Kinh Dịch"
        allow="clipboard-read; clipboard-write"
        sx={{
          display: "block",
          width: "100%",
          height: "100%",
          border: 0,
          bgcolor: "#f5efe5",
        }}
      />
    </Box>
  );
}
