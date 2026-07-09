"use client";

const tabs = [
  { id: "prompt", label: "Prompt" },
  { id: "chat", label: "Chat" },
];

export default function MobileWorkspaceTabs({
  activeTab,
  onTabChange,
}) {
  function handleKeyDown(event, tabId) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

    event.preventDefault();
    onTabChange(tabId === "prompt" ? "chat" : "prompt");
  }

  return (
    <div
      className="border-b border-white px-4 py-3 md:hidden"
      role="tablist"
      aria-label="Workspace"
    >
      <div className="grid grid-cols-2 rounded-lg border border-white/40 p-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              id={`${tab.id}-tab`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`${tab.id}-workspace`}
              onClick={() => onTabChange(tab.id)}
              onKeyDown={(event) => handleKeyDown(event, tab.id)}
              className={`
                rounded-md px-3 py-2 text-sm font-medium transition

                outline-none
                focus:outline-none
                focus:ring-0
                focus:ring-transparent
                focus-visible:outline-none
                focus-visible:ring-0
                focus-visible:ring-transparent

                ${isActive
                  ? "bg-white text-black"
                  : "text-neutral-300 hover:bg-white/10"}
                `}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
