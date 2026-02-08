
"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    Pose: any;
    Camera: any;
  }
}

export default function SitupCounter() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [count, setCount] = useState(0);
  const [stage, setStage] = useState<"up" | "down" | null>(null);
  const [angle, setAngle] = useState(0);

  // -------------------------
  // Angle calculation
  // -------------------------
  function calculateAngle(a: any, b: any, c: any) {
    const radians =
      Math.atan2(c.y - b.y, c.x - b.x) -
      Math.atan2(a.y - b.y, a.x - b.x);

    let angle = Math.abs((radians * 180.0) / Math.PI);
    if (angle > 180) angle = 360 - angle;
    return angle;
  }

  useEffect(() => {
    const loadScripts = async () => {
      await Promise.all([
        loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose.js"),
        loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js"),
        loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js"),
      ]);

      startPose();
    };

    loadScripts();
  }, []);

  // -------------------------
  // Start pose detection
  // -------------------------
  const startPose = async () => {
    const video = videoRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const pose = new window.Pose({
      locateFile: (file: string) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.6,
      minTrackingConfidence: 0.6,
    });

    pose.onResults((results: any) => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

      if (!results.poseLandmarks) return;

      const lm = results.poseLandmarks;

      // LEFT SIDE landmarks
      const shoulder = lm[11];
      const hip = lm[23];
      const knee = lm[25];

      if (
        shoulder.visibility > 0.6 &&
        hip.visibility > 0.6 &&
        knee.visibility > 0.6
      ) {
        const ang = calculateAngle(shoulder, hip, knee);
        setAngle(Math.round(ang));

        // Sit-up logic
        if (ang < 60 && stage === "down") {
          setStage("up");
          setCount((c) => c + 1);
        }

        if (ang > 150 && stage !== "down") {
          setStage("down");
        }
      }

      // Draw skeleton
      window.drawConnectors(ctx, lm, window.POSE_CONNECTIONS, {
        color: "#00ffcc",
        lineWidth: 4,
      });

      window.drawLandmarks(ctx, lm, {
        color: "#ff0066",
        lineWidth: 2,
      });
    });

    const camera = new window.Camera(video, {
      onFrame: async () => {
        await pose.send({ image: video });
      },
      width: 640,
      height: 480,
    });

    camera.start();
  };

  return (
    <div style={{ background: "#111", height: "100vh", color: "#fff" }}>
      <video
        ref={videoRef}
        style={{ transform: "scaleX(-1)", display: "none" }}
        playsInline
      />

      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
        }}
      />

      <div
        style={{
          position: "fixed",
          top: 20,
          left: 20,
          background: "rgba(0,0,0,0.7)",
          padding: 15,
          borderRadius: 10,
          fontSize: 18,
        }}
      >
        <div>Reps: {count}</div>
        <div>Stage: {stage}</div>
        <div>Angle: {angle}°</div>
      </div>
    </div>
  );
}

// -------------------------
// Script loader
// -------------------------
function loadScript(src: string) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    document.body.appendChild(script);
  });
}
