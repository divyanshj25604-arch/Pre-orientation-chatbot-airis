export async function sendMessage(conversationId, message) {

  const apiKey = localStorage.getItem("groqApiKey");

  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      conversationId,
      message,
      apiKey,
    }),
  });

  if (!response.ok) {
    throw new Error("Chat request failed");
  }

  return await response.json();
}

export async function clearMessages(conversationId) {
  const response = await fetch(
    `/api/chat?conversationId=${conversationId}`,
    { method: "DELETE" }
  );

  if (!response.ok) {
    throw new Error("Failed to clear chat");
  }

  return await response.json();
}
