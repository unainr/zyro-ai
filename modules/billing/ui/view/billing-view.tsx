import { CheckCircle } from "lucide-react";
import { PricingTable } from "@clerk/nextjs";

const FREE_FEATURES = [
    "10 AI generations per month",
    "Unlimited Excalidraw boards",
    "Export canvas as image",
];

const PRO_FEATURES = [
    "30 AI generations per month",
    "Unlimited Excalidraw boards",
    "Export canvas as image",
    "Community support",
];

interface Props {
    limitData: any;
}

export default function BillingView({ limitData }: Props) {
    const isPro = limitData?.isPro ?? false;
    const used = limitData?.used ?? 0;
    const limit = limitData?.limit ?? 10;

    return (
        <div className="min-h-screen bg-[#0f0f0f] px-4 py-16">
            <div className="max-w-3xl mx-auto">

                <div className="text-center mb-12">
                    <h1 className="text-2xl font-semibold text-white mb-2">Billing</h1>
                    <p className="text-white/30 text-sm">
                        Manage your plan and usage
                    </p>
                </div>

                {/* Usage bar */}
                <div className="mb-10 p-5 rounded-2xl bg-white/3 border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-white/50 text-sm">This month's usage</p>
                        <span className="text-white/30 text-xs">
                            {isPro ? "Pro plan" : "Free plan"}
                        </span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-2">
                        <div
                            className="h-full bg-white/50 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min((used / limit) * 100, 100)}%` }}
                        />
                    </div>
                    <p className="text-white/30 text-xs">
                        {used} of {limit} generations used this month
                    </p>
                </div>

                {/* Clerk Pricing Table — handles subscribe + manage */}
                <PricingTable />

                <p className="text-center text-white/20 text-xs mt-6">
                    Generations reset on the 1st of each month · Excalidraw is always unlimited
                </p>
            </div>
        </div>
    );
}