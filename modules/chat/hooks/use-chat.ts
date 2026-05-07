import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	createGeneration,
	getGenerations,
	saveGeneratedCode,
} from "../server/create-code";
import { billingKeys } from "@/modules/billing/server/hooks/use-billing";

export const zyroKeys = {
	all: ["zyro-generations"] as const,
	detail: (id: string) => ["zyro-generations", id] as const,
};

export function useGenerations() {
	return useQuery({
		queryKey: zyroKeys.all,
		queryFn: () => getGenerations(),
	});
}

export function useCreateGeneration() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (formData: FormData) => createGeneration(formData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: zyroKeys.all });
			queryClient.invalidateQueries({ queryKey: billingKeys.limit });
		},
	});
}

export function useUpdateGeneration() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, code }: { id: string; code: string }) =>
			saveGeneratedCode(id, code),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: zyroKeys.all });
			queryClient.invalidateQueries({
				queryKey: zyroKeys.detail(variables.id),
			});
		},
	});
}
