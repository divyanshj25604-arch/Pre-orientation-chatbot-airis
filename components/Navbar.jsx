import { useUser } from "@/hooks/useUser";
import ApiKeyModal from "./ApiKeyModal";
import { useState } from "react";

export default function Navbar() {
    const { user } = useUser();
    const [showApiModal, setShowApiModal] = useState(false);
    return (
        <>
            <div className="flex items-center justify-between h-16 border-b border-white px-6">

                <h1 className="text-lg font-semibold">
                    AIRIS Prompt Lab
                </h1>

                <div className="flex items-center gap-8">
                    <button
                        className="text-xs border border-white/20 rounded-md px-2.5 py-1 hover:bg-white/5 transition"
                        onClick={() => setShowApiModal(true)}
                    >
                        API Key
                    </button>

                    <div className="text-right">
                        <p className="font-medium">{user?.name}</p>
                        <p className="text-xs text-neutral-400">
                            NST Student
                        </p>
                    </div>

                </div>

            </div>

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