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
    <div className="grid min-h-0 w-full min-w-0 flex-1 grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden md:h-[calc(100vh-64px)] md:flex-none md:grid-cols-[24rem_minmax(0,1fr)] md:grid-rows-[minmax(0,1fr)_auto]">
      <MobileWorkspaceTabs
        activeTab={activeMobileTab}
        onTabChange={setActiveMobileTab}
      />

      <PromptPanel
        id="prompt-workspace"
        role="tabpanel"
        aria-labelledby="prompt-tab"
        onPersonaSelect={() => setActiveMobileTab("chat")}
        onPromptSaved={() => setActiveMobileTab("chat")}
        className={`min-h-0 w-full overflow-y-auto overscroll-contain border-r-0 md:col-start-1 md:row-span-2 md:flex md:w-full md:border-r md:pb-4 ${activeMobileTab === "prompt" ? "block" : "hidden"
          }`}
      />

      <div
        id="chat-workspace"
        role="tabpanel"
        aria-labelledby="chat-tab"
        className={`min-h-0 min-w-0 flex-col md:col-start-2 md:row-start-1 md:flex md:pb-0 ${activeMobileTab === "chat" ? "flex" : "hidden"
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
          min-h-0 min-w-0 md:contents
        `}
      >
        <ChatInput
          onSend={onSend}
          loading={chatLoading}
          className="bg-background pb-[env(safe-area-inset-bottom)] md:pb-4"
        />
      </div>
    </div>
  );
}
