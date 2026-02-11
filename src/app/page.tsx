import Link from 'next/link'
import React from 'react'
import { Button } from '~/components/ui/button'
import { Dumbbell, BicepsFlexed, ArrowRight } from 'lucide-react'

const Page = () => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0f172a] p-6 text-white selection:bg-purple-500/30">
      {/* Background Gradients */}
      <div className="pointer-events-none absolute left-[-10%] top-[-10%] h-[600px] w-[600px] rounded-full bg-purple-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full bg-blue-600/20 blur-[120px]" />

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <div className="mb-16 text-center">
          <h1 className="mb-4 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-6xl">
            Start Your Workout
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Select your training focus to begin your session. Our AI-powered guidance helps you perfect your form.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Upper Body Card */}
          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:border-purple-500/30 hover:bg-slate-800/60 hover:shadow-purple-500/10">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500/20 to-teal-500/20 shadow-inner ring-1 ring-white/10">
              <BicepsFlexed className="h-10 w-10 text-green-400" />
            </div>

            <h2 className="mb-3 text-2xl font-bold text-slate-100">Upper Body Exercise</h2>
            <p className="mb-8 min-h-[48px] text-slate-400">
              Master push-ups, tricep dips, overhead presses, and rows with real-time form correction.
            </p>

            <Link href="/upperBody" className="block w-full">
              <Button className="group/btn h-12 w-full justify-between rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 text-base font-semibold text-white shadow-lg shadow-teal-900/20 transition-all hover:scale-[1.02] hover:shadow-teal-900/40 hover:from-emerald-500 hover:to-teal-500">
                <span>Start Session</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </Link>
          </div>

          {/* Lower Body Card */}
          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 hover:bg-slate-800/60 hover:shadow-blue-500/10">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 shadow-inner ring-1 ring-white/10">
              <Dumbbell className="h-10 w-10 text-blue-400" />
            </div>

            <h2 className="mb-3 text-2xl font-bold text-slate-100">Lower Body Exercise</h2>
            <p className="mb-8 min-h-[48px] text-slate-400">
              Strengthen glutes, hips, and legs. Form analysis for squats, lunges, and more.
            </p>

            <Link href="/lowerBody" className="block w-full">
              <Button className="group/btn h-12 w-full justify-between rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 text-base font-semibold text-white shadow-lg shadow-blue-900/20 transition-all hover:scale-[1.02] hover:shadow-blue-900/40 hover:from-blue-500 hover:to-indigo-500">
                <span>Start Session</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page