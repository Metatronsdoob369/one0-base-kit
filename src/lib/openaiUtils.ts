import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateChatCompletion(prompt: string, systemPrompt = 'You are a creative assistant.') {
  const chat = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt },
    ],
  });
  return JSON.parse(chat.choices[0].message?.content || '{}');
} 