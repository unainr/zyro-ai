import { getProjectById } from "@/modules/canvas/server/create-canvas";
import CanvasEditor from "@/modules/canvas/ui/components/canvas-editor";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{ id: string }>;
}

const DrawPage = async ({ params }: Props) => {
  const {id} = await params;
  const result = await getProjectById(id);
  if (!result.project) notFound();
  const { project } = result;

    // Only pass initialData if editorData actually has elements
    const hasData = project.editorData?.elements?.length > 0;
    return (
    <div className="h-screen w-full ">
     <CanvasEditor
             projectId={project.id}
            initialTitle={project.title ?? "Untitled"}
            initialData={hasData ? project.editorData : undefined}
        />   
    </div>
  )
}

export default DrawPage