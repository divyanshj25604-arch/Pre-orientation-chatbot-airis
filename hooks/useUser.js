"use client";

import { useEffect, useState } from "react";

export function useUser() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUser();
    }, []);

    async function loadUser() {
        const uuid = localStorage.getItem("uuid");

        if (!uuid) {
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(`/api/user?uuid=${uuid}`);

            if (!res.ok) {
                localStorage.removeItem("uuid");
                setLoading(false);
                return;
            }

            const data = await res.json();

            setUser(data);
        } catch (err) {
            console.error(err);
        }

        setLoading(false);
    }

    async function createUser(name) {
        // Create User
        const userRes = await fetch("/api/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name }),
        });

        const user = await userRes.json();

        localStorage.setItem("uuid", user.uuid);
        localStorage.setItem("userName", data.name);

        // Create Conversation
        const conversationRes = await fetch("/api/conversation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                uuid: user.uuid,
            }),
        });

        const conversation = await conversationRes.json();

        localStorage.setItem(
            "conversationId",
            conversation.id
        );

        setUser(user);

        return user;
    }

    return {
        user,
        loading,
        createUser,
    };
}