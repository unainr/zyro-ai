import { getProjects } from "@/modules/canvas/server/create-canvas";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createProject } from "@/modules/canvas/server/create-canvas";
import DrawDashboard from "./drawdashboard";

const CanvasView = async () => {
    const result = await getProjects();
    const projects = result.projects ?? [];

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">My Boards</h1>
                {/* This form posts to /draw/new */}
                <DrawDashboard/>
            </div>

            {projects.length === 0 && (
                <p className="text-muted-foreground">No boards yet. Create one!</p>
            )}

            <div className="grid grid-cols-3 gap-4">
                {projects.map((project) => (
                    <Link
                        key={project.id}
                        href={`/draw/${project.id}`}
                        className="border border-white/10 rounded-lg p-4 hover:bg-white/5 transition"
                    >
                        <p className="font-medium">{project.title ?? "Untitled"}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                            {project.updatedAt
                                ? new Date(project.updatedAt).toLocaleDateString()
                                : "—"}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CanvasView;