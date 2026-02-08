"use client";

import { useEffect, useRef } from "react";
import {
  PoseLandmarker,
  FilesetResolver,
  DrawingUtils
} from "@mediapipe/tasks-vision";

export default function PosePage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  let lastVideoTime = -1;
  let poseLandmarker: PoseLandmarker;

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );

    poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: "/models/pose_landmarker.task"
      },
      runningMode: "VIDEO",
      numPoses: 1
    });

    startCamera();
  }

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
            drawingUtils.drawLandmarks(landmarks, {
              color: "#00ff00",
              radius: 4
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
