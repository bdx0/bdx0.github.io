"use client";

import { Box, Button } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";

const APP_URL = "https://yi-jing-khaki.vercel.app/";
const APP_ORIGIN = "https://yi-jing-khaki.vercel.app";
const SHAKE_THRESHOLD = 18;
const SHAKE_COOLDOWN_MS = 900;

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
      const acceleration = event.accelerationIncludingGravity ?? event.acceleration;
      if (!acceleration) return;
      if (acceleration.x == null && acceleration.y == null && acceleration.z == null) return;

      const current = {
        x: acceleration.x ?? 0,
        y: acceleration.y ?? 0,
        z: acceleration.z ?? 0,
      };
      const previous = lastMotionRef.current;
      lastMotionRef.current = current;
      if (!previous) return;

      const delta =
        Math.abs(current.x - previous.x) +
        Math.abs(current.y - previous.y) +
        Math.abs(current.z - previous.z);
      const now = Date.now();

      if (delta < SHAKE_THRESHOLD || now - lastShakeAtRef.current < SHAKE_COOLDOWN_MS) return;

      lastShakeAtRef.current = now;
      postToApp({ type: "yi-jing:shake" });
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
      if (message.type === "yi-jing:motion-status-request") {
        publishStatus(motionStatus);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [motionStatus, publishStatus]);

  const label =
    motionStatus === "active"
      ? "📱 Lắc: bật"
      : motionStatus === "requesting"
        ? "Đang bật cảm biến…"
        : motionStatus === "denied"
          ? "Lắc: chưa cấp quyền"
          : motionStatus === "unavailable"
            ? "Lắc: không khả dụng"
            : "📱 Bật lắc";

  return (
    <Box sx={{ width: "100%", height: "100%", bgcolor: "#f5efe5", position: "relative" }}>
      <Button
        type="button"
        variant={motionStatus === "active" ? "outlined" : "contained"}
        size="small"
        disabled={motionStatus === "requesting" || motionStatus === "unavailable"}
        onClick={requestMotion}
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 2,
          minHeight: 38,
          borderRadius: 999,
          textTransform: "none",
          boxShadow: 2,
        }}
      >
        {label}
      </Button>

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
          border: 0,
          bgcolor: "#f5efe5",
        }}
      />
    </Box>
  );
}
