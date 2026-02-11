import Link from 'next/link'
import React from 'react'
import { Button } from '~/components/ui/button'
import { Dumbbell, BicepsFlexed  } from 'lucide-react' // Assuming you use lucide-react for icons

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">Start Your Workout</h1>
        <p className="text-slate-500 mt-2">Choose your preferred discipline to begin</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Yoga Card */}
        <div className="flex flex-col items-center p-8 bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <BicepsFlexed  className="text-green-600 w-8 h-8" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Upper Body Exercise</h2>
          <p className="text-slate-500 text-center mb-6"> push-ups (variations like diamond, wide, or knee), tricep dips, overhead presses, and bent-over rows</p>
          <Link href="/exercise/upperBody" className="w-full">
            <Button className="w-full bg-green-600 hover:bg-green-700">Go to Upper Body Exercise</Button>
          </Link>
        </div>

        {/* Exercise Card */}
        <div className="flex flex-col items-center p-8 bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Dumbbell className="text-blue-600 w-8 h-8" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Lower Body Exercise</h2>
          <p className="text-slate-500 text-center mb-6">Includes the pelvis, glutes, hips, thighs, knees, calves, and feet.</p>
          <Link href="/exercise" className="w-full">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">Start Exercise</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Page