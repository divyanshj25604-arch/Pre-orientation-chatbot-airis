"use client";

import { useState } from "react";
import { MAX_MESSAGE_LENGTH } from "@/utils/constants";
import { getMessageValidationError } from "@/utils/validators";
import { toast } from "sonner";

export default function ChatInput({
    onSend,
    loading,
    hasPrompt,
    className = "",
}) {
    const [text, setText] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        if (loading) return;

        const validationError = getMessageValidationError(text);

        if (validationError) {
            toast.error(validationError);
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
                maxLength={MAX_MESSAGE_LENGTH}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                    if (loading && e.key === "Enter") {
                        e.preventDefault();
                    }
                }}
                disabled={!hasPrompt || loading}
                placeholder={
                    hasPrompt
                        ? "Ask AIRIS anything..."
                        : "Save a system prompt first..."
                }
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
                disabled={!hasPrompt || loading}
                className="shrink-0 border rounded-lg px-6 h-14 disabled:opacity-50"
            >
                {loading ? "Thinking..." : "Send"}
            </button>
        </form>
    );
}
