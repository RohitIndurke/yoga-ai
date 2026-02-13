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
        <div className="relative min-h-screen w-full bg-[#0f172a] text-white">
            <div className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-8 p-4 lg:flex-row">


                <div className="relative w-full max-w-2xl">
                    <h2 className="mb-2 text-xl font-semibold">
                        Wide-Arm Push-Up (Front View)
                    </h2>

                    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10">
                        <div className="absolute bottom-4 left-4 z-10 rounded-xl bg-black/60 px-4 py-3">
                            <div className="text-xs text-slate-400">REPS</div>
                            <div className="text-3xl font-bold">{reps} / 5</div>
                        </div>

                        <Camera onLandmarks={processLandmarks} />
                    </div>
                </div>


                <div className="w-full max-w-md">
                    <div className="rounded-3xl border border-white/10 bg-slate-800/50 p-6">
                        <video
                            src="/pics/bar-shoulder-press.mp4"
                            autoPlay
                            loop
                            muted
                            className="rounded-xl"
                            style={{ transform: "scaleX(-1)" }}
                        />

                        <p className="mt-4 text-sm text-slate-400">
                            Keep hands wider than shoulders. Lower chest evenly and
                            push back up fully.
                        </p>
                    </div>

                    <Link
                        href="/pose"
                        className="mt-6 block text-center rounded-xl bg-white/5 py-3"
                    >
                        Skip Exercise
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default shoulders;
