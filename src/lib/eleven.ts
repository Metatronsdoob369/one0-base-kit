// src/lib/eleven.ts
export async function generateSpeech(text: string, voiceId = "Rachel") {
  const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;

  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "xi-api-key": apiKey
    },
    body: JSON.stringify({
      text,
      model_id: "eleven_multilingual_v2",
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.5
      }
    })
  });

  if (!response.ok) {
    throw new Error("Failed to fetch speech audio");
  }

  const audioBlob = await response.blob();
  return URL.createObjectURL(audioBlob);
}
