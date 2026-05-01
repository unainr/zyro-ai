"use client";
import { useEffect, useRef, useState } from "react";
import SandpackEditor from "../components/code-editor";
import { useUpdateGeneration } from "../../hooks/use-chat";
import { toast } from "sonner";

interface Generation {
    id: string;
    prompt: string | null;
    imageUrl: string | null;
    generatedCode: { code: string } | null; // jsonb
}

interface Props {
    generation: Generation;
}

export default function ChatIdView({ generation }: Props) {
    const { mutate: saveGeneratedCode } = useUpdateGeneration();
    const [code, setCode] = useState<string>(generation.generatedCode?.code ?? "");
    const [isLoading, setIsLoading] = useState(false);
    const hasStarted = useRef(false);

    useEffect(() => {
        if (generation.generatedCode?.code || hasStarted.current) return;
        hasStarted.current = true;

        async function generate() {
            setIsLoading(true);
            try {
                const res = await fetch("/api/chat/generate", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        prompt: generation.prompt,
                        imageUrl: generation.imageUrl,
                    }),
                });

                const data = await res.json();
                const generated = data.code ?? "";

                setCode(generated);
                saveGeneratedCode({ id: generation.id, code: generated });
            } catch (err) {
                toast.error("Failed to generate code. Please try again.");
            } finally {
                setIsLoading(false);
            }
        }

        generate();
    }, [generation.id]);

    return (
        <div className="h-screen w-full flex flex-col bg-[#0f0f0f]">
            <div className="h-12 border-b border-white/10 flex items-center px-4 gap-3 shrink-0">
                <div className="w-2 h-2 rounded-full bg-white/20" />
                <p className="text-white/50 text-sm truncate max-w-xl">
                    {generation.prompt}
                </p>
                {isLoading && (
                    <span className="ml-auto text-white/30 text-xs animate-pulse">
                        Generating...
                    </span>
                )}
            </div>
<div className="flex-1 overflow-hidden" style={{ height: "calc(100vh - 48px)" }}>
    <SandpackEditor code={code} isLoading={isLoading} />
            </div>
        </div>
    );
}