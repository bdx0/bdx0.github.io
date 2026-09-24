import type { Metadata } from "next";
import { Box } from "@mui/material";

export const metadata: Metadata = {
  title: "Đấu Thầu 360",
  description: "Workspace tra cứu pháp luật và xử lý nghiệp vụ đấu thầu Việt Nam.",
};

export default function DauThauAppPage() {
  return (
    <Box sx={{ width: "100%", height: "100%", bgcolor: "#f5f7fb" }}>
      <Box
        component="iframe"
        src="https://dau-thau-law-portal.vercel.app/"
        title="Đấu Thầu 360"
        allow="clipboard-read; clipboard-write"
        sx={{
          display: "block",
          width: "100%",
          height: "100%",
          border: 0,
          bgcolor: "#f5f7fb",
        }}
      />
    </Box>
  );
}
