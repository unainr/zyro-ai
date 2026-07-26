import CanvasView from "@/modules/canvas/ui/view/canvas-view"
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
const DrawPage = async() => {
  const {userId} = await auth()
        if(!userId) redirect("/sign-in");
  return (
    <div className="h-screen w-full py-10">
      <CanvasView />
    </div>
  )
}

export default DrawPage