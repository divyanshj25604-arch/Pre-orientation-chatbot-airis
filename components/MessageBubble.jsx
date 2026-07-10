"use client";

export default function MessageBubble({ message }) {
    const isUser = message.role === "user";

    const time = message.timestamp
        ? new Date(message.timestamp).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
        })
        : "";

    const userName =
        typeof window !== "undefined"
            ? localStorage.getItem("userName") || "You"
            : "You";

    return (
        <div
            className={`flex min-w-0 ${isUser ? "justify-end" : "justify-start"
                }`}
        >
            <div
                className="
          min-w-0
          max-w-full
          md:max-w-2xl
          border
          border-white/20
          rounded-xl
          px-4
          py-3
          whitespace-pre-wrap
          break-words
        "
            >
                <p>{message.content}</p>
                <p className="mt-2 text-[11px] text-white/50">
                    {isUser ? userName : "System"} • {time}
                </p>
            </div>
        </div>
    );
}
