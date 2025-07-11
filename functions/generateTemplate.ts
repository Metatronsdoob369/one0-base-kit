import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { generateChatCompletion } from '../src/lib/openaiUtils';

admin.initializeApp();
const db = admin.firestore();

export const generateTemplate = functions.https.onRequest(async (req, res) => {
  const { coreId, title, sourceType } = req.body;
  const prompt = `You are a Creative Text Transformation Assistant... Book Title: ${title} Source Type: ${sourceType}`;

  try {
    const parsed = await generateChatCompletion(prompt, 'You are a creative assistant.');
    await db.collection('thoughtCores').doc(coreId).update({
      ...parsed,
      status: 'complete',
      updatedAt: new Date(),
    });
    res.status(200).json({ success: true, data: parsed });
  } catch (err: any) {
    console.error('[GPT Error]', err);
    res.status(500).json({ error: 'Template generation failed', message: err.message });
  }
}); 