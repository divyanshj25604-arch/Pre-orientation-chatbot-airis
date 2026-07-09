export async function getMessages(conversationId) {
  const response = await fetch(
    `/api/chat?conversationId=${conversationId}`
  );

  if (!response.ok) {
    throw new Error("Couldn't load messages");
  }

  return await response.json();
}

export async function saveMessage(
  conversationId,
  role,
  content
) {
  const response = await fetch("/api/message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      conversationId,
      role,
      content,
    }),
  });

  if (!response.ok) {
    throw new Error("Couldn't save message");
  }

  return await response.json();
}