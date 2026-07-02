import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	createGeneration,
	deleteGeneration,
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


export function useDeleteGeneration() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => deleteGeneration(id),
		onMutate: async (id: string) => {
			await queryClient.cancelQueries({ queryKey: zyroKeys.all });

			const previous = queryClient.getQueryData(zyroKeys.all);

			queryClient.setQueryData(zyroKeys.all, (old: any) => {
				if (!old?.generations) return old;
				return {
					...old,
					generations: old.generations.filter(
						(g: { id: string }) => g.id !== id
					),
				};
			});

			return { previous };
		},
		onError: (_err, _id, context) => {
			// rollback if the delete actually failed
			if (context?.previous) {
				queryClient.setQueryData(zyroKeys.all, context.previous);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: zyroKeys.all });
		},
	});
}