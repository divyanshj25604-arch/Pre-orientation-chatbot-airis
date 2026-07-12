"use client";

import { useState, useEffect, useCallback } from "react";
import { clearMessages, sendMessage } from "@/services/chatService";
import { getMessages } from "@/services/messageService";
import { getMessageValidationError } from "@/utils/validators";
import { toast } from "sonner";

export function useChat() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [clearing, setClearing] = useState(false);

    const loadMessages = useCallback(async () => {
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
    }, []);

    useEffect(() => {
        loadMessages();
    }, [loadMessages]);

    async function send(text) {
        setLoading(true);

        const systemPrompt = localStorage.getItem("systemPrompt")?.trim();

        if (!systemPrompt) {
            toast.error("Please save a system prompt first.");
            setLoading(false);
            return;
        }

        const validationError = getMessageValidationError(text);

        if (validationError) {
            toast.error(validationError);
            setLoading(false);
            return;
        }

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

    async function clear() {
        const conversationId = Number(
            localStorage.getItem("conversationId")
        );

        if (!conversationId) return;

        setClearing(true);

        try {
            await clearMessages(conversationId);
            setMessages([]);
            toast.success("Chat cleared");
        } catch (err) {
            console.error(err);
            toast.error("Failed to clear chat");
            throw err;
        } finally {
            setClearing(false);
        }
    }

    return {
        messages,
        loading,
        send,
        clear,
        clearing,
    };
}
