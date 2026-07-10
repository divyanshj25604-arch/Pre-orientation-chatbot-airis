"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { isValidGroqKey } from "@/utils/validators";

export default function ApiKeyModal({
    open,
    onClose,
    onSave,
}) {
    const [apiKey, setApiKey] = useState("");

    useEffect(() => {
        if (!open) return;

        const savedKey =
            localStorage.getItem("groqApiKey") || "";

        setApiKey(savedKey);

    }, [open]);

    if (!open) return null;

    function handleSave() {
        if (!isValidGroqKey(apiKey)) {
            toast.error("Invalid Groq API key");
            return;
        }

        onClose();

        onSave(apiKey);
    }

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

            <div className="w-[calc(100%-2rem)] max-w-[420px] rounded-xl border border-white/10 bg-[#111] p-6">

                <h2 className="text-lg font-semibold">
                    Groq API Key
                </h2>

                <p className="text-sm text-neutral-400 mt-2">
                    Use your own Groq API key for all requests in this chat.
                </p>

                <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your Groq API key"
                    className="w-full mt-5 rounded-lg border border-white/10 bg-transparent p-3 outline-none"
                />

                <div className="flex justify-end gap-3 mt-6">

                    <button
                        onClick={onClose}
                        className="border border-white/10 rounded-lg px-4 py-2"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSave}
                        className="border border-white rounded-lg px-4 py-2"
                    >
                        Save Key
                    </button>

                </div>

            </div>

        </div>
    );
}
