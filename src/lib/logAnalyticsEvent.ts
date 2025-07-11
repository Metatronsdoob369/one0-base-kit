import { db } from '@/firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

/**
 * Logs an event to the Firestore 'analyticsEvents' collection.
 * Used to track user interactions like clicks, views, submissions, etc.
 *
 * @param type - A string describing the event type (e.g., 'product_click')
 * @param metadata - Optional object of additional context (e.g., { product: '10PicPush' })
 */
export const logAnalyticsEvent = async (
  type: string,
  metadata: Record<string, any> = {}
) => {
  try {
    await addDoc(collection(db, 'analyticsEvents'), {
      type,
      ...metadata,
      timestamp: serverTimestamp(),
    });
  } catch (err) {
    console.error('[Analytics Log Failed]', err);
  }
}; 