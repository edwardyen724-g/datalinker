import React from 'react';
import { useQuery } from 'react-query';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

const fetchAccountDetails = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return data.user;
};

const AccountPage: React.FC = () => {
  const { data: user, error, isLoading } = useQuery('accountDetails', fetchAccountDetails);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error instanceof Error ? error.message : String(error)}</p>;

  return (
    <div>
      <h1>Transform Your Data Management Experience with DataLinker!</h1>
      <p>Welcome, {user?.email}!</p>
      <h2>Your Account</h2>
      <p>Manage your subscriptions, billing, and account settings.</p>
      <div>
        <Link href="/account/settings">Account Settings</Link>
      </div>
      <div>
        <Link href="/account/billing">Billing Information</Link>
      </div>
      <div>
        <Link href="/account/support">Support</Link>
      </div>
    </div>
  );
};

export default AccountPage;