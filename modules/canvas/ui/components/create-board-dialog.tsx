"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateProject } from "../../hooks/use-canvas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function CreateBoardDialog({ open, onClose }: Props) {
    const [name, setName] = useState("");
    const router = useRouter();
    const { mutate: createProject, isPending } = useCreateProject();

    function handleSubmit() {
        if (!name.trim()) return;
        createProject(name.trim(), {
            onSuccess: (result) => {
                onClose();
                setName("");
                router.push(`/draw/${result.project?.id}`);
            },
        });
    }

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-[#1e1e1e] border border-white/10 rounded-xl p-6 w-full max-w-md shadow-xl">
                <h2 className="text-white text-lg font-semibold mb-1">New Board</h2>
                <p className="text-white/40 text-sm mb-4">Give your board a name to get started</p>

                <Input
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    placeholder="e.g. Product Wireframes"
                    className="w-full bg-white/5 border border-white/10 text-white text-sm px-4 py-2.5 rounded-lg outline-none focus:border-white/30 transition placeholder:text-white/20"
                />

                <div className="flex gap-2 mt-4 justify-end">
                    <Button
                        onClick={() => { onClose(); setName(""); }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={!name.trim() || isPending}
                        variant="primary"
                        >
                         {
                            isPending ?(
                                 <><Spinner/> Creating</> 
                            ):(
                                "Create Board"
                            )
                         }
                        
                    </Button>
                </div>
            </div>
        </div>
    );
}