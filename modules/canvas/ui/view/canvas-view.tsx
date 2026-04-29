import { getProjects } from "@/modules/canvas/server/create-canvas";
import Link from "next/link";
import DeleteBoardDialog from "../components/delete-board-dialog";
import CreateBoardButton from "../components/create-board-button";
import EmptyBoards from "../components/empty-board";

const CanvasView = async () => {
    const result = await getProjects();
    const projects = result.projects ?? [];

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-xl font-semibold">My Boards</h1>
                    <p className="text-muted-foreground text-sm mt-0.5">
                        {projects.length} {projects.length === 1 ? "board" : "boards"}
                    </p>
                </div>
                <CreateBoardButton />
            </div>

            {/* Empty state */}
            {projects.length === 0 && (
                <EmptyBoards/>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="group border border-white/10 rounded-xl p-4 hover:bg-white/5 transition flex items-center justify-between"
                    >
                        {/* Left — clickable area */}
                        <Link
                            href={`/draw/${project.id}`}
                            className="flex flex-col gap-1 flex-1 min-w-0"
                        >
                            <p className="font-medium text-sm truncate">
                                {project.title ?? "Untitled"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {project.updatedAt
                                    ? new Date(project.updatedAt).toLocaleDateString()
                                    : "—"}
                            </p>
                        </Link>

                        {/* Right — delete button, always visible */}
                        <DeleteBoardDialog
                            projectId={project.id}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CanvasView;