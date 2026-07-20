import { useUser } from "@/hooks/useUser";
import ApiKeyModal from "./ApiKeyModal";
import { useState } from "react";

export default function Navbar() {
    const { user } = useUser();
    const [showApiModal, setShowApiModal] = useState(false);
    return (
        <>
            <header className="relative flex h-16 w-full min-w-0 shrink-0 items-center justify-between border-b border-[var(--hud-border)] bg-[#090a17]/90 px-4 shadow-[0_6px_24px_rgba(0,0,0,.32)] backdrop-blur-xl md:px-6">

                <h1 className="min-w-0 truncate font-mono text-lg font-semibold tracking-tight text-[var(--accent-bright)] drop-shadow-[0_0_9px_rgba(139,92,246,.65)]">
                    AIRIS Prompt Lab
                </h1>

                <div className="flex min-w-0 items-center gap-3 md:gap-8">
                    <button
                        className="hud-button rounded-md px-3 py-1.5 text-xs font-medium"
                        onClick={() => setShowApiModal(true)}
                    >
                        API Key
                    </button>

                    <div className="min-w-0 border-l border-[var(--hud-line)] pl-3 text-right">
                        <p className="truncate font-medium text-violet-50">{user?.name}</p>
                        <p className="text-xs text-violet-200/55">
                            NST Student
                        </p>
                    </div>

                </div>

            </header>

            <ApiKeyModal
                open={showApiModal}
                onClose={() => setShowApiModal(false)}
                onSave={(key) => {
                    localStorage.setItem("groqApiKey", key);
                    setShowApiModal(false);
                }}
            />
        </>
    );
}
