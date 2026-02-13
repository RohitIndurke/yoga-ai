import React from 'react'
import Link from "next/link";
import { Button } from '~/components/ui/button';
import { ArrowLeft, Dumbbell, Activity, BicepsFlexed } from 'lucide-react';

const UpperBody = () => {
  const exercises = [
    {
      name: "Left Biceps Curl",
      href: "/upperBody/LBiceps-Curl",
      icon: <BicepsFlexed className="h-6 w-6 text-blue-400" />,
      description: "Focus on isolating the left bicep with controlled movements."
    },
    {
      name: "Right Biceps Curl",
      href: "/upperBody/RBiceps-Curl",
      icon: <BicepsFlexed className="h-6 w-6 text-blue-400" style={{ transform: 'scaleX(-1)' }} />,
      description: "Focus on isolating the right bicep with controlled movements."
    },
    {
      name: "Wide Arm Push Ups",
      href: "/upperBody/WideArm",
      icon: <Activity className="h-6 w-6 text-blue-400" />,
      description: "Build chest and shoulder strength."
    },
    {
      name: "Left Shoulder Press",
      href: "/upperBody/L_Shoulder-press",
      icon: <Dumbbell className="h-6 w-6 text-purple-400" />,
      description: "Strengthen your left deltoid with overhead presses."
    },
    {
      name: "Right Shoulder Press",
      href: "/upperBody/R_Shoulder-press",
      icon: <Dumbbell className="h-6 w-6 text-purple-400" style={{ transform: 'scaleX(-1)' }} />,
      description: "Strengthen your right deltoid with overhead presses."
    },
    {
      name: "Bar Shoulder Press",
      href: "/upperBody/bar_Shoulder",
      icon: <Dumbbell className="h-6 w-6 text-purple-400" />,
      description: "Target your  shoulder stability and power."
    }
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#0f172a] overflow-hidden text-white selection:bg-purple-500/30">
      {/* Background Gradients */}
      <div className="pointer-events-none absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[100px]" />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <Link href="/" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 mb-4">
            Upper Body Exercises
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Select an exercise to begin your tracking session. Our AI will count your reps and monitor your form.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {exercises.map((exercise) => (
            <Link key={exercise.href} href={exercise.href} className="group">
              <div className="h-full rounded-2xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/30 hover:bg-slate-800/60 hover:shadow-lg hover:shadow-purple-500/10">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-white/5 ring-1 ring-white/10 group-hover:bg-purple-500/20 group-hover:ring-purple-500/30 transition-colors">
                    {exercise.icon}
                  </div>
                  <div className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs font-medium text-slate-400 group-hover:text-white transition-colors">
                    🔥
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-slate-100 mb-2 group-hover:text-purple-300 transition-colors">
                  {exercise.name}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {exercise.description}
                </p>

                <div className="flex items-center text-sm font-medium text-purple-400 group-hover:text-purple-300">
                  Start Session <Activity className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UpperBody
