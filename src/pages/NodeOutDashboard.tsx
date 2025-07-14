// src/pages/NodeOutDashboard.tsx
import React from "react";
import { generateSpeech } from "@/lib/eleven";
import Auth from "@/components/Auth";

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
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">NodeOut</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Voice Engine</h2>
              <button
                onClick={handleSpeak}
                className="bg-[#800020] text-white px-6 py-3 rounded-xl hover:bg-[#600018] transition-colors"
              >
                🎤 Activate Voice
              </button>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Firebase Status</h2>
              <p className="text-green-400">✅ Connected to Firebase</p>
              <p className="text-sm text-gray-400 mt-2">
                Project: one0-base-kit
              </p>
            </div>
          </div>
          
          <div>
            <Auth />
          </div>
        </div>
      </div>
    </div>
  );
}

