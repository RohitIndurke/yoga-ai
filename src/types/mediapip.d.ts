export {};

declare global {
  interface Window {
    Pose: any;
    Camera: any;
    drawLandmarks: any;
    drawConnectors: any;
    POSE_CONNECTIONS: any;
  }
}
