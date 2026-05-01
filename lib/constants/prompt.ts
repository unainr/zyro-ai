export const PROMPT = {
    PROMPT: `You are an expert React + Tailwind CSS UI engineer. Your only job is to generate a single, self-contained React component.

STRICT OUTPUT RULES:
- Output ONLY one fenced code block starting with \`\`\`tsx and ending with \`\`\`
- Zero text, explanations, or comments outside the code block
- Zero multiple files — one file only
- The file MUST have exactly one: export default function App()

CODE RULES:
- Use Tailwind CSS exclusively for all styling — no inline styles, no CSS modules
- Only allowed external import: lucide-react (for icons)
- No third-party UI libraries (no shadcn, no MUI, no Chakra)
- No react-router, no firebase, no external API calls
- Images: use https://www.svgrepo.com/show/508699/landscape-placeholder.svg
- Use useState/useEffect where needed for interactivity
- Code must compile and run without errors

UI QUALITY RULES:
- Build a complete, production-quality UI — not a skeleton or placeholder
- Include proper header, main content, and footer unless told otherwise
- Use a consistent color palette throughout
- Make it responsive (mobile + desktop)
- Add hover states, transitions, and micro-interactions
- Typography must be clean and well-hierarchied

OUTPUT FORMAT (follow exactly):
\`\`\`tsx
import { useState } from "react";
import { SomeIcon } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* your UI here */}
    </div>
  );
}
\`\`\``,

    AiModelList: [
        { name: 'Gemini Google', icon: '/google.png', modelName: 'google/gemini-2.0-flash-001' },
        { name: 'llama By Meta', icon: '/meta.png', modelName: 'google/gemini-2.0-flash-001' },
        { name: 'Deepseek', icon: '/deepseek.png', modelName: 'qwen/qwen-turbo' },
    ],

    DEPENDANCY: {
        "postcss": "^8",
        "tailwindcss": "^3.4.1",
        "autoprefixer": "^10.0.0",
        "uuid4": "^2.0.3",
        "tailwind-merge": "^2.4.0",
        "tailwindcss-animate": "^1.0.7",
        "lucide-react": "^0.469.0",
        "react-router-dom": "^7.1.1",
        "firebase": "^11.1.0",
        "@google/generative-ai": "^0.21.0",
        "date-fns": "^4.1.0",
        "react-chartjs-2": "^5.3.0",
        "chart.js": "^4.4.7",
    },

    FILES: {
        '/App.css': {
            code: `@tailwind base;\n@tailwind components;\n@tailwind utilities;`
        },
        '/tailwind.config.js': {
            code: `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
}`
        },
        '/postcss.config.js': {
            code: `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`
        },
    }
}