"use client";

import { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUp01, Image02FreeIcons, Cancel02FreeIcons } from "@hugeicons/core-free-icons";
import { Spinner } from "@/components/ui/spinner";
import { useCreateGeneration } from "../../hooks/use-chat";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useGenerationLimit } from "@/modules/billing/server/hooks/use-billing";
import Link from "next/link";

export const ChatInput = () => {
    const [prompt, setPrompt] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
const router = useRouter();
    const { mutate: createGeneration, isPending } = useCreateGeneration();
    const { data: limitData } = useGenerationLimit();
    const isPro = limitData?.isPro ?? false;
    const balance = limitData?.balance ?? 0;
    const limit = limitData?.limit ?? 35;
    const canGenerate = limitData?.canGenerate ?? true;

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { "image/*": [] },
        noClick: true,
        onDrop: (accepted) => {
            const file = accepted[0];
            if (!file) return;
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = (e) => setImagePreview(e.target?.result as string);
            reader.readAsDataURL(file);
        },
    });

    function handleFileSelect(file: File) {
        setImageFile(file);
        const reader = new FileReader();
        reader.onload = (e) => setImagePreview(e.target?.result as string);
        reader.readAsDataURL(file);
    }

    function removeImage() {
        setImageFile(null);
        setImagePreview(null);
    }

    function handleTextareaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setPrompt(e.target.value);
        const el = e.target;
        el.style.height = "auto";
        el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    }

    function handleSubmit() {
        if (!prompt.trim() || isPending) return;

        const formData = new FormData();
        formData.append("prompt", prompt);
        if (imageFile) formData.append("image", imageFile);

        createGeneration(formData, {
            onSuccess: (result) => {
                if (!result.success||!result.generation) return;
                router.push(`/dashboard/chat/${result.generation.id}`);
                setPrompt("");
                removeImage();
                if (textareaRef.current) textareaRef.current.style.height = "auto";
            },
        });
    }
const canSubmit = prompt.trim().length > 0 && !isPending && canGenerate;

    return (
        <div className="w-full max-w-3xl mx-auto px-4">
          {/* Credit bar */}
            <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2.5">
                    <div className="h-1 w-28 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-white/40 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min((balance / limit) * 100, 100)}%` }}
                        />
                    </div>
                    <span className="text-white/30 text-xs">
                        {balance} credit{balance !== 1 ? "s" : ""} left
                        {isPro ? " · Pro" : " · Free"}
                    </span>
                </div>
                {!isPro && (
                    <Link
                        href="/pricing"
                        className="text-xs text-white/30 hover:text-white/60 transition underline underline-offset-4"
                    >
                        Upgrade →
                    </Link>
                )}
            </div>

            {/* Limit reached */}
            {!canGenerate && (
                <div className="mb-3 px-4 py-3 rounded-xl bg-white/3 border border-white/10 flex items-center justify-between gap-4">
                    <div>
                        <p className="text-white/70 text-sm font-medium">
                            Not enough credits
                        </p>
                        <p className="text-white/30 text-xs mt-0.5">
                            {isPro
                                ? "You're low on credits. Resets next month."
                                : "Upgrade to Pro for 100 credits/month."
                            }
                        </p>
                    </div>
                    {!isPro && (
                        <Link
                            href="/dashboard/billing"
                            className="shrink-0 text-xs bg-white text-black font-medium px-3 py-1.5 rounded-lg hover:bg-white/90 transition"
                        >
                            Upgrade to Pro
                        </Link>
                    )}
                </div>
            )}

            {/* Limit reached */}
            {!canGenerate && (
                <div className="mb-3 px-4 py-3 rounded-xl bg-white/3 border border-white/10 flex items-center justify-between gap-4">
                    <div>
                        <p className="text-white/70 text-sm font-medium">
                            {isPro ? "Monthly limit reached" : "Free credits used up"}
                        </p>
                        <p className="text-white/30 text-xs mt-0.5">
                            {isPro
                                ? "Your 30 monthly generations are used. Resets next month."
                                : "Upgrade to Pro for 30 generations/month."
                            }
                        </p>
                    </div>
                    {!isPro && (
                        <Link
                            href="/dashboard/billing"
                            className="shrink-0 text-xs bg-white text-black font-medium px-3 py-1.5 rounded-lg hover:bg-white/90 transition"
                        >
                            Upgrade to Pro
                        </Link>
                    )}
                </div>
            )}

            {/* Input box */}
            <div
                {...getRootProps()}
                className={`
                    relative rounded-2xl border transition-all duration-150 bg-[#1a1a1a]
                    ${isDragActive
                        ? "border-white/30 bg-white/5 ring-1 ring-white/10"
                        : "border-white/10 hover:border-white/20"
                    }
                `}
            >
                <Input {...getInputProps()} />

                {/* Drag overlay */}
                {isDragActive && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl bg-black/50 backdrop-blur-sm gap-2">
                        <HugeiconsIcon icon={Image02FreeIcons} className="size-6 text-white/50" strokeWidth={1.5} />
                        <p className="text-white/50 text-sm">Drop image here</p>
                    </div>
                )}

                {/* Image preview */}
                {imagePreview && (
                    <div className="px-4 pt-4">
                        <div className="relative inline-block">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="h-16 w-16 rounded-xl object-cover border border-white/10"
                            />
                            <button
                                onClick={removeImage}
                                className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#2a2a2a] border border-white/10 flex items-center justify-center hover:bg-white/10 transition"
                            >
                                <HugeiconsIcon icon={Cancel02FreeIcons} className="size-2.5 text-white/60" strokeWidth={2.5} />
                            </button>
                        </div>
                    </div>
                )}

                {/* Textarea */}
                <div className="px-4 pt-3 pb-2">
                    <textarea
                        ref={textareaRef}
                        value={prompt}
                        onChange={handleTextareaChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Describe the UI you want to generate..."
                        rows={1}
                        className="w-full resize-none bg-transparent text-white/90 placeholder:text-white/20 text-sm outline-none leading-relaxed"
                        style={{ minHeight: "44px", maxHeight: "200px" }}
                    />
                </div>

                {/* Toolbar */}
                <div className="flex items-center justify-between px-3 pb-3">
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="h-8 w-8 flex items-center justify-center rounded-lg text-white/30 hover:text-white/60 hover:bg-white/5 transition"
                    >
                        <HugeiconsIcon icon={Image02FreeIcons} className="size-4" strokeWidth={2} />
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileSelect(file);
                            e.target.value = "";
                        }}
                    />

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!canSubmit}
                        className={`
                            h-8 w-8 rounded-xl flex items-center justify-center transition
                            ${canSubmit
                                ? "bg-white text-black hover:bg-white/90 cursor-pointer"
                                : "bg-white/10 text-white/20 cursor-not-allowed"
                            }
                        `}
                    >
                        {isPending
                            ? <Spinner className="size-3.5" />
                            : <HugeiconsIcon icon={ArrowUp01} className="size-4" strokeWidth={2.5} />
                        }
                    </button>
                </div>
            </div>

            <p className="text-center text-white/20 text-xs mt-3">
                Enter to send · Shift+Enter for new line · Drag & drop images
            </p>
        </div>
    );
};