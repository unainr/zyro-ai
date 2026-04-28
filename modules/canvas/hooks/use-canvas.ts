import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import { createProject, deleteProject, getProjectById, getProjects, updateProject } from "../server/create-canvas";
import { canvasKeys } from "@/types";




export function useProjects() {
    return useQuery({
        queryKey: canvasKeys.all,
        queryFn: () => getProjects(),
    });
}

export function useProject(id: string) {
    return useQuery({
        queryKey: canvasKeys.detail(id),
        queryFn: () => getProjectById(id),
        enabled: !!id,
    });
}

export function useCreateProject() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (title: string) => createProject(title),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: canvasKeys.all });
        },
    });
}

export function useUpdateProject() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: {
            id: string;
            data: { title?: string; editorData?: Record<string, any> };
        }) => updateProject(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: canvasKeys.all });
            queryClient.invalidateQueries({ queryKey: canvasKeys.detail(variables.id) });
        },
    });
}

export function useDeleteProject() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => deleteProject(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: canvasKeys.all });
        },
    });
}