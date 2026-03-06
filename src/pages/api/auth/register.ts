import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

interface AuthedRequest extends NextApiRequest {
  // Define any custom properties for request here
}

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default async function register(req: AuthedRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  try {
    const { user, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Send a verification email or handle post-registration logic if necessary

    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
}