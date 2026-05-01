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

export default function CodeEditor({ code, isLoading }: Props) {
	const [activeTab, setActiveTab] = useState<"code" | "preview">("preview");

	const files = {
		...PROMPT.FILES,
		"/App.js": { code: code || PLACEHOLDER },
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
							react: "^18.2.0",
							"react-dom": "^18.2.0",

							// UI & Styling
							"lucide-react": "^0.469.0",
							"tailwind-merge": "^2.4.0",
							"tailwindcss-animate": "^1.0.7",
							"class-variance-authority": "^0.7.0",
							clsx: "^2.1.1",

							// Routing
							"react-router-dom": "^7.1.1",

							// Data & Charts
							recharts: "^2.12.7",
							"react-chartjs-2": "^5.3.0",
							"chart.js": "^4.4.7",

							// Dates
							"date-fns": "^4.1.0",

							// Animation
							"framer-motion": "^11.3.19",

							// Forms
							"react-hook-form": "^7.53.0",

							// HTTP
							axios: "^1.7.7",

							// Utils
							uuid4: "^2.0.3",
							lodash: "^4.17.21",
						},
						devDependencies: {
							"@types/react": "^18.2.0",
							"@types/react-dom": "^18.2.0",
							"@types/lodash": "^4.17.0",
						},
					}}
					theme="dark"
					options={{
						recompileDelay: 300,
						externalResources: ["https://cdn.tailwindcss.com"],
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
