"use client";

import { useState } from "react";
import ChatInput from "@/components/ChatInput";
import ChatWindow from "@/components/ChatWindow";
import MobileWorkspaceTabs from "@/components/MobileWorkspaceTabs";
import PromptPanel from "@/components/PromptPanel";

export default function ResponsiveWorkspace({
  messages,
  chatLoading,
  onSend,
}) {
  const [activeMobileTab, setActiveMobileTab] = useState("chat");

  return (
    // ResponsiveWorkspace.jsx
    <div className="grid h-[calc(100dvh-64px)] grid-rows-[auto_minmax(0,1fr)] overflow-hidden md:h-[calc(100vh-64px)] md:grid-cols-[24rem_minmax(0,1fr)] md:grid-rows-[minmax(0,1fr)_auto]">      <MobileWorkspaceTabs
      activeTab={activeMobileTab}
      onTabChange={setActiveMobileTab}
    />

      <PromptPanel
        id="prompt-workspace"
        role="tabpanel"
        aria-labelledby="prompt-tab"
        onPersonaSelect={() => setActiveMobileTab("chat")}
        onPromptSaved={() => setActiveMobileTab("chat")}
        className={`min-h-0 w-full overflow-y-auto border-r-0 pb-20 md:col-start-1 md:row-span-2 md:flex md:w-full md:border-r md:pb-4 ${activeMobileTab === "prompt" ? "flex" : "hidden"
          }`}
      />

      <div
        id="chat-workspace"
        role="tabpanel"
        aria-labelledby="chat-tab"
        className={`min-h-0 flex-col pb-28 md:col-start-2 md:row-start-1 md:flex md:pb-0 ${activeMobileTab === "chat" ? "flex" : "hidden"
          }`}
      >
        <ChatWindow
          messages={messages}
          loading={chatLoading}
        />
      </div>

      <div
        className={`
          ${activeMobileTab === "chat" ? "block" : "hidden"}
          md:block
        `}
      >
        <ChatInput
          onSend={onSend}
          loading={chatLoading}
          className="fixed inset-x-0 bottom-0 z-10 bg-background h-20
             pb-[env(safe-area-inset-bottom)]
             md:static md:inset-auto md:z-auto md:bg-transparent md:h-auto md:pb-4"
        />
      </div>
    </div>
  );
}
