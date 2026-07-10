"use client";

import MessageBubble from "./MessageBubble";
import LoadingSpinner from "./LoadingSpinner";
import EmptyState from "./EmptyState";

export default function ChatWindow({
    messages,
    loading,
}) {
    if (messages.length === 0 && !loading) {
        return <EmptyState />;
    }
    return (
        <div className="min-h-0 min-w-0 flex-1 space-y-4 overflow-y-auto overscroll-contain p-4 md:p-6">

            {messages.map((message, index) => (
                <MessageBubble
                    key={index}
                    message={message}
                />
            ))}
            {loading && <LoadingSpinner />}
        </div>
    );
}
