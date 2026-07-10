"use client";

import { useState, useEffect } from "react";
import { sendMessage } from "@/services/chatService";
import { getMessages } from "@/services/messageService";

export function useChat() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadMessages();
    }, []);

    async function loadMessages() {
        const conversationId = Number(
            localStorage.getItem("conversationId")
        );

        if (!conversationId) return;

        try {
            const history = await getMessages(conversationId);

            setMessages(
                history.map((msg) => ({
                    role:
                        msg.role === "USER"
                            ? "user"
                            : "assistant",
                    content: msg.content,
                    timestamp: new Date().toISOString(),
                }))
            );
        } catch (err) {
            console.error(err);
        }
    }

    async function send(text) {
        setLoading(true);

        const conversationId = Number(
            localStorage.getItem("conversationId")
        );

        const userMessage = {
            role: "user",
            content: text,
            timestamp: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, userMessage]);

        try {
            await new Promise((resolve) =>

                setTimeout(resolve, 3000)

            );
            const data = await sendMessage(
                conversationId,
                text
            );

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: data.reply,
                    timestamp: new Date().toISOString(),
                },
            ]);
        } finally {
            setLoading(false);
        }
    }

    return {
        messages,
        loading,
        send,
    };
}