import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import Groq from "groq-sdk";

export async function POST(request) {
    try {
        const {
            conversationId,
            message,
            apiKey,
        } = await request.json();

        // Find conversation
        const conversation = await prisma.conversation.findUnique({
            where: { id: conversationId },
        });

        if (!conversation) {
            return NextResponse.json(
                { error: "Conversation not found" },
                { status: 404 }
            );
        }

        if (!conversation.systemPrompt?.trim()) {
            return NextResponse.json(
                {
                    error: "Please save a system prompt before chatting.",
                },
                {
                    status: 400,
                }
            );
        }

        // Save user's message
        await prisma.message.create({
            data: {
                role: "USER",
                content: message,
                conversationId,
            },
        });

        // Fetch previous messages
        const messages = await prisma.message.findMany({
            where: {
                conversationId,
                ...(conversation.contextStartedAt
                    ? { createdAt: { gte: conversation.contextStartedAt } }
                    : {}),
            },
            orderBy: {
                createdAt: "asc",
            },
        });

        // Build chat history
        const chatHistory = [];

        if (conversation.systemPrompt.trim() !== "") {
            chatHistory.push({
                role: "system",
                content: conversation.systemPrompt,
            });
        }

        messages.forEach((msg) => {
            chatHistory.push({
                role: msg.role === "USER" ? "user" : "assistant",
                content: msg.content,
            });
        });

        // Measure response time
        const start = Date.now();

        const groq = new Groq({
            apiKey:
                apiKey || process.env.GROQ_API_KEY,
        });

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: chatHistory,
        });

        const end = Date.now();

        const aiResponse = completion.choices[0].message.content;

        // Save assistant reply
        await prisma.message.create({
            data: {
                role: "ASSISTANT",
                content: aiResponse,
                conversationId,
            },
        });

        // Save metrics
        await prisma.chatMetric.create({
            data: {
                responseTimeMs: end - start,
                promptTokens: completion.usage?.prompt_tokens,
                completionTokens: completion.usage?.completion_tokens,
                totalTokens: completion.usage?.total_tokens,
                conversationId,
            },
        });

        return NextResponse.json({
            reply: aiResponse,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);

    const conversationId = Number(
        searchParams.get("conversationId")
    );

    const messages = await prisma.message.findMany({
        where: {
            conversationId,
        },
        orderBy: {
            createdAt: "asc",
        },
    });

    return NextResponse.json(messages);
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const conversationId = Number(searchParams.get("conversationId"));

        if (!Number.isInteger(conversationId) || conversationId <= 0) {
            return NextResponse.json(
                { error: "A valid conversation is required" },
                { status: 400 }
            );
        }

        const result = await prisma.message.deleteMany({
            where: { conversationId },
        });

        return NextResponse.json({ deleted: result.count });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Failed to clear chat" },
            { status: 500 }
        );
    }
}
