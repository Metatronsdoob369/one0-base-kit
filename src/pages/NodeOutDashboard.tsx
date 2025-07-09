// src/pages/NodeOutDashboard.tsx
import React from "react";
import { generateSpeech } from "@/lib/eleven";

export default function NodeOutDashboard() {
  function handleSpeak() {
    generateSpeech("The Node Out engine is online.")
      .then((url) => {
        const audio = new Audio(url);
        audio.play();
      })
      .catch((err) => console.error("Speech error:", err));
  }

  return (
    <div className="text-white p-8">
      <h1 className="text-4xl font-bold">NodeOut</h1>
      <button
        onClick={handleSpeak}
        className="bg-[#800020] text-white px-4 py-2 rounded-xl mt-6"
      >
        🎤 Activate Voice
      </button>
    </div>
  );
}

