"use client";

import { useState } from "react";

export default function ChatInput({
    onSend,
    loading,
}) {
    const [text, setText] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        if (loading) return;

        if (!text.trim()) return;

        const message = text;

        setText("");

        await onSend(message);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="border-t p-4 flex gap-3"
        >
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                    if (loading && e.key === "Enter") {
                        e.preventDefault();
                    }
                }}
                placeholder="Ask AIRIS anything..."
                className="
                    flex-1
                    rounded-lg
                    border
                    border-white
                    bg-transparent
                    px-4
                    py-3
                    outline-none
                    ring-0
                    focus:ring-0
                    focus-visible:ring-0
                    focus:outline-none
                    focus:border-blue-500
                "
            />

            <button
                disabled={loading}
                className="border rounded-lg px-6 disabled:opacity-50"
            >
                {loading ? "Thinking..." : "Send"}
            </button>
        </form>
    );
}