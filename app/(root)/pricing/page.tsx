import { PricingTable } from "@clerk/nextjs";

const PricingPage = () => {
    return (
        <div className="min-h-screen  px-4 py-16">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="text-xs  font-medium tracking-wide">
                            Simple pricing
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold  mb-4 tracking-tight">
                        Start free.
                        <span className="block bg-linear-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                            Scale when ready.
                        </span>
                    </h1>
                    <p className=" text-lg max-w-md mx-auto leading-relaxed">
                        10 free generations every month. Upgrade for more power.
                    </p>
                </div>

                {/* Clerk Pricing Table */}
                <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/2">
                    <PricingTable />
                </div>

                {/* Footer note */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6  text-xs">
                    <span className="flex items-center gap-1.5">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                        No credit card for free plan
                    </span>
                    <span className="flex items-center gap-1.5">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Cancel anytime
                    </span>
                    <span className="flex items-center gap-1.5">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Excalidraw always unlimited
                    </span>
                    <span className="flex items-center gap-1.5">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Resets every month
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PricingPage;