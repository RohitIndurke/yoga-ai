"use client";

import Link from "next/link";
import Camera from "~/components/Camera";
import { useRef, useState } from "react";
import { calculateAngle } from "~/util/calAngle";
import { useRouter } from "next/navigation";


const ShoulderPress = () => {
  const router = useRouter();

  const R_SHOULDER = 12;
  const R_ELBOW = 14;
  const R_WRIST = 16;

  const [reps, setReps] = useState(0);
  const stage = useRef<"up" | "down">("down");

  function processLandmarks(landmarks: any[]) {
    if (!landmarks) return;

    const angle = calculateAngle(
      landmarks[R_SHOULDER ],
      landmarks[R_ELBOW],
      landmarks[R_WRIST]
    );

    if (angle < 60 && stage.current === "down") {
      stage.current = "up";
    }

    if (angle > 150 && stage.current === "up") {
      stage.current = "down";
      setReps((r) => r + 1);
    }
  }
  if(reps == 5 ){
     router.push("/upperBody/R_Shoulder-press");
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-slate-700">
        Right Arm curl
        Reps: {reps}
      </h2>

      <div className="flex min-h-screen flex-row items-center justify-center gap-8 bg-slate-50 p-4 lg:gap-12 lg:p-8">

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-4xl bg-white shadow-lg">
          <Camera onLandmarks={processLandmarks} />
        </div>


        <div className="flex w-full max-w-lg flex-col items-center gap-4 rounded-4xl border-4 border-slate-200 bg-white p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-slate-700">
            Reference Exercise
          </h2>

          <video
            src="/pics/biceps_workout.mp4"
            autoPlay
            loop
            muted
            className="h-full w-full object-contain"
            />
    
          <p className="text-md text-slate-600">
            Do 20 curls (10 each arm)
          </p>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-slate-200 px-4 py-2 text-sm text-slate-700">
        <Link href="/pose">Next Pose</Link>
        
      </div>
    </>
  );
};

export default ShoulderPress;
