'use server'

import { PROMPT } from "@/lib/constants/prompt";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

const openrouter = createOpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPEN_ROUTER_API_KEY!,
});
interface Props{
    prompt: string;
    imageUrl?: string;
}
export const code = ({ prompt, imageUrl }: Props) => {
    const userContent = imageUrl
        ? [
              { type: "text" as const, text: prompt },
              { type: "image" as const, image: imageUrl },
          ]
        : prompt;

          const result = generateText({
            model: openrouter('openai/gpt-oss-120b:free'),
            system:PROMPT.PROMPT,
            messages: [{ role: "user", content: userContent }],
          })
    }