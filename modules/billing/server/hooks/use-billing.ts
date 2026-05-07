import { useQuery } from "@tanstack/react-query";
import { checkGenerationLimit } from "../billing.actions";

export const billingKeys = {
    limit: ["billing-limit"] as const,
};

export function useGenerationLimit() {
    return useQuery({
        queryKey: billingKeys.limit,
        queryFn: () => checkGenerationLimit(),
        staleTime: 0, // always fresh after generation
    });
}