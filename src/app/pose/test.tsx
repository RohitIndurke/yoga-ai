"use client";

import { useEffect, useRef } from "react";
import {
  PoseLandmarker,
  FilesetResolver,
  DrawingUtils,
} from "@mediapipe/tasks-vision";

export default function PosePage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  let lastVideoTime = -1;
  let poseLandmarker: PoseLandmarker;

  // -----------------------------
  // REP COUNT STATE (simple + stable)
  // -----------------------------
  let counter = 0;
  let stage: "up" | "down" | null = null;

  useEffect(() => {
    init();
  }, []);

  // -----------------------------
  // ANGLE CALCULATION
  // -----------------------------
  function calculateAngle(a: any, b: any, c: any) {
    const radians =
      Math.atan2(c.y - b.y, c.x - b.x) -
      Math.atan2(a.y - b.y, a.x - b.x);

    let angle = Math.abs((radians * 180.0) / Math.PI);
    if (angle > 180) angle = 360 - angle;
    return angle;
  }

  // -----------------------------
  // INIT MEDIAPIPE
  // -----------------------------
  async function init() {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );

    poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: "/models/pose_landmarker.task",
      },
      runningMode: "VIDEO",
      numPoses: 1,
    });

    startCamera();
  }

  // -----------------------------
  // CAMERA + POSE LOOP
  // -----------------------------
  async function startCamera() {
    const video = videoRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;

    video.onloadedmetadata = () => {
      video.play();
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      requestAnimationFrame(detectPose);
    };

    function detectPose() {
      if (!videoRef.current) return;

      const now = performance.now();

      if (video.currentTime !== lastVideoTime) {
        lastVideoTime = video.currentTime;

        const result = poseLandmarker.detectForVideo(video, now);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (result.landmarks) {
          const drawingUtils = new DrawingUtils(ctx);

          for (const landmarks of result.landmarks) {
            // -----------------------------
            // SIT-UP JOINTS (LEFT SIDE)
            // -----------------------------
            const shoulder = landmarks[11];
            const hip = landmarks[23];
            const knee = landmarks[25];

            if (shoulder && hip && knee) {
              const angle = calculateAngle(shoulder, hip, knee);

              // -----------------------------
              // REP COUNT LOGIC
              // -----------------------------
              if (angle < 60 && stage === "down") {
                stage = "up";
                counter++;
              }

              if (angle > 150 && stage !== "down") {
                stage = "down";
              }

              // -----------------------------
              // TEXT OVERLAY
              // -----------------------------
              ctx.fillStyle = "#00ff00";
              ctx.font = "20px Arial";
              ctx.fillText(`Angle: ${angle.toFixed(0)}°`, 20, 40);
              ctx.fillText(`Reps: ${counter}`, 20, 70);
              ctx.fillText(`Stage: ${stage}`, 20, 100);
            }

            // -----------------------------
            // ORIGINAL SKELETON (UNCHANGED)
            // -----------------------------
            drawingUtils.drawLandmarks(landmarks, {
              color: "#00ff00",
              radius: 4,
            });

            drawingUtils.drawConnectors(
              landmarks,
              PoseLandmarker.POSE_CONNECTIONS,
              { color: "#00ff00" }
            );
          }
        }
      }

      requestAnimationFrame(detectPose);
    }
  }

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <video
        ref={videoRef}
        style={{ position: "absolute" }}
        playsInline
        muted
      />
      <canvas
        ref={canvasRef}
        style={{ position: "absolute" }}
      />
    </div>
  );
}
