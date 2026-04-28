// components/ReportBugButton.tsx
"use client";
import * as Sentry from "@sentry/nextjs";
import { useState } from "react";

export default function ReportBugButton() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!message.trim()) return;

    Sentry.captureFeedback({
      name,
      email,
      message,
    });

    setSent(true);
    setOpen(false);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
      >
        Report a Bug
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 w-full max-w-md space-y-4">
            <h2 className="text-white text-lg font-semibold">Report a Bug</h2>

            <input
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-zinc-800 text-white placeholder-zinc-500 border border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-zinc-500"
            />

            <input
              type="email"
              placeholder="Your email (optional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-800 text-white placeholder-zinc-500 border border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-zinc-500"
            />

            <textarea
              placeholder="What went wrong? (required)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full bg-zinc-800 text-white placeholder-zinc-500 border border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-zinc-500 resize-none"
            />

            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!message.trim()}
                className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 disabled:opacity-40 transition-colors"
              >
                Send Report
              </button>
            </div>
          </div>
        </div>
      )}

      {sent && (
        <p className="text-green-400 text-sm mt-1">Bug reported. Arigato!</p>
      )}
    </>
  );
}