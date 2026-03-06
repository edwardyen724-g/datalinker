import React, { useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useQuery } from 'react-query';

const AccountPage: React.FC = () => {
  const supabase = useSupabaseClient();
  
  const { data: user, error, isLoading } = useQuery('user', async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw new Error(error.message);
    return data.user;
  });

  useEffect(() => {
    if (error) {
      console.error('Error fetching user data:', error);
    }
  }, [error]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user found. Please log in.</div>;
  }

  return (
    <div>
      <h1>Account Management</h1>
      <h2>Welcome, {user.email}</h2>
      <p>Transform Your Data Management Experience with DataLinker!</p>

      <section>
        <h3>Your Settings</h3>
        <p>Here you can manage your account settings.</p>
        {/* Additional account management features can be added here */}
      </section>
    </div>
  );
};

export default AccountPage;