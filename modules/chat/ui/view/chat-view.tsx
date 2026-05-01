import { ChatInput } from "../components/chat-input"
import GetAllGeneration from "../components/get-all-generation"

export const ChatView = () => {
  return (
    <>
        <ChatInput />

        <div className="flex-1 overflow-y-auto">
                <GetAllGeneration />
            </div>
    </>
  )
}
