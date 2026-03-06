import { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';
import { getSession } from 'next-auth/react';

interface AuthedRequest extends NextApiRequest {
  user?: { email: string; id: string };
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

const rateLimitMap = new Map<string, number>();

const rateLimit = (req: NextApiRequest) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const currentTime = Date.now();
  const limitWindow = 1000 * 60; // 1 minute

  if (!rateLimitMap.has(ip as string)) {
    rateLimitMap.set(ip as string, currentTime);
    return true;
  }

  const lastAccessTime = rateLimitMap.get(ip as string) || 0;

  if (currentTime - lastAccessTime < limitWindow) {
    return false;
  }

  rateLimitMap.set(ip as string, currentTime);
  return true;
};

const handler = async (req: AuthedRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  if (!rateLimit(req)) {
    return res.status(429).json({ message: 'Too Many Requests' });
  }

  try {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { dataFields } = req.body;

    // Validate dataFields structure (simple validation)
    if (!dataFields || typeof dataFields !== 'object') {
      return res.status(400).json({ message: 'Invalid dataFields' });
    }

    // Assuming we have a `dataLinks` collection in Firestore
    const docRef = await admin.firestore().collection('dataLinks').add({
      userId: session.user.id,
      dataFields,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res.status(201).json({ id: docRef.id, message: 'Data linked successfully' });
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
};

export default handler;