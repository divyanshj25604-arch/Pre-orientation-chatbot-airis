import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const { uuid } = await req.json();

    if (!uuid) {
      return NextResponse.json(
        { error: "UUID is required" },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { uuid },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Check if active conversation exists
    let conversation = await prisma.conversation.findFirst({
      where: {
        userId: user.id,
        status: "ACTIVE",
      },
    });

    // Create one if not found
    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          userId: user.id,
          systemPrompt: "",
          status: "ACTIVE",
        },
      });
    }

    return NextResponse.json(conversation);

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}