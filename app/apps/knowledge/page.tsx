import type { Metadata } from "next";
import { Box } from "@mui/material";

export const metadata: Metadata = {
  title: "BDX0 Knowledge",
  description: "Blog và knowledge workspace được quản lý bằng Notion.",
};

export default function KnowledgeAppPage() {
  return (
    <Box sx={{ width: "100%", height: "100%", bgcolor: "#f4f5f7" }}>
      <Box component="iframe" src="https://notion-cms-mauve.vercel.app/" title="BDX0 Knowledge" allow="clipboard-read; clipboard-write" sx={{ display:"block",width:"100%",height:"100%",border:0,bgcolor:"#f4f5f7" }} />
    </Box>
  );
}
