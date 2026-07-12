import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { MAX_PROMPT_LENGTH } from "@/utils/constants";

export async function POST(request) {
  try {
    const { conversationId, systemPrompt } = await request.json();

    if (!Number.isInteger(conversationId) || typeof systemPrompt !== "string") {
      return NextResponse.json(
        { error: "A valid conversation and system prompt are required" },
        { status: 400 }
      );
    }

    if (systemPrompt.length > MAX_PROMPT_LENGTH) {
      return NextResponse.json(
        {
          error: `System prompt cannot exceed ${MAX_PROMPT_LENGTH} characters`,
        },
        { status: 400 }
      );
    }

    const existingConversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      select: { systemPrompt: true },
    });

    if (!existingConversation) {
      return NextResponse.json(
        { error: "Conversation not found" },
        { status: 404 }
      );
    }

    const promptChanged = existingConversation.systemPrompt !== systemPrompt;

    const conversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        systemPrompt,
        ...(promptChanged ? { contextStartedAt: new Date() } : {}),
      },
    });

    return NextResponse.json({
      conversation,
      contextReset: promptChanged,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to save prompt" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const conversationId = Number(
    searchParams.get("conversationId")
  );

  const conversation = await prisma.conversation.findUnique({
    where: {
      id: conversationId,
    },
    select: {
      systemPrompt: true,
    },
  });

  return NextResponse.json({
    systemPrompt: conversation.systemPrompt,
  });
}
