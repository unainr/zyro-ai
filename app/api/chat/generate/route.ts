import { PROMPT } from "@/lib/constants/prompt";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { NextRequest, NextResponse } from "next/server";

const openrouter = createOpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPEN_ROUTER_API_KEY!,
});

export async function POST(req: NextRequest) {
    const { prompt, imageUrl } = await req.json();

    const userContent = imageUrl
        ? [
              { type: "text" as const, text: prompt },
              { type: "image" as const, image: imageUrl },
          ]
        : prompt;

    const { text } = await generateText({
        model: openrouter("baidu/qianfan-ocr-fast:free"),
        system: PROMPT.PROMPT,
        messages: [{ role: "user", content: userContent }],
    });

    // Extract only the first code block (the App component)
    const match = text.match(/```(?:jsx?|tsx?|html?)?\n([\s\S]*?)```/);
    const clean = match ? match[1].trim() : text.trim();

    return NextResponse.json({ code: clean });
}