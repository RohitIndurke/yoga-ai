import Image from "next/image";
import Link from "next/link";
import React from "react";
import Camera from "~/components/Camera";
import { ArrowRight, Camera as CameraIcon, ScanLine } from "lucide-react";

const Page = () => {
  return (
    <div className="relative min-h-screen w-full bg-[#0f172a] overflow-hidden text-white selection:bg-purple-500/30">
      {/* Abstract Background Gradients */}
      <div className="pointer-events-none absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[100px]" />

      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-8 p-4 py-8 lg:flex-row lg:gap-12 lg:p-8">

        {/* User Camera Section */}
        <div className="group relative flex w-full max-w-2xl flex-col gap-4">
          <div className="flex items-center gap-2 px-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400">
              <CameraIcon size={18} />
            </div>
            <h2 className="text-xl font-semibold tracking-wide text-slate-200">
              Your Pose
            </h2>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 shadow-2xl backdrop-blur-sm transition-all duration-500 hover:border-purple-500/30 hover:shadow-purple-500/10">
            {/* Camera Overlay Elements for "Tech" Feel */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-md border border-white/5">
              <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              LIVE
            </div>
            <div className="absolute inset-0 z-0">
              <Camera />
            </div>
            {/* Corner Accents */}
            <div className="absolute -left-0.5 -top-0.5 h-16 w-16 rounded-tl-3xl border-l-[3px] border-t-[3px] border-purple-500/30"></div>
            <div className="absolute -bottom-0.5 -right-0.5 h-16 w-16 rounded-br-3xl border-b-[3px] border-r-[3px] border-purple-500/30"></div>
          </div>
        </div>

        {/* Reference Image Section */}
        <div className="flex w-full max-w-md flex-col gap-6">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
                <ScanLine size={18} />
              </div>
              <h2 className="text-xl font-semibold tracking-wide text-slate-200">
                Reference
              </h2>
            </div>
            <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-slate-400 border border-white/5">
              Warrior I
            </span>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-800/50 p-6 shadow-2xl backdrop-blur-md">
            <div className="relative aspect-square w-full">
              <Image
                src="/pics/Pose.png"
                alt="Yoga Pose Reference"
                fill
                className="object-contain drop-shadow-xl"
                priority
              />
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <h3 className="text-lg font-medium text-white">Instructions</h3>
              <p className="text-sm leading-relaxed text-slate-400">
                Align your body with the reference image. Keep your back straight and hold the pose steady.
              </p>
            </div>
          </div>

          {/* Next Pose Button (Desktop/Mobile unified) */}
          <Link
            href="/ChildPose"
            className="group flex w-full items-center justify-between rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 p-4 font-semibold text-white shadow-lg shadow-purple-900/20 transition-all hover:scale-[1.02] hover:shadow-purple-900/40 active:scale-[0.98]"
          >
            <span>Next Pose</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-1">
              <ArrowRight size={18} />
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Page;
