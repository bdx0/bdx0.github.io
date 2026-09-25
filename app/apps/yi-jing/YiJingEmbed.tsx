"use client";

import { Box, Button } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";

const APP_URL = "https://yi-jing-khaki.vercel.app/";
const APP_ORIGIN = "https://yi-jing-khaki.vercel.app";
const ROTATION_THRESHOLD = 55;
const ROTATION_AXIS_THRESHOLD = 28;
const SHAKE_COOLDOWN_MS = 1000;

type MotionStatus = "idle" | "requesting" | "active" | "denied" | "unavailable";

type DeviceMotionEventConstructorWithPermission = typeof DeviceMotionEvent & {
  requestPermission?: () => Promise<"granted" | "denied">;
};

export default function YiJingEmbed() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const lastMotionRef = useRef<{ x: number; y: number; z: number } | null>(null);
  const lastShakeAtRef = useRef(0);
  const motionEventSeenRef = useRef(false);
  const [motionStatus, setMotionStatus] = useState<MotionStatus>("idle");
  const [motionPromptOpen, setMotionPromptOpen] = useState(false);

  const postToApp = useCallback((message: Record<string, unknown>) => {
    iframeRef.current?.contentWindow?.postMessage(message, APP_ORIGIN);
  }, []);

  const publishStatus = useCallback((status: MotionStatus) => {
    postToApp({ type: "yi-jing:motion-status", status });
  }, [postToApp]);

  const requestMotion = useCallback(async () => {
    if (!window.isSecureContext || !("DeviceMotionEvent" in window)) {
      setMotionStatus("unavailable");
      publishStatus("unavailable");
      return;
    }

    setMotionPromptOpen(false);
    setMotionStatus("requesting");
    const MotionEvent = DeviceMotionEvent as DeviceMotionEventConstructorWithPermission;

    if (typeof MotionEvent.requestPermission === "function") {
      try {
        const permission = await MotionEvent.requestPermission();
        if (permission !== "granted") {
          setMotionStatus("denied");
          publishStatus("denied");
          return;
        }
      } catch {
        setMotionStatus("unavailable");
        publishStatus("unavailable");
        return;
      }
    }

    lastMotionRef.current = null;
    lastShakeAtRef.current = 0;
    motionEventSeenRef.current = false;
    setMotionStatus("active");
    publishStatus("active");
  }, [publishStatus]);

  useEffect(() => {
    if (motionStatus !== "active") return;

    const handleMotion = (event: DeviceMotionEvent) => {
      motionEventSeenRef.current = true;
      const rotation = event.rotationRate;
      if (!rotation) return;

      const alpha = Math.abs(rotation.alpha ?? 0);
      const beta = Math.abs(rotation.beta ?? 0);
      const gamma = Math.abs(rotation.gamma ?? 0);
      const rotationMagnitude = alpha + beta + gamma;
      const dominantAxis = Math.max(alpha, beta, gamma);
      const now = Date.now();

      const wristTurnDetected =
        rotationMagnitude >= ROTATION_THRESHOLD &&
        dominantAxis >= ROTATION_AXIS_THRESHOLD;

      if (!wristTurnDetected || now - lastShakeAtRef.current < SHAKE_COOLDOWN_MS) return;

      lastShakeAtRef.current = now;
      postToApp({
        type: "yi-jing:shake",
        motion: "wrist",
      });
    };

    window.addEventListener("devicemotion", handleMotion);
    return () => window.removeEventListener("devicemotion", handleMotion);
  }, [motionStatus, postToApp]);

  useEffect(() => {
    if (motionStatus !== "active") return;

    const timer = window.setTimeout(() => {
      if (motionEventSeenRef.current) return;
      setMotionStatus("unavailable");
      publishStatus("unavailable");
    }, 2500);

    return () => window.clearTimeout(timer);
  }, [motionStatus, publishStatus]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== APP_ORIGIN) return;
      if (!event.data || typeof event.data !== "object") return;

      const message = event.data as { type?: string };

      if (message.type === "yi-jing:motion-enable-request") {
        if (motionStatus === "active") {
          publishStatus("active");
        } else {
          setMotionPromptOpen(true);
          publishStatus(motionStatus);
        }
        return;
      }

      if (message.type === "yi-jing:motion-status-request") {
        publishStatus(motionStatus);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [motionStatus, publishStatus]);

  const label =
    motionStatus === "active"
      ? "📱 Xoay cổ tay: bật"
      : motionStatus === "requesting"
        ? "Đang bật cảm biến…"
        : motionStatus === "denied"
          ? "Lắc: chưa cấp quyền"
          : motionStatus === "unavailable"
            ? "Lắc: không khả dụng"
            : "📱 Bật cảm biến";

  return (
    <Box sx={{ width: "100%", height: "100%", minHeight: 0, maxHeight: "100%", overflow: "hidden", bgcolor: "#f5efe5", position: "relative" }}>
      {motionPromptOpen ? (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 3,
            display: "grid",
            placeItems: "center",
            bgcolor: "rgba(30, 24, 18, .28)",
            backdropFilter: "blur(2px)",
            p: 2,
          }}
        >
          <Box
            sx={{
              width: "min(92vw, 360px)",
              bgcolor: "background.paper",
              borderRadius: 3,
              boxShadow: 8,
              p: 2.25,
              textAlign: "center",
            }}
          >
            <Box sx={{ fontSize: 36, mb: 1 }}>📱</Box>
            <Box sx={{ fontWeight: 800, mb: .75 }}>Cho phép lắc để gieo quẻ</Box>
            <Box sx={{ fontSize: 14, color: "text.secondary", mb: 2 }}>
              Sau khi cho phép, hãy xoay/nghiêng cổ tay nhẹ. Không cần lắc điện thoại. Mỗi cử chỉ gieo 1 hào.
            </Box>
            <Button
              type="button"
              variant="contained"
              fullWidth
              disabled={motionStatus === "requesting" || motionStatus === "unavailable"}
              onClick={requestMotion}
              sx={{ minHeight: 46, borderRadius: 999, textTransform: "none", fontWeight: 800 }}
            >
              {label}
            </Button>
            <Button
              type="button"
              variant="text"
              fullWidth
              onClick={() => {
                setMotionPromptOpen(false);
                publishStatus("unavailable");
              }}
              sx={{ mt: .75, textTransform: "none" }}
            >
              Gieo bằng nút
            </Button>
          </Box>
        </Box>
      ) : null}

      <Box
        ref={iframeRef}
        component="iframe"
        src={APP_URL}
        title="Kinh Dịch"
        allow="accelerometer; gyroscope; clipboard-read; clipboard-write"
        onLoad={() => publishStatus(motionStatus)}
        sx={{
          display: "block",
          width: "100%",
          height: "100%",
          minHeight: 0,
          border: 0,
          bgcolor: "#f5efe5",
        }}
      />
    </Box>
  );
}
