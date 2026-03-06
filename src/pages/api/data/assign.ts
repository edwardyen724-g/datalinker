import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { firestore } from 'firebase-admin/firestore';

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT as string);

initializeApp({
  credential: cert(serviceAccount),
});

interface AuthedRequest extends NextApiRequest {
  user?: { uid: string };
}

const db = firestore();

export default async function handler(req: AuthedRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const auth = getAuth();
    const token = req.headers.authorization?.split('Bearer ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const decodedToken = await auth.verifyIdToken(token);
    req.user = { uid: decodedToken.uid };

    const { dataField, dataValue } = req.body;

    if (!dataField || !dataValue) {
      return res.status(400).json({ error: 'Data field and value are required' });
    }

    const result = await db.collection('dataAssignments').add({
      userId: req.user.uid,
      dataField,
      dataValue,
      createdAt: new Date(),
    });

    return res.status(201).json({ id: result.id, message: 'Data assignment created successfully' });
  } catch (err) {
    return res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
}