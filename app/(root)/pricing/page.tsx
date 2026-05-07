// app/(root)/dashboard/billing/page.tsx — server component, no changes needed
import { auth } from "@clerk/nextjs/server";
import { checkGenerationLimit } from "@/modules/billing/server/billing.actions";
import BillingView from "@/modules/billing/ui/view/billing-view";

const PricingPage = async () => {
    const { userId } = await auth();
    if (!userId) return null;

    const limitData = await checkGenerationLimit();
    return <BillingView limitData={limitData} />;
};

export default PricingPage;