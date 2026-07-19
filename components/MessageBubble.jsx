"use client";

import ReactMarkdown from "react-markdown";

export default function MessageBubble({ message }) {
    const isUser = message.role === "user";

    return (
        <div
            className={`flex w-full min-w-0 ${isUser ? "justify-end" : "justify-start"}`}
        >
            <div
                className={`
                  min-w-0
                  max-w-[70%]
                  border
                  border-white/20
                  rounded-xl
                  px-4
                  py-3
                  break-words
                  bg-glass
                  border-glow
                `}
            >
                <div className="font-sans text-[15px] leading-relaxed" style={{color: "var(--text-dim)"}}>
                    <ReactMarkdown
                        components={{
                            p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-2" {...props} />,
                            ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-2" {...props} />,
                            li: ({node, ...props}) => <li className="mb-1" {...props} />,
                            strong: ({node, ...props}) => <strong className="font-semibold text-white" {...props} />,
                            a: ({node, ...props}) => <a className="text-[var(--accent-primary)] hover:underline" target="_blank" rel="noopener noreferrer" {...props} />
                        }}
                    >
                        {message.content}
                    </ReactMarkdown>
                </div>
                <p className="mt-2 text-[11px] text-white/50 font-mono">
                    {isUser
                        ? (typeof window !== "undefined" ? localStorage.getItem("userName") || "You" : "You")
                        : "AIRIS • Assistant"}
                </p>
            </div>
        </div>
    );
}

