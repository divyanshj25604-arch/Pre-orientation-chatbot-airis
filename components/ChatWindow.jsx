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
        <div className="flex-1 overflow-y-auto p-6 space-y-4">

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