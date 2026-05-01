import { getGenerationById } from "@/modules/chat/server/create-code";
import ChatIdView from "@/modules/chat/ui/view/chat-id-view";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{ id: string }>;
}

const ChatIDPage = async ({ params }: Props) => {
    const { id } = await params;
    const result = await getGenerationById(id);
    if (!result.success || !result.generation) notFound();

    const generation = {
        ...result.generation,
        generatedCode: result.generation.generatedCode as { code: string } | null,
    };

    return (
        <div>
            <ChatIdView generation={generation} />
        </div>
    );
};

export default ChatIDPage;