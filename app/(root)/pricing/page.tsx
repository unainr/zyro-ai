import { PricingSection } from "@/modules/billing/ui/components/pricing-section";
import { Check } from "lucide-react";

const PricingPage = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0a] px-4 my-16">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16 my-5">
                    <div className="inline-flex items-center gap-2 bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-full px-4 py-1.5 mb-6">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="text-xs font-medium tracking-wide text-zinc-600 dark:text-white/70">
                            Simple pricing
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight">
                        Start free.
                        <span className="block bg-linear-to-r from-cyan-500 via-blue-500 to-violet-500 dark:from-cyan-400 dark:via-blue-400 dark:to-violet-400 bg-clip-text text-transparent">
                            Scale when ready.
                        </span>
                    </h1>
                    <p className="text-zinc-500 dark:text-white/50 text-lg max-w-md mx-auto leading-relaxed">
                        35 free credits every month. Upgrade for more power.
                    </p>
                </div>

                {/* Pricing cards */}
                <PricingSection />

                {/* Footer note */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-zinc-400 dark:text-white/40 text-xs">
                    <span className="flex items-center gap-1.5">
                        <Check size={12} className="text-cyan-500 dark:text-cyan-400" />
                        No credit card for free plan
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Check size={12} className="text-cyan-500 dark:text-cyan-400" />
                        Cancel anytime
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Check size={12} className="text-cyan-500 dark:text-cyan-400" />
                        Excalidraw always unlimited
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Check size={12} className="text-cyan-500 dark:text-cyan-400" />
                        Resets every month
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PricingPage