"use client";

import { OpenInNew, Refresh } from "@mui/icons-material";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const APP_ORIGIN = "https://dau-thau-law-portal.vercel.app";
const APP_URL = APP_ORIGIN + "/";

export default function DauThauEmbed() {
  const [frameKey, setFrameKey] = useState(0);
  const [ready, setReady] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    setReady(false);
    setTimedOut(false);

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== APP_ORIGIN) return;
      if (
        typeof event.data === "object" &&
        event.data !== null &&
        event.data.type === "dau-thau-360:ready"
      ) {
        setReady(true);
        setTimedOut(false);
      }
    };

    window.addEventListener("message", onMessage);
    const timer = window.setTimeout(() => setTimedOut(true), 8000);

    return () => {
      window.removeEventListener("message", onMessage);
      window.clearTimeout(timer);
    };
  }, [frameKey]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100dvh",
        minHeight: "100dvh",
        overflow: "hidden",
        bgcolor: "#f4f7fa",
      }}
    >
      <Box
        key={frameKey}
        component="iframe"
        src={APP_URL}
        title="Đấu Thầu 360"
        allow="clipboard-read; clipboard-write"
        loading="eager"
        referrerPolicy="strict-origin-when-cross-origin"
        sx={{
          position: "absolute",
          inset: 0,
          display: "block",
          width: "100%",
          height: "100%",
          border: 0,
          bgcolor: "#f4f7fa",
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
            bgcolor: "#f4f7fa",
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
                <CircularProgress size={30} thickness={4} />
                <Typography sx={{ fontSize: 14, fontWeight: 800 }}>
                  Đang mở Đấu Thầu 360
                </Typography>
                <Typography color="text.secondary" sx={{ fontSize: 12 }}>
                  Đang khởi tạo workspace trong Super App…
                </Typography>
              </>
            ) : (
              <>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    display: "grid",
                    placeItems: "center",
                    borderRadius: 2.5,
                    bgcolor: "action.selected",
                    fontWeight: 900,
                  }}
                >
                  ĐT
                </Box>
                <Typography sx={{ fontSize: 16, fontWeight: 900 }}>
                  Không tải được mini app nhúng
                </Typography>
                <Typography color="text.secondary" sx={{ fontSize: 12, lineHeight: 1.6 }}>
                  Super App chưa nhận được tín hiệu khởi tạo từ Đấu Thầu 360.
                  Bạn có thể thử tải lại khung hoặc mở ứng dụng trực tiếp.
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 1 }}>
                  <Button
                    variant="contained"
                    startIcon={<Refresh />}
                    onClick={() => setFrameKey((value) => value + 1)}
                    sx={{ textTransform: "none" }}
                  >
                    Thử lại
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<OpenInNew />}
                    onClick={() => window.open(APP_URL, "_blank", "noopener,noreferrer")}
                    sx={{ textTransform: "none" }}
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
