"use client";

import { useEffect, useState } from "react";
import NameModal from "@/components/NameModal";

export default function Home() {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const uuid = localStorage.getItem("uuid");

    if (!uuid) {
      setShowModal(true);
    }
  }, []);

  return (
    <>
      {showModal && (
        <NameModal
          onUserCreated={(user) => {
            setUser(user);
            setShowModal(false);
          }}
        />
      )}

      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-5xl font-bold">
          AIRIS Prompt Lab
        </h1>
      </main>
    </>
  );
}