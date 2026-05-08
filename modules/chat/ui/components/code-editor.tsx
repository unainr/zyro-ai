"use client";
import { useState } from "react";
import {
	SandpackProvider,
	SandpackLayout,
	SandpackCodeEditor,
	SandpackPreview,
} from "@codesandbox/sandpack-react";
import { PROMPT } from "@/lib/constants/prompt";

interface Props {
	code: string;
	isLoading: boolean;
}

const PLACEHOLDER = `export default function App() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#0f0f0f", color: "rgba(255,255,255,0.3)", fontSize: 14 }}>
      Waiting for generation...
    </div>
  );
}`;

// Catches undefined variables and other runtime issues before passing to Sandpack
function sanitizeCode(raw: string): string {
    if (!raw) return PLACEHOLDER;
    // Strip markdown fences
    const fenced = raw.match(/```(?:jsx?|tsx?|javascript|typescript)?\n?([\s\S]*?)```/);
    if (fenced) return fenced[1].trim();
    // Strip appended config blocks
    const stopMarkers = ["/* tailwind.config", "module.exports", "// tailwind"];
    let cleaned = raw;
    for (const marker of stopMarkers) {
        const idx = cleaned.indexOf(marker);
        if (idx !== -1) cleaned = cleaned.slice(0, idx);
    }
    return cleaned.trim() || PLACEHOLDER;
}
export default function CodeEditor({ code, isLoading }: Props) {
	const [activeTab, setActiveTab] = useState<"code" | "preview">("preview");

	const files = {
    ...PROMPT.FILES,
    "/App.js": { code: code || PLACEHOLDER },
    "/ErrorBoundary.jsx": {
    code: `
import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }
  static getDerivedStateFromError(error) {
    return { 
      hasError: true, 
      errorMessage: String(error) 
    };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', fontFamily: 'monospace', color: '#ef4444', background: '#1a1a1a', minHeight: '100vh' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>Render Error</p>
          <pre style={{ fontSize: '12px', whiteSpace: 'pre-wrap' }}>{this.state.errorMessage}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}
`,
},
    "/index.js": {
        code: `
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from './ErrorBoundary';
import App from './App';

createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
`,
    },
};

	// 48px = page header, 41px = tabs bar
	const editorHeight = "calc(100vh - 48px - 41px)";

	return (
		<div
			style={{
				height: "calc(100vh - 48px)",
				display: "flex",
				flexDirection: "column",
			}}>
			{/* Tabs */}
			<div
				style={{
					height: "41px",
					borderBottom: "1px solid rgba(255,255,255,0.1)",
					display: "flex",
					alignItems: "center",
					gap: "4px",
					padding: "0 16px",
					flexShrink: 0,
				}}>
				{(["preview", "code"] as const).map((tab) => (
					<button
						key={tab}
						onClick={() => setActiveTab(tab)}
						style={{
							padding: "4px 12px",
							fontSize: "12px",
							borderRadius: "6px",
							border: "none",
							cursor: "pointer",
							textTransform: "capitalize",
							background:
								activeTab === tab ? "rgba(255,255,255,0.1)" : "transparent",
							color: activeTab === tab ? "white" : "rgba(255,255,255,0.3)",
						}}>
						{tab}
					</button>
				))}
			</div>

			{/* Sandpack */}
			<div
				style={{
					height: editorHeight,
					position: "relative",
					overflow: "hidden",
				}}>
				{isLoading && (
					<div
						style={{
							position: "absolute",
							inset: 0,
							zIndex: 10,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							background: "#0f0f0f",
						}}>
						<div style={{ display: "flex", gap: "8px" }}>
							{["-0.3s", "-0.15s", "0s"].map((delay) => (
								<div
									key={delay}
									style={{
										width: "6px",
										height: "6px",
										borderRadius: "50%",
										background: "rgba(255,255,255,0.3)",
										animation: `bounce 1s ${delay} infinite`,
									}}
								/>
							))}
						</div>
					</div>
				)}

				<SandpackProvider
					key={code}
					template="react"
					files={files}
					customSetup={{
        dependencies: {
            // Core
            "react": "^18.2.0",
            "react-dom": "^18.2.0",

            // Icons
            "lucide-react": "^0.469.0",

            // Styling utils
            "tailwind-merge": "^2.4.0",
            "tailwindcss-animate": "^1.0.7",
            "class-variance-authority": "^0.7.0",
            "clsx": "^2.1.1",

            // Shadcn UI primitives (Radix)
            "@radix-ui/react-accordion": "latest",
            "@radix-ui/react-alert-dialog": "latest",
            "@radix-ui/react-avatar": "latest",
            "@radix-ui/react-checkbox": "latest",
            "@radix-ui/react-collapsible": "latest",
            "@radix-ui/react-dialog": "latest",
            "@radix-ui/react-dropdown-menu": "latest",
            "@radix-ui/react-hover-card": "latest",
            "@radix-ui/react-label": "latest",
            "@radix-ui/react-menubar": "latest",
            "@radix-ui/react-navigation-menu": "latest",
            "@radix-ui/react-popover": "latest",
            "@radix-ui/react-progress": "latest",
            "@radix-ui/react-radio-group": "latest",
            "@radix-ui/react-scroll-area": "latest",
            "@radix-ui/react-select": "latest",
            "@radix-ui/react-separator": "latest",
            "@radix-ui/react-slider": "latest",
            "@radix-ui/react-slot": "latest",
            "@radix-ui/react-switch": "latest",
            "@radix-ui/react-tabs": "latest",
            "@radix-ui/react-toast": "latest",
            "@radix-ui/react-toggle": "latest",
            "@radix-ui/react-toggle-group": "latest",
            "@radix-ui/react-tooltip": "latest",

            // Routing
            "react-router-dom": "^7.1.1",

            // Charts
            "recharts": "^2.12.7",
            "react-chartjs-2": "^5.3.0",
            "chart.js": "^4.4.7",

            // Dates
            "date-fns": "^4.1.0",

            // Animation
            "framer-motion": "^11.3.19",

            // Forms
            "react-hook-form": "^7.53.0",
            "zod": "^3.23.8",
            "@hookform/resolvers": "^3.9.0",

            // HTTP
            "axios": "^1.7.7",

            // Utils
            "uuid4": "^2.0.3",
            "lodash": "^4.17.21",

            // Base UI (alternative headless)
            "@base-ui-components/react": "latest",
        },
        devDependencies: {
            "@types/react": "^18.2.0",
            "@types/react-dom": "^18.2.0",
            "@types/lodash": "^4.17.0",
            "@types/uuid": "^9.0.0",
        },
    }}
					theme="dark"
					options={{
						recompileDelay: 300,
						externalResources: ["https://cdn.tailwindcss.com","https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap",],
					}}>
					<SandpackLayout
						style={{ height: editorHeight, border: "none", borderRadius: 0 }}>
						{activeTab === "code" ? (
							<SandpackCodeEditor
								showLineNumbers
								showInlineErrors
								style={{ height: editorHeight }}
							/>
						) : (
							<SandpackPreview
								showNavigator={false}
								showOpenInCodeSandbox={true}
								style={{ height: editorHeight }}
							/>
						)}
					</SandpackLayout>
				</SandpackProvider>
			</div>
		</div>
	);
}
