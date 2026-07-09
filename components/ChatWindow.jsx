"use client";

export default function ChatWindow({
  messages,
}) {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">

      {messages.map((message, index) => (
        <div
          key={index}
          className={
            message.role === "user"
              ? "text-right"
              : "text-left"
          }
        >
          <div
            className="inline-block border rounded-xl px-4 py-3 max-w-2xl"
          >
            {message.content}
          </div>
        </div>
      ))}

    </div>
  );
}