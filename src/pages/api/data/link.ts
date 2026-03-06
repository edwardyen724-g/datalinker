import { NextApiRequest, NextApiResponse } from 'next';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { Firestore } from 'firebase-admin/firestore';

interface AuthedRequest extends NextApiRequest {
  user?: { uid: string };
}

const app = initializeApp({
  credential: process.env.GOOGLE_APPLICATION_CREDENTIALS ? cert(process.env.GOOGLE_APPLICATION_CREDENTIALS) : applicationDefault(),
});

const db: Firestore = getFirestore(app);

const linkData = async (req: AuthedRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { sourceId, targetId, linkType } = req.body;

    if (!sourceId || !targetId || !linkType) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const linkRef = await db.collection('dataLinks').add({
      sourceId,
      targetId,
      linkType,
      createdAt: new Date(),
    });

    return res.status(200).json({ message: 'Data linked successfully', linkId: linkRef.id });
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
};

export default linkData;