import React from 'react'
import Link from "next/link";
import { Button } from '~/components/ui/button';
import { ArrowLeft, Dumbbell, Activity, BicepsFlexed } from 'lucide-react';

const LowerBody = () => {
  const exercises = [
    {
      name: "Squats",
      href: "/lowerBody/squart",
      icon: <Activity className="h-6 w-6 text-blue-400" />,
      description: "Build lower body strength with proper squat form."
    },
    {
      name: "Wall Sit",
      href: "/lowerBody/wall-Sit",
      icon: <Activity className="h-6 w-6 text-blue-400" />,
      description: "Endurance exercise for quadriceps and core."
    }
  ];

  return (
    <div className="relative min-h-screen w-full bg-[black] overflow-hidden text-white selection:bg-purple-500/30">
    
      <div className="container mx-auto px-4 py-8 relative z-10">
        <Link href="/" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 mb-4">
            Lower Body Exercises
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

                <div className="flex items-center text-sm font-medium text-white-400 group-hover:text-purple-300">
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

export default LowerBody
