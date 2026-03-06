import { NextApiRequest, NextApiResponse } from "next";
import { initializeApp, firestore } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

interface AuthedRequest extends NextApiRequest {
  user?: { uid: string }; // Placeholder for user authentication data
}

initializeApp({
  credential: process.env.FIREBASE_CREDENTIALS ? {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  } : undefined,
});

const db = getFirestore();

export default async function handler(req: AuthedRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const templatesSnapshot = await db.collection("templates").get();
    const templates = templatesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json(templates);
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
}