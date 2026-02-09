import Image from "next/image";
import Link from "next/link";
import React from "react";
import Camera from "~/components/Camera";

const Page = () => {
  return (
    <>
      <div className="flex min-h-screen flex-row items-center justify-center gap-8 bg-slate-50 p-4 lg:flex-row lg:gap-12 lg:p-8">
        <h2 className="text-2xl font-bold text-slate-700">Your Pose</h2>

        {/* Users Camera View */}

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-4xl bg-white shadow-lg">
          <Camera />
        </div>

        {/* Reference Image View */}
        <div className="flex w-full max-w-lg flex-col items-center gap-4 rounded-4xl border-4 border-slate-200 bg-white p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-slate-700">Reference Pose</h2>
          <Image
            src="/pics/ChildsPose.jpg"
            alt="Yoga Pose Reference"
            width={500}
            height={500}
            className="h-full w-full object-contain"
          />
          <p className="text-md text-black-500">Use this pose as a reference</p>
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-slate-200 px-4 py-2 text-sm text-slate-700">
         <Link href="/pose">Next Pose</Link> 
      </div>
    </>
  );
};

export default Page;
