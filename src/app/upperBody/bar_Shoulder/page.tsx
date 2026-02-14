"use client";

import Link from "next/link";
import Camera from "~/components/Camera";
import { useEffect, useRef, useState } from "react";
import { calculateAngle } from "~/util/calAngle";
import { useRouter } from "next/navigation";

const shoulders = () => {
    const router = useRouter();

    // Left
    const L_SHOULDER = 11;
    const L_ELBOW = 13;
    const L_WRIST = 15;

    // Right
    const R_SHOULDER = 12;
    const R_ELBOW = 14;
    const R_WRIST = 16;

    const [reps, setReps] = useState(0);
    const stage = useRef<"up" | "down">("up");

    function processLandmarks(landmarks: any[]) {
        if (!landmarks) return;

        // Angles
        const leftAngle = calculateAngle(
            landmarks[L_SHOULDER],
            landmarks[L_ELBOW],
            landmarks[L_WRIST]
        );

        const rightAngle = calculateAngle(
            landmarks[R_SHOULDER],
            landmarks[R_ELBOW],
            landmarks[R_WRIST]
        );


        const leftWide =
            Math.abs(landmarks[L_ELBOW].x - landmarks[L_SHOULDER].x) > 0.08;

        const rightWide =
            Math.abs(landmarks[R_ELBOW].x - landmarks[R_SHOULDER].x) > 0.08;


        if (
            leftAngle < 90 &&
            rightAngle < 90 &&
            leftWide &&
            rightWide &&
            stage.current === "down"
        ) {
            stage.current = "up";
        }


        if (
            leftAngle > 160 &&
            rightAngle > 160 &&
            stage.current === "up"
        ) {
            stage.current = "down";
            setReps((r) => r + 1);
        }
    }

    useEffect(() => {
        if (reps >= 5) {
            router.push("/upperBody/result");
        }
    }, [reps, router]);

    return (
        <div className="relative min-h-screen w-full bg-black overflow-hidden text-white selection:bg-white/30">

            <div className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-8 p-4 py-8 relative z-10 lg:flex-row lg:gap-12 lg:p-8">

                <div className="group relative flex w-full max-w-2xl flex-col gap-4">
                    <div className="flex items-center justify-between px-1">
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-semibold tracking-wide text-white">
                                Bar Shoulder Press
                            </h2>
                        </div>
                    </div>

                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/50 shadow-2xl backdrop-blur-sm transition-all duration-500 hover:border-white/30 hover:shadow-white/10">

                        <div className="absolute bottom-4 left-4 z-10 rounded-xl bg-black/60 px-4 py-3 backdrop-blur-md border border-white/10">
                            <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Reps</div>
                            <div className="text-3xl font-bold text-white leading-none">{reps} <span className="text-lg text-gray-500 font-normal">/ 5</span></div>
                        </div>

                        <div className="absolute inset-0 z-0 bg-transparent">
                            <Camera onLandmarks={processLandmarks} />
                        </div>

                        {/* Corner Accents */}
                        <div className="absolute -left-0.5 -top-0.5 h-16 w-16 rounded-tl-3xl border-l-[3px] border-t-[3px] border-white/30"></div>
                        <div className="absolute -bottom-0.5 -right-0.5 h-16 w-16 rounded-br-3xl border-b-[3px] border-r-[3px] border-white/30"></div>
                    </div>
                </div>


                {/* Reference Video Section */}
                <div className="flex w-full max-w-md flex-col gap-6">
                    <div className="flex items-center justify-between px-1">
                        <h2 className="text-xl font-semibold tracking-wide text-white">
                            Reference Technique
                        </h2>
                    </div>

                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/50 p-6 shadow-2xl backdrop-blur-md">
                        <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-black/20">
                            <video
                                src="/pics/bar-shoulder-press.mp4"
                                autoPlay
                                loop
                                muted
                                className="h-full w-full object-contain"
                                style={{ transform: "scaleX(-1)" }}
                            />
                        </div>

                        <div className="mt-6 flex flex-col gap-2">
                            <h3 className="text-lg font-medium text-white">Target</h3>
                            <p className="text-sm leading-relaxed text-gray-400">
                                Press the bar overhead until arms are fully extended, then lower it back to shoulder level.
                            </p>
                        </div>
                    </div>

                    <Link href="/upperBody/result" className="w-full text-center py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 transition-colors border border-white/5">
                        Finish Workout
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default shoulders;
