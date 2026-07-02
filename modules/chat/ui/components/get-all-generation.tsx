"use client";
import { useState } from "react";
import { useGenerations, useDeleteGeneration } from "../../hooks/use-chat";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { Code2, ImageIcon, Sparkles, Clock, Trash2, Loader2 } from "lucide-react";
import Image from "next/image";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Generation {
    id: string;
    userId: string;
    prompt: string | null;
    imageUrl: string | null;
    generatedCode: unknown;
    createdAt: Date | null;
    updatedAt: Date | null;
}

function getGeneratedCode(generatedCode: unknown): string | null {
    if (
        generatedCode &&
        typeof generatedCode === "object" &&
        "code" in generatedCode &&
        typeof (generatedCode as { code: unknown }).code === "string"
    ) {
        return (generatedCode as { code: string }).code;
    }
    return null;
}

function SkeletonCard() {
    return (
        <div className="flex flex-col gap-3 p-4 rounded-2xl bg-white/3 border border-white/6 animate-pulse">
            <div className="h-36 rounded-xl bg-white/5" />
            <div className="h-3 w-3/4 rounded bg-white/5" />
            <div className="h-3 w-1/2 rounded bg-white/5" />
        </div>
    );
}

export default function GetAllGeneration() {
    const { data, isLoading } = useGenerations();
    const { mutate: deleteGeneration, isPending: isDeleting, variables: deletingId } = useDeleteGeneration();
    const router = useRouter();
    const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

    const generations: Generation[] = data?.generations ?? [];

    function handleConfirmDelete() {
        if (!pendingDeleteId) return;
        deleteGeneration(pendingDeleteId);
        setPendingDeleteId(null);
    }

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6">
                {Array.from({ length: 8 }).map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        );
    }

    if (generations.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full gap-3 py-24 text-center">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                    <Sparkles size={24} className="text-white/20" />
                </div>
                <p className="text-white/50 text-sm font-medium">No generations yet</p>
                <p className="text-white/20 text-xs max-w-xs">
                    Describe a UI and we'll generate it for you instantly.
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6">
                {generations.map((gen) => {
                    const code = getGeneratedCode(gen.generatedCode);
                    const isReady = !!code;
                    const isThisDeleting = isDeleting && deletingId === gen.id;

                    return (
                        <div
                            key={gen.id}
                            onClick={() => router.push(`/dashboard/chat/${gen.id}`)}
                            className="group relative flex flex-col gap-3 p-3 rounded-2xl bg-white/3 border border-white/6 hover:border-white/[0.14] hover:bg-white/6 cursor-pointer transition-all duration-200"
                        >
                            {/* Delete button — always visible */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setPendingDeleteId(gen.id);
                                }}
                                disabled={isThisDeleting}
                                className="absolute top-2 left-2 z-10 h-7 w-7 rounded-lg flex items-center justify-center bg-black/50 text-white/60 hover:bg-red-500/20 hover:text-red-400 backdrop-blur-sm transition-colors duration-150 disabled:opacity-50"
                                title="Delete"
                            >
                                {isThisDeleting ? (
                                    <Loader2 size={12} className="animate-spin" />
                                ) : (
                                    <Trash2 size={12} />
                                )}
                            </button>

                            {/* Thumbnail */}
                            <div className="relative h-36 rounded-xl bg-white/4 overflow-hidden border border-white/6 flex items-center justify-center">
                                {gen.imageUrl ? (
                                    <Image
                                        src={gen.imageUrl}
                                        alt={gen.prompt ?? "Generation"}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                ) : code ? (
                                    <div className="w-full h-full p-3 overflow-hidden">
                                        <pre className="text-[8px] leading-relaxed text-white/15 overflow-hidden select-none font-mono">
                                            {code.slice(0, 400)}
                                        </pre>
                                        <div className="absolute bottom-0 left-0 right-0 h-8 bg-linear-to-t from-[#0f0f0f] to-transparent" />
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2 text-white/20">
                                        <Code2 size={22} />
                                        <span className="text-[10px]">Generating...</span>
                                    </div>
                                )}

                                {isReady && (
                                    <div className="absolute top-2 right-2 text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                                        Ready
                                    </div>
                                )}
                            </div>

                            {/* Prompt */}
                            <p className="text-xs text-white/60 truncate px-1 group-hover:text-white/80 transition-colors font-medium leading-relaxed">
                                {gen.prompt ?? "Untitled"}
                            </p>

                            {/* Footer */}
                            <div className="flex items-center justify-between px-1">
                                <div className="flex items-center gap-1 text-white/25">
                                    <Clock size={10} />
                                    <span className="text-[10px]">
                                        {gen.createdAt
                                            ? formatDistanceToNow(new Date(gen.createdAt), { addSuffix: true })
                                            : "—"}
                                    </span>
                                </div>
                                {gen.imageUrl && (
                                    <ImageIcon size={11} className="text-white/25" />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Confirm delete dialog */}
            <AlertDialog open={!!pendingDeleteId} onOpenChange={(open) => !open && setPendingDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete this generation?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete this generation and its code. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleConfirmDelete}
                            className="bg-red-500 text-white hover:bg-red-600"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}