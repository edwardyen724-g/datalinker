import type { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';

interface AuthedRequest extends NextApiRequest {
  user?: { uid: string };
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

const templates = [
  {
    id: '1',
    name: 'Basic CRUD',
    description: 'A template for basic create, read, update, and delete operations.',
  },
  {
    id: '2',
    name: 'User Management',
    description: 'Manage user data with roles and permissions.',
  },
  {
    id: '3',
    name: 'Product Inventory',
    description: 'Track and manage product inventories efficiently.',
  },
  {
    id: '4',
    name: 'Order Processing',
    description: 'Facilitate the order processing flow for e-commerce.',
  },
];

const handler = async (req: AuthedRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    // Assuming user authentication is handled elsewhere, if needed
    const user = req.user;

    res.status(200).json(templates);
  } catch (err) {
    res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
};

export default handler;