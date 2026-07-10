"use client";

import { useState } from "react";
import { isValidMessage } from "@/utils/validators";
import { toast } from "sonner";

export default function ChatInput({
    onSend,
    loading,
    className = "",
}) {
    const [text, setText] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        if (loading) return;

        if (!isValidMessage(text)) {
            toast.error("Invalid message");
            return;
        }

        const message = text;

        setText("");

        await onSend(message);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={`flex w-full min-w-0 shrink-0 gap-3 border-t p-4 ${className}`}
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
                    min-w-0
                    flex-1
                    rounded-lg
                    border
                    border-white
                    bg-transparent
                    px-4
                    py-2
                    h-14
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
                className="shrink-0 border rounded-lg px-6 h-14 disabled:opacity-50"
            >
                {loading ? "Thinking..." : "Send"}
            </button>
        </form>
    );
}
