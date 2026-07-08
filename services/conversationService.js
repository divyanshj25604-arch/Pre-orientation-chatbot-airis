export async function getConversation(uuid) {
  const res = await fetch("/api/conversation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uuid }),
  });

  if (!res.ok) {
    throw new Error("Couldn't load conversation");
  }

  return await res.json();
}