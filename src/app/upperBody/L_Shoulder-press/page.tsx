"use client";

import Link from "next/link";
import Camera from "~/components/Camera";
import { useEffect, useRef, useState } from "react";
import { calculateAngle } from "~/util/calAngle";
import { useRouter } from "next/navigation";


const shoulderPress = () => {
  const router = useRouter();

  const L_SHOULDER = 11;
  const L_ELBOW = 13;
  const L_WRIST = 15;

  const [reps, setReps] = useState(0);
  const stage = useRef<"up" | "down">("down");

  function processLandmarks(landmarks: any[]) {
    if (!landmarks) return;

    const angle = calculateAngle(
      landmarks[L_SHOULDER],
      landmarks[L_ELBOW],
      landmarks[L_WRIST]
    );

    if (angle < 90 && stage.current === "up") {
      stage.current = "down";
    }

    if (angle > 150 && stage.current === "down") {
      stage.current = "up";
      setReps((r) => r + 1);
    }
  }

  useEffect(() => {
    if (reps >= 5) {
      router.push("/upperBody/WideArm");
    }
  }, [reps, router]);

  return (
    <div className="relative min-h-screen w-full bg-[#0f172a] overflow-hidden text-white selection:bg-purple-500/30">
      {/* Background Gradients */}
      <div className="pointer-events-none absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[100px]" />

      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-8 p-4 py-8 relative z-10 lg:flex-row lg:gap-12 lg:p-8">

        {/* User Camera Section */}
        <div className="group relative flex w-full max-w-2xl flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold tracking-wide text-slate-200">
                Left Shoulder Press
              </h2>
            </div>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 shadow-2xl backdrop-blur-sm transition-all duration-500 hover:border-purple-500/30 hover:shadow-purple-500/10">


            {/* Rep Counter Overlay in Camera */}
            <div className="absolute bottom-4 left-4 z-10 rounded-xl bg-black/60 px-4 py-3 backdrop-blur-md border border-white/10">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Reps</div>
              <div className="text-3xl font-bold text-white leading-none">{reps} <span className="text-lg text-slate-500 font-normal">/ 5</span></div>
            </div>

            <div className="absolute inset-0 z-0 bg-transparent">
              <Camera onLandmarks={processLandmarks} />
            </div>

            {/* Corner Accents */}
            <div className="absolute -left-0.5 -top-0.5 h-16 w-16 rounded-tl-3xl border-l-[3px] border-t-[3px] border-purple-500/30"></div>
            <div className="absolute -bottom-0.5 -right-0.5 h-16 w-16 rounded-br-3xl border-b-[3px] border-r-[3px] border-purple-500/30"></div>
          </div>
        </div>


        {/* Reference Video Section */}
        <div className="flex w-full max-w-md flex-col gap-6">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xl font-semibold tracking-wide text-slate-200">
              Reference Technique
            </h2>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-800/50 p-6 shadow-2xl backdrop-blur-md">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-black/20">
              <video
                src="/pics/Single_Arm_Dumbbell.mp4"
                autoPlay
                loop
                muted
                className="h-full w-full object-contain"
                style={{ transform: "scaleX(-1)" }}
              />
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <h3 className="text-lg font-medium text-white">Target</h3>
              <p className="text-sm leading-relaxed text-slate-400">
                Do 5 repetitions for your left arm. Be careful with the weight.
              </p>
            </div>
          </div>

          <Link href="/upperBody/WideArm" className="w-full text-center py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors border border-white/5">
            Skip to Next Pose
          </Link>
        </div>
      </div>
    </div>
  );
};

export default shoulderPress;
