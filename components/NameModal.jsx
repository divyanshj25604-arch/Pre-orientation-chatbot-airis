"use client";

import { useState } from "react";

export default function NameModal({ onUserCreated }) {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit() {
        if (!name.trim()) return;

        try {
            setLoading(true);

            await onUserCreated(name);
        } catch (err) {
            console.error(err);
            alert("Couldn't create user.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70">
            <div className="bg-zinc-900 p-6 rounded-xl w-96">
                <h2 className="text-2xl font-bold mb-4">
                    Welcome to AIRIS
                </h2>

                <input
                    className="w-full p-3 rounded bg-zinc-800 border border-zinc-700"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full mt-4 bg-white text-black p-3 rounded font-semibold"
                >
                    {loading ? "Creating..." : "Continue"}
                </button>
            </div>
        </div>
    );
}