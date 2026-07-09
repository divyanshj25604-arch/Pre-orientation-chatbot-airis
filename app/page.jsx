"use client";

import NameModal from "@/components/NameModal";
import Navbar from "@/components/Navbar";
import PromptPanel from "@/components/PromptPanel";
import PersonaCard from "@/components/PersonaCard";
import ChatWindow from "@/components/ChatWindow";
import ChatInput from "@/components/ChatInput";
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

      <div className="flex h-[calc(100vh-64px)]">

        <PromptPanel />

        <div className="flex flex-col flex-1">

          <ChatWindow
            messages={messages}
            loading={chatLoading}
          />

          <ChatInput
            onSend={send}
            loading={chatLoading}
          />

        </div>

      </div>

    </>

  );
}