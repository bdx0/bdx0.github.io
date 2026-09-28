"use client";

import { OpenInNew, Refresh } from "@mui/icons-material";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const APP_URL = "https://tianjia-01.vercel.app/";

export default function TianjiaEmbed() {
  const [frameKey, setFrameKey] = useState(0);
  const [ready, setReady] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    setReady(false);
    setTimedOut(false);
    const timer = window.setTimeout(() => setTimedOut(true), 12000);
    return () => window.clearTimeout(timer);
  }, [frameKey]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: 0,
        maxHeight: "100%",
        overflow: "hidden",
        bgcolor: "#07101b",
      }}
    >
      <Box
        key={frameKey}
        component="iframe"
        src={APP_URL}
        title="TIANJIA-01 — Mecha Research Lab"
        loading="eager"
        allow="clipboard-read; clipboard-write; fullscreen"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        onLoad={() => {
          setReady(true);
          setTimedOut(false);
        }}
        onError={() => setTimedOut(true)}
        sx={{
          position: "absolute",
          inset: 0,
          display: "block",
          width: "100%",
          height: "100%",
          border: 0,
          bgcolor: "#07101b",
          opacity: ready ? 1 : 0,
          transition: "opacity 120ms ease-out",
        }}
      />

      {!ready && (
        <Box
          role={timedOut ? "alert" : "status"}
          aria-live="polite"
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            display: "grid",
            placeItems: "center",
            px: 3,
            bgcolor: "#07101b",
            color: "#eaf4fc",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: 420,
              display: "grid",
              justifyItems: "center",
              textAlign: "center",
              gap: 1.25,
            }}
          >
            {!timedOut ? (
              <>
                <CircularProgress size={30} thickness={4} sx={{ color: "#36d9ef" }} />
                <Typography sx={{ fontSize: 14, fontWeight: 800 }}>
                  Đang mở TIANJIA-01
                </Typography>
                <Typography sx={{ fontSize: 12, color: "#91a8bb" }}>
                  Đang khởi tạo phòng nghiên cứu cơ giáp 3D…
                </Typography>
              </>
            ) : (
              <>
                <Typography sx={{ fontSize: 28, fontWeight: 900, color: "#36d9ef" }}>
                  TJ
                </Typography>
                <Typography sx={{ fontSize: 16, fontWeight: 900 }}>
                  Không tải được mini app
                </Typography>
                <Typography sx={{ fontSize: 12, lineHeight: 1.6, color: "#91a8bb" }}>
                  Thử tải lại hoặc mở TIANJIA-01 trực tiếp trên Vercel.
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 1 }}>
                  <Button
                    variant="contained"
                    startIcon={<Refresh />}
                    onClick={() => {
                      setReady(false);
                      setTimedOut(false);
                      setFrameKey((value) => value + 1);
                    }}
                    sx={{ textTransform: "none" }}
                  >
                    Thử lại
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<OpenInNew />}
                    href={APP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ textTransform: "none", color: "#b8eef5", borderColor: "#407080" }}
                  >
                    Mở trực tiếp
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}
