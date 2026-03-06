import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

interface AuthedRequest extends NextApiRequest {
  user?: { id: string; email: string };
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const rateLimit = new Map<string, number>();

const rateLimitMiddleware = (req: NextApiRequest) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  if (!ip) return false;

  const limit = rateLimit.get(ip) || 0;
  if (limit >= 5) return false; // Limit to 5 requests

  rateLimit.set(ip, limit + 1);
  setTimeout(() => {
    rateLimit.set(ip, limit); // Reset after 10 minutes
  }, 10 * 60 * 1000);

  return true;
};

export default async function login(req: AuthedRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  if (!rateLimitMiddleware(req)) {
    return res.status(429).json({ message: 'Too Many Requests' });
  }

  const { email, password } = req.body;

  try {
    const { user, session, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ message: error.message });
    }

    return res.status(200).json({ user, session });
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
}