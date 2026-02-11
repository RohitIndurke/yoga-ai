"use client";

import { useEffect, useRef } from "react";
import {
  PoseLandmarker,
  FilesetResolver,
  DrawingUtils,
} from "@mediapipe/tasks-vision";

type CameraProps = {
  onLandmarks?: (landmarks: any[]) => void;
};

export default function Camera({ onLandmarks }: CameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const poseLandmarkerRef = useRef<PoseLandmarker | null>(null);
  const lastVideoTimeRef = useRef<number>(-1);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    init();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((t) => t.stop());
      }
    };
  }, []);

  async function init() {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );

    poseLandmarkerRef.current =
      await PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "/models/pose_landmarker.task",
        },
        runningMode: "VIDEO",
        numPoses: 1,
      });

    startCamera();
  }

  async function startCamera() {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });

      video.srcObject = stream;

      video.onloadedmetadata = () => {
        video.play();
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        detectPose();
      };
    } catch (error) {
      console.error("Error accessing camera:", error);
      return;
    }

    function detectPose() {
      const poseLandmarker = poseLandmarkerRef.current;

      // Strict null check for video in closure
      if (!video || !poseLandmarker || video.readyState < 2) {
        animationFrameRef.current = requestAnimationFrame(detectPose);
        return;
      }

      const now = performance.now();

      if (video.currentTime !== lastVideoTimeRef.current) {
        lastVideoTimeRef.current = video.currentTime;

        const result = poseLandmarker.detectForVideo(video, now);

        ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

        if (result.landmarks?.length) {
          const drawingUtils = new DrawingUtils(ctx!);

          for (const landmarks of result.landmarks) {
            drawingUtils.drawLandmarks(landmarks, {
              color: "#00ff88",
              radius: 4,
            });

            drawingUtils.drawConnectors(
              landmarks,
              PoseLandmarker.POSE_CONNECTIONS,
              { color: "#00ff00", lineWidth: 2 }
            );
          }

          if (onLandmarks && result.landmarks && result.landmarks.length > 0) {
            onLandmarks(result.landmarks[0]);
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(detectPose);
    }

  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <video
        ref={videoRef}
        playsInline
        muted
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: "scaleX(-1)",
        }}
      />

      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: "scaleX(-1)",
        }}
      />
    </div>
  );
}
