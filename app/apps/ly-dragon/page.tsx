import type { Metadata } from "next";
import { Box } from "@mui/material";

export const metadata: Metadata = {
  title: "Rồng thời Lý 3D",
};

export default function AppPage() {
  return (
    <Box sx={{ width: "100%", height: "100%", minHeight: 0, maxHeight: "100%", overflow: "hidden", bgcolor: "#050b0c" }}>
      <Box
        component="iframe"
        src="/embedded/ly-dragon/"
        title="Rồng thời Lý 3D"
        sx={{
          display: "block",
          width: "100%",
          height: "100%",
          minHeight: 0,
          border: 0,
          bgcolor: "#050b0c",
        }}
      />
    </Box>
  );
}
