"use client";
import { Show, useAuth } from "@clerk/nextjs";
import { PricingCard } from "./pricing-card";
import { SubscribeButton } from "./subscribe-button";

const PRO_PLAN_ID = "cplan_3DLYthEqby3aQsYqPGEQAqGpJs0";

export function PricingSection() {
    const { has } = useAuth();
    const isPro = has?.({ plan: "pro" }) ?? false;

    return (
        <Show when="signed-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <PricingCard
                    name="Free"
                    price={0}
                    tagline="Always free"
                    features={[
                        { label: "35 credits monthly", included: true },
                        { label: "Unlimited Excalidraw boards", included: true },
                        { label: "Export canvas as image", included: true },
                    ]}
                >
                    <SubscribeButton planId="" isFree isActive={!isPro} />
                </PricingCard>

                <PricingCard
                    name="Pro"
                    price={20}
                    tagline="Only billed monthly"
                    recommended
                    features={[
                        { label: "100 credits monthly", included: true },
                        { label: "Unlimited Excalidraw boards", included: true },
                        { label: "Export canvas as image", included: true },
                        { label: "Community support", included: true },
                    ]}
                >
                    <SubscribeButton planId={PRO_PLAN_ID} isActive={isPro} />
                </PricingCard>
            </div>
        </Show>
    );
}