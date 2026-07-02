"use client";
import { ReactNode } from "react";
import { Check, X, Sparkles } from "lucide-react";

interface PlanFeature {
    label: string;
    included: boolean;
}

interface PricingCardProps {
    name: string;
    price: number;
    tagline: string;
    features: PlanFeature[];
    recommended?: boolean;
    children: ReactNode;
}

export function PricingCard({
    name,
    price,
    tagline,
    features,
    recommended,
    children,
}: PricingCardProps) {
    return (
        <div
            className={`
                relative flex flex-col p-7 rounded-2xl transition-all duration-300
                ${recommended
                    ? "bg-linear-to-b from-cyan-500/6 to-transparent dark:from-white/[0.07] dark:to-white/2 border border-cyan-500/30 dark:border-white/20 shadow-[0_0_40px_-12px_rgba(56,189,248,0.35)]"
                    : "bg-white dark:bg-white/2 border border-zinc-200 dark:border-white/10 hover:border-zinc-300 dark:hover:border-white/20"
                }
            `}
        >
            {recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="flex items-center gap-1 text-[11px] font-medium px-3 py-1 rounded-full bg-linear-to-r from-cyan-400 via-blue-400 to-violet-400 text-black shadow-sm">
                        <Sparkles size={11} />
                        Popular
                    </span>
                </div>
            )}

            <h3 className="text-zinc-900 dark:text-white text-base font-semibold">
                {name}
            </h3>
            <p className="text-zinc-500 dark:text-white/40 text-xs mt-1 mb-5">
                {tagline}
            </p>

            <div className="flex items-baseline gap-1 mb-6">
                <span className="text-zinc-900 dark:text-white text-4xl font-bold tracking-tight">
                    ${price}
                </span>
                {price > 0 && (
                    <span className="text-zinc-400 dark:text-white/30 text-sm">
                        /month
                    </span>
                )}
            </div>

            {children}

            <div className="h-px bg-zinc-200 dark:bg-white/10 my-6" />

            <ul className="space-y-3">
                {features.map((f, i) => (
                    <li
                        key={i}
                        className={`flex items-center gap-2.5 text-sm ${
                            f.included
                                ? "text-zinc-600 dark:text-white/70"
                                : "text-zinc-300 dark:text-white/25 line-through"
                        }`}
                    >
                        {f.included ? (
                            <span className="flex items-center justify-center w-4 h-4 rounded-full bg-cyan-500/10 dark:bg-cyan-400/10 shrink-0">
                                <Check size={10} className="text-cyan-500 dark:text-cyan-400" />
                            </span>
                        ) : (
                            <span className="flex items-center justify-center w-4 h-4 rounded-full bg-zinc-100 dark:bg-white/5 shrink-0">
                                <X size={10} className="text-zinc-300 dark:text-white/20" />
                            </span>
                        )}
                        {f.label}
                    </li>
                ))}
            </ul>
        </div>
    );
}