"use client";
import dynamic from "next/dynamic";
import "@excalidraw/excalidraw/index.css";
import { MainMenu } from "@excalidraw/excalidraw";
import { CanvasEditorProps } from "@/types";
import { useUpdateProject } from "../../hooks/use-canvas";
import { useRef } from "react";
import { ExcalidrawElement } from "@excalidraw/excalidraw/element/types";
import { AppState, BinaryFiles } from "@excalidraw/excalidraw/types";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

const Excalidraw = dynamic(
    async () => (await import("@excalidraw/excalidraw")).Excalidraw,
    { ssr: false }
);

export default function CanvasEditor({ projectId, initialData }: CanvasEditorProps) {
    const { mutate: updateProject, isPending } = useUpdateProject();
    const latestData = useRef<Record<string, any> | null>(null);

    const sanitizedInitialData = initialData
        ? {
              ...initialData,
              appState: initialData.appState
                  ? {
                        ...initialData.appState,
                        collaborators: new Map(
                            Object.entries(initialData.appState.collaborators ?? {})
                        ),
                    }
                  : undefined,
          }
        : null;

    function handleChange(
        elements: readonly ExcalidrawElement[],
        appState: AppState,
        _files: BinaryFiles
    ) {
        latestData.current = {
            elements,
            appState: {
                viewBackgroundColor: appState.viewBackgroundColor,
                gridSize: appState.gridSize,
            },
        };
    }

    function handleSave() {
        if (!latestData.current || !projectId) return;
        updateProject({
            id: projectId,
            data: { editorData: latestData.current },
        });
    }

    return (
        <div className="h-screen w-full relative">

            {/* Save button overlay */}
            <div className="absolute top-3 right-3 z-100">
                <Button
                    onClick={handleSave}
                    disabled={isPending}
                    variant={'primary'}
                    className='rounded-none'
>
                     {isPending ?<>
                        
                            <Spinner/> Saving 
                        </> 
                        
                        : "Save"}
                </Button>
            </div>

            <Excalidraw
                initialData={sanitizedInitialData}
                onChange={handleChange}
                theme="dark"
            >
                <MainMenu>
                    <MainMenu.DefaultItems.ClearCanvas />
                    <MainMenu.DefaultItems.Export />
                    <MainMenu.DefaultItems.ToggleTheme />
                    <MainMenu.DefaultItems.SearchMenu />
                    <MainMenu.DefaultItems.SaveAsImage />
                    <MainMenu.DefaultItems.ChangeCanvasBackground />
                </MainMenu>
            </Excalidraw>
        </div>
    );
}