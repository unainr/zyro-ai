"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
    { label: "Reading your prompt...",        duration: 1800 },
    { label: "Planning the layout...",        duration: 2200 },
    { label: "Writing React components...",   duration: 3000 },
    { label: "Styling with Tailwind...",      duration: 2500 },
    { label: "Polishing the UI...",           duration: 2000 },
    { label: "Almost ready...",               duration: 99999 },
];

export default function LoadingScreen() {
    const [stepIndex, setStepIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let elapsed = 0;
        const interval = setInterval(() => {
            elapsed += 100;
            const totalDuration = steps.slice(0, -1).reduce((a, s) => a + s.duration, 0);
            const raw = Math.min((elapsed / totalDuration) * 92, 92);
            setProgress(raw);

            let cumulative = 0;
            for (let i = 0; i < steps.length - 1; i++) {
                cumulative += steps[i].duration;
                if (elapsed < cumulative) {
                    setStepIndex(i);
                    break;
                }
                if (i === steps.length - 2) setStepIndex(steps.length - 1);
            }
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-full w-full flex flex-col bg-[#0a0a0a]">

            {/* Top progress bar */}
            <div className="h-0.5 w-full bg-white/5 relative overflow-hidden">
                <motion.div
                    className="absolute inset-y-0 left-0 bg-linear-to-r from-cyan-500 via-blue-500 to-violet-500"
                    initial={{ width: "0%" }}
                    animate={{ width: progress + "%" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                />
                {/* Shimmer */}
                <motion.div
                    className="absolute inset-y-0 w-24 bg-linear-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ["-96px", "100vw"] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                />
            </div>

            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">

                {/* Left panel — status */}
                <div className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-white/6 p-6 flex flex-col gap-6 shrink-0">

                    {/* Logo / brand */}
                    <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                            </svg>
                        </div>
                        <span className="text-white/60 text-sm font-medium">Generating UI</span>
                    </div>

                    {/* Steps */}
                    <div className="flex flex-col gap-2">
                        {steps.map((step, i) => (
                            <motion.div
                                key={step.label}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-3"
                            >
                                <div className="relative shrink-0 w-5 h-5 flex items-center justify-center">
                                    {i < stepIndex && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center"
                                        >
                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </motion.div>
                                    )}
                                    {i === stepIndex && (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            className="w-4 h-4 rounded-full border-2 border-white/10 border-t-cyan-400"
                                        />
                                    )}
                                    {i > stepIndex && (
                                        <div className="w-2 h-2 rounded-full bg-white/10" />
                                    )}
                                </div>

                                <AnimatePresence mode="wait">
                                    <span
                                        className={"text-xs transition-colors " + (
                                            i === stepIndex
                                                ? "text-white/80"
                                                : i < stepIndex
                                                ? "text-white/30 line-through"
                                                : "text-white/20"
                                        )}
                                    >
                                        {step.label}
                                    </span>
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>

                    {/* Progress number */}
                    <div className="mt-auto">
                        <div className="flex items-end justify-between mb-2">
                            <span className="text-white/20 text-xs">Progress</span>
                            <motion.span
                                className="text-white/50 text-xs font-mono"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                {Math.round(progress)}%
                            </motion.span>
                        </div>
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-linear-to-r from-cyan-500 to-violet-500 rounded-full"
                                animate={{ width: progress + "%" }}
                                transition={{ duration: 0.4 }}
                            />
                        </div>
                    </div>
                </div>

                {/* Right panel — skeleton preview */}
                <div className="flex-1 p-6 overflow-hidden">

                    {/* Fake browser bar */}
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-3 h-3 rounded-full bg-white/10" />
                        <div className="w-3 h-3 rounded-full bg-white/10" />
                        <div className="w-3 h-3 rounded-full bg-white/10" />
                        <div className="flex-1 h-6 rounded-md bg-white/4 border border-white/6 ml-2" />
                    </div>

                    {/* Skeleton UI */}
                    <div className="space-y-4">
                        {/* Nav skeleton */}
                        <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.
                        03] border border-white/6">
                            <Skeleton className="h-5 w-24 bg-white/6" />
                            <div className="flex gap-3">
                                <Skeleton className="h-4 w-14 bg-white/4" />
                                <Skeleton className="h-4 w-14 bg-white/4" />
                                <Skeleton className="h-4 w-14 bg-white/4" />
                            </div>
                            <Skeleton className="h-7 w-20 rounded-lg bg-white/6" />
                        </div>

                        {/* Hero skeleton */}
                        <div className="p-6 rounded-xl bg-white/3 border border-white/6 flex flex-col items-center gap-3">
                            <Skeleton className="h-3 w-32 bg-white/4" />
                            <Skeleton className="h-8 w-64 bg-white/7" />
                            <Skeleton className="h-8 w-48 bg-white/5" />
                            <Skeleton className="h-4 w-80 bg-white/4" />
                            <Skeleton className="h-4 w-64 bg-white/3" />
                            <div className="flex gap-3 mt-2">
                                <Skeleton className="h-9 w-28 rounded-lg bg-white/7" />
                                <Skeleton className="h-9 w-28 rounded-lg bg-white/4" />
                            </div>
                        </div>

                        {/* Cards skeleton */}
                        <div className="grid grid-cols-3 gap-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="p-4 rounded-xl bg-white/3 border border-white/6 space-y-3">
                                    <Skeleton className="h-24 w-full rounded-lg bg-white/5" />
                                    <Skeleton className="h-4 w-3/4 bg-white/6" />
                                    <Skeleton className="h-3 w-full bg-white/4" />
                                    <Skeleton className="h-3 w-2/3 bg-white/3" />
                                    <div className="flex justify-between items-center pt-1">
                                        <Skeleton className="h-4 w-16 bg-white/5" />
                                        <Skeleton className="h-7 w-20 rounded-lg bg-white/6" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Bottom row */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-4 rounded-xl bg-white/3 border border-white/6 space-y-2">
                                <Skeleton className="h-4 w-1/2 bg-white/6" />
                                <Skeleton className="h-3 w-full bg-white/4" />
                                <Skeleton className="h-3 w-3/4 bg-white/3" />
                            </div>
                            <div className="p-4 rounded-xl bg-white/3 border border-white/6 space-y-2">
                                <Skeleton className="h-4 w-1/2 bg-white/6" />
                                <Skeleton className="h-3 w-full bg-white/4" />
                                <Skeleton className="h-3 w-3/4 bg-white/3" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}