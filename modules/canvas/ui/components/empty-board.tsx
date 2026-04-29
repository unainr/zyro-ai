import { PenTool01FreeIcons } from "@hugeicons/core-free-icons";
import CreateBoardButton from "./create-board-button";
import { HugeiconsIcon } from "@hugeicons/react";

export default function EmptyBoards () {
    return (
        <div className="flex items-center justify-center h-[60vh]">
            <div className="flex flex-col items-center gap-5 text-center max-w-xs">

                {/* Icon box */}
                <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-secondary border border-white/10 flex items-center justify-center">
                        <HugeiconsIcon
                            icon={PenTool01FreeIcons}
                            strokeWidth={2}
                            className="size-7 text-muted-foreground"
                        />
                    </div>
                </div>

                {/* Text */}
                <div className="flex flex-col gap-1.5">
                    <p className="text-sm font-medium text-foreground">No boards yet</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        Start by creating your first board.<br />
                        Your work will appear here.
                    </p>
                </div>

                <CreateBoardButton className="rounded-none" />
            </div>
        </div>
    );
}