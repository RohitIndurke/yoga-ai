"use client";

import Link from 'next/link'
import React from 'react'
import { Button } from '~/components/ui/button'
import { ArrowLeft, Flame, Trophy, Home } from 'lucide-react'

const ResultPage = () => {
    return (
        <div className="relative min-h-screen w-full bg-[#0f172a] overflow-hidden text-white selection:bg-purple-500/30">
            {/* Background Gradients */}
            <div className="pointer-events-none absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[100px]" />
            <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[100px]" />

            <div className="container mx-auto px-4 py-8 relative z-10 min-h-screen flex flex-col items-center justify-center">

                <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-md text-center">

                        {/* Success Icon */}
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 ring-1 ring-green-500/20">
                            <Trophy className="h-10 w-10 text-green-400" />
                        </div>

                        <h1 className="mb-2 text-3xl font-bold text-white">
                            Great Job!
                        </h1>
                        <p className="mb-8 text-slate-400">
                            You've successfully completed the upper body session.
                        </p>

                        {/* Stats Card */}
                        <div className="mb-8 grid grid-cols-1 gap-4">
                            <div className="flex items-center justify-between rounded-xl bg-white/5 p-4 border border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400">
                                        <Flame className="h-5 w-5" />
                                    </div>
                                    <span className="text-slate-200 font-medium">Calories Burned</span>
                                </div>
                                <span className="text-xl font-bold text-white">500🔥</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Link href="/">
                                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white border-none py-6 text-lg rounded-xl">
                                    <Home className="mr-2 h-5 w-5" /> Back to Home
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ResultPage
