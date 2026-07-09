"use client";

export default function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className="
          inline-block
          max-w-2xl
          border
          border-white/20
          rounded-xl
          px-4
          py-3
          whitespace-pre-wrap
          break-words
        "
      >
        {message.content}
      </div>
    </div>
  );
}