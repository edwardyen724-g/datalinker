import React from 'react';
import { useQuery } from 'react-query';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { useAuth } from '../../context/authContext';
import { DynamicEditor } from '../../components/DynamicEditor';
import { Tooltips } from '../../components/Tooltips';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

const EditorPage: React.FC = () => {
  const { user } = useAuth();

  const { data: templates, error, isLoading } = useQuery('templates', async () => {
    if (!user) throw new Error("User not authenticated");
    const { data, error } = await supabase.from('templates').select('*');
    if (error) throw new Error(error.message);
    return data;
  });

  if (isLoading) return <div>Loading templates...</div>;
  if (error) return <div>Error: {error instanceof Error ? error.message : String(error)}</div>;

  return (
    <div className="editor-container">
      <h1>Transform Your Data Management Experience with DataLinker!</h1>
      <DynamicEditor templates={templates} />
      <Tooltips />
    </div>
  );
};

export default EditorPage;