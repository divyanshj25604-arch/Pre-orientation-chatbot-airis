-- Marks the point after which messages belong to the active LLM context.
ALTER TABLE "Conversation" ADD COLUMN "contextStartedAt" TIMESTAMP(3);
