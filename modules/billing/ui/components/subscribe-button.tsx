"use client";
import { Button } from "@/components/ui/button";
import { CheckoutButton } from "@clerk/nextjs/experimental";
import { SignInButton } from "@clerk/nextjs";
import { Check } from "lucide-react";

interface SubscribeButtonProps {
    planId: string;
    isFree?: boolean;
    isActive?: boolean;
    recommended?: boolean;
    isSignedIn?: boolean;
    isLoaded?: boolean;
}

export function SubscribeButton({
    planId,
    isFree,
    isActive,
    recommended,
    isSignedIn,
    isLoaded,
}: SubscribeButtonProps) {
    // Auth not resolved yet — avoid flashing the wrong state
    if (!isLoaded) {
        return (
            <div className="w-full h-10 rounded-xl bg-zinc-100 dark:bg-white/5 animate-pulse" />
        );
    }

    if (isActive) {
        return (
            <Button
                disabled
                className="w-full py-2.5 rounded-xl text-sm font-medium bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-white/50 flex items-center justify-center gap-2 cursor-default"
            >
                <Check size={14} className="text-cyan-500 dark:text-cyan-400" />
                Current plan
            </Button>
        );
    }

    if (isFree) {
        return (
            <Button
                disabled
                className="w-full py-2.5 rounded-xl text-sm font-medium bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-400 dark:text-white/40 cursor-default"
            >
                Always free
            </Button>
        );
    }

    // Signed out — open Clerk's sign-in modal instead of a broken checkout
    if (!isSignedIn) {
        return (
            <SignInButton mode="modal">
                <Button
                    variant={recommended ? "primary" : "outline"}
                    className="w-full py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                >
                    Sign in to subscribe
                </Button>
            </SignInButton>
        );
    }

    return (
        <CheckoutButton
            planId={planId}
            planPeriod="month"
            newSubscriptionRedirectUrl="/dashboard/draw"
            checkoutProps={{
                appearance: {
                    elements: {
                        formButtonPrimary:
                            "bg-linear-to-r from-cyan-400 via-blue-400 to-violet-400 text-black hover:opacity-90 rounded-xl font-medium",
                    },
                    variables: {
                        colorPrimary: "#38bdf8",
                        borderRadius: "0.75rem",
                    },
                },
            }}
        >
            <Button
                variant={recommended ? "primary" : "outline"}
                className="w-full py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
            >
                Subscribe
            </Button>
        </CheckoutButton>
    );
}