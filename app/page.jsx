"use client";

import NameModal from "@/components/NameModal";
import Navbar from "@/components/Navbar";
import ResponsiveWorkspace from "@/components/ResponsiveWorkspace";
import { useChat } from "@/hooks/useChat";

import { useUser } from "@/hooks/useUser";

export default function Home() {
  const {
    user,
    loading,
    createUser,
  } = useUser();

  const {
    messages,
    loading: chatLoading,
    send,
  } = useChat();

  if (loading) {
    return null;
  }

  if (!user) {
    return (
      <NameModal
        onUserCreated={createUser}
      />
    );
  }

  return (

    <>

      <Navbar />

      <ResponsiveWorkspace
        messages={messages}
        chatLoading={chatLoading}
        onSend={send}
      />

    </>

  );
}
