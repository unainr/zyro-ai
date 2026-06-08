import { PROMPT } from "@/lib/constants/prompt";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { google } from '@ai-sdk/google';
import { toast } from "sonner";

const openrouter = createOpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPEN_ROUTER_API_KEY!,
});

export async function POST(req: NextRequest) {
    
    const { prompt, imageUrl } = await req.json();
    try{

        const userContent = imageUrl
        ? [
              { type: "text" as const, text: prompt },
              { type: "image" as const, image: imageUrl },
          ]
        : prompt;

    const { text } = await generateText({
        model: google("gemini-3.5-flash"),
        system: PROMPT.PROMPT,
        maxOutputTokens:16000,
        messages: [{ role: "user", content: userContent }],
    });

    // Extract only the first code block (the App component)
    const match = text.match(/```(?:jsx?|tsx?|html?)?\n([\s\S]*?)```/);
    const clean = match ? match[1].trim() : text.trim();

    return NextResponse.json({ code: clean });
    }catch(error:any){
    toast.error(
			"An error occurred while generating the code. Please try again.",
		);
		return NextResponse.json(
			{ error: "An error occurred while generating the code." },
			{ status: 500 },
		);
    }
}

// baidu/cobuddy:free