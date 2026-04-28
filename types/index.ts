export interface TypesLayout {
    children: React.ReactNode;
}

// canvas types
export interface CanvasEditorProps {
   projectId: string;
    initialTitle?: string;
    initialData?: Record<string, any> | null; // add null here
}

// canvas keys
export const canvasKeys = {
    all: ["canvas-projects"] as const,
    detail: (id: string) => ["canvas-projects", id] as const,
};