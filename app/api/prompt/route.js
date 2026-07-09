import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request) {
  try {
    const { conversationId, systemPrompt } = await request.json();

    const conversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        systemPrompt,
      },
    });

    return NextResponse.json(conversation);
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