export async function savePrompt(conversationId, systemPrompt) {
  const response = await fetch("/api/prompt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      conversationId,
      systemPrompt,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to save prompt");
  }

  return await response.json();
}
export async function getPrompt(conversationId) {
  const response = await fetch(
    `/api/prompt?conversationId=${conversationId}`
  );

  if (!response.ok) {
    throw new Error("Couldn't load prompt");
  }

  return await response.json();
}