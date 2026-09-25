import type { Metadata } from "next";
import { Box } from "@mui/material";

export const metadata: Metadata = {
  title: "Phật Thích Ca 3D",
};

export default function AppPage() {
  return (
    <Box sx={{ width: "100%", height: "100%", minHeight: 0, maxHeight: "100%", overflow: "hidden", bgcolor: "#15130f" }}>
      <Box
        component="iframe"
        src="/embedded/buddha/?v=20260925-4"
        title="Phật Thích Ca 3D"
        sx={{
          display: "block",
          width: "100%",
          height: "100%",
          minHeight: 0,
          border: 0,
          bgcolor: "#15130f",
        }}
      />
    </Box>
  );
}