"use client";

import { PricingTable } from "@clerk/nextjs";
import { useState } from "react";

interface Props {
    isPro: boolean;
}

export default function ManageSubscriptionButton({ isPro }: Props) {
    const [showPricing, setShowPricing] = useState(false);

    if (showPricing) {
        return (
            <div className="mt-2">
                <PricingTable />
            </div>
        );
    }

    if (isPro) {
        return (
            <button
                onClick={() => setShowPricing(true)}
                className="w-full h-9 rounded-lg border border-white/10 text-white/40 text-sm hover:bg-white/5 hover:text-white/60 transition"
            >
                Manage subscription
            </button>
        );
    }

    return (
        <button
            onClick={() => setShowPricing(true)}
            className="w-full h-9 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 transition"
        >
            Upgrade to Pro →
        </button>
    );
}