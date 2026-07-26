import { ChatView } from "@/modules/chat/ui/view/chat-view"
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const ChatPage = async() => {
  const {userId} = await auth()
        if(!userId) redirect("/sign-in");
  return (
    <>
      <ChatView/>
    </>
  )
}

export default ChatPage