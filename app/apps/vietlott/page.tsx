import type { Metadata } from "next";
import { Box } from "@mui/material";

export const metadata: Metadata = {
  title: "Vietlott",
  description: "Kết quả và thống kê xổ số Vietlott Mega 6/45 và Power 6/55.",
};

export default function VietlottAppPage() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        minHeight: 0,
        maxHeight: "100%",
        overflow: "hidden",
        bgcolor: "#eef6ff",
      }}
    >
      <Box
        component="iframe"
        src="https://vietlott-phi.vercel.app/"
        loading="eager"
        title="Vietlott Mega 6/45 và Power 6/55"
        sx={{
          display: "block",
          width: "100%",
          height: "100%",
          minHeight: 0,
          border: 0,
          bgcolor: "#eef6ff",
        }}
      />
    </Box>
  );
}
