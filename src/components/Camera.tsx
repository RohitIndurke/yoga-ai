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
  const lastTimestampRef = useRef<number>(0);
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

      if (poseLandmarkerRef.current) {
        poseLandmarkerRef.current.close();
        poseLandmarkerRef.current = null;
      }
    };
  }, []);

  async function init() {
    try {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.32/wasm"
      );

      poseLandmarkerRef.current =
        await PoseLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_full/float16/1/pose_landmarker_full.task",
            delegate: "GPU",
          },
          runningMode: "VIDEO",
          numPoses: 1,
        });

      startCamera();
    } catch (error) {
      console.error("Error initializing pose landmarker:", error);
    }
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
      const video = videoRef.current;
      const canvas = canvasRef.current;



      if (!video || !canvas || !poseLandmarker) {

        return;
      }

      if (video.readyState < 2) {
        animationFrameRef.current = requestAnimationFrame(detectPose);
        return;
      }


      let timestamp = video.currentTime * 1000;

      if (timestamp <= lastTimestampRef.current) {
        timestamp = lastTimestampRef.current + 1;
      }

      lastTimestampRef.current = timestamp;

      try {
        const result = poseLandmarker.detectForVideo(video, timestamp);

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const firstPose = result.landmarks?.[0];

        if (firstPose) {

          const drawingUtils = new DrawingUtils(ctx);

          drawingUtils.drawLandmarks(firstPose, {
            color: "#00ff88",
            radius: 4,
          });

          drawingUtils.drawConnectors(
            firstPose,
            PoseLandmarker.POSE_CONNECTIONS,
            { color: "#00ff00", lineWidth: 2 }
          );

          onLandmarks?.(firstPose);
        }
      } catch (error) {

        console.error("Error detecting pose:", error);
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
