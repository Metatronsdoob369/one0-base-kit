import { db } from '@/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import type { ReconstructedCore } from '@/types/reconstruction';
import { z } from 'zod';

const ReconstructedCoreSchema = z.object({
  coreId: z.string(),
  reconstruction_bundle: z.object({
    structure_skeleton: z.array(z.string()),
    tone_profile: z.string(),
    metaphor_engine: z.array(z.string()),
    prompt_fragments: z.record(z.string()),
    module_refs: z.array(z.string()),
  }),
  source_type: z.enum(['book', 'article', 'snapshot']),
  status: z.enum(['complete', 'pending']),
});

export const saveBundle = async (coreId: string, data: ReconstructedCore): Promise<void> => {
  try {
    await setDoc(doc(db, 'reconstructionBundles', coreId), data);
  } catch (error) {
    console.error('[Firestore Save Error]', error);
    throw error;
  }
};

export const fetchBundle = async (coreId: string): Promise<ReconstructedCore | null> => {
  try {
    const snapshot = await getDoc(doc(db, 'reconstructionBundles', coreId));
    const data = snapshot.data();
    if (data && ReconstructedCoreSchema.safeParse(data).success) {
      return data as ReconstructedCore;
    }
    return null;
  } catch (error) {
    console.error('[Firestore Fetch Error]', error);
    return null;
  }
}; 