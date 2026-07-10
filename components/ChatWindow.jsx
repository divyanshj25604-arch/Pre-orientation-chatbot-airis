"use client";

import MessageBubble from "./MessageBubble";
import LoadingSpinner from "./LoadingSpinner";
import EmptyState from "./EmptyState";
import { useEffect, useRef, useState } from "react";

export default function ChatWindow({
    messages,
    loading,
    onClear,
    clearing,
}) {
    const bottomRef = useRef(null);
    const [showClearConfirmation, setShowClearConfirmation] = useState(false);
    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, loading]);
    async function handleClear() {
        try {
            await onClear();
            setShowClearConfirmation(false);
        } catch {
            // The hook displays the failure state and leaves the dialog open.
        }
    }

    return (
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
            <div className="flex shrink-0 justify-end border-b border-white/10 px-4 py-2 md:px-6">
                <button
                    type="button"
                    onClick={() => setShowClearConfirmation(true)}
                    disabled={messages.length === 0 || loading || clearing}
                    className="text-xs text-neutral-400 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Clear Chat
                </button>
            </div>

            {messages.length === 0 && !loading ? (
                <EmptyState />
            ) : (
                <div className="min-h-0 min-w-0 flex-1 space-y-4 overflow-y-auto overscroll-contain p-4 md:p-6">
                    {messages.map((message, index) => (
                        <MessageBubble
                            key={index}
                            message={message}
                        />
                    ))}
                    {loading && <LoadingSpinner />}
                    <div ref={bottomRef} />
                </div>
            )}

            {showClearConfirmation && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
                    role="alertdialog"
                    aria-modal="true"
                    aria-labelledby="clear-chat-title"
                >
                    <div className="w-full max-w-sm rounded-xl border border-white/10 bg-[#111] p-6 shadow-xl">
                        <h2 id="clear-chat-title" className="text-lg font-semibold">
                            Clear this chat?
                        </h2>
                        <p className="mt-2 text-sm text-neutral-400">
                            This removes the messages but keeps your prompt and conversation.
                        </p>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setShowClearConfirmation(false)}
                                disabled={clearing}
                                className="rounded-lg border border-white/10 px-4 py-2 disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleClear}
                                disabled={clearing}
                                className="rounded-lg border border-white px-4 py-2 disabled:opacity-50"
                            >
                                {clearing ? "Clearing..." : "Clear"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
