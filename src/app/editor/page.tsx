import React from 'react';
import { useQuery } from 'react-query';
import { SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabaseClient';
import DynamicEditor from '@/components/DynamicEditor';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';

const supabase: SupabaseClient = createClient();

const EditorPage: React.FC = () => {
  const { data, error, isLoading } = useQuery('dataEntries', fetchDataEntries);

  async function fetchDataEntries() {
    try {
      const { data, error } = await supabase.from('data_entries').select('*');
      if (error) throw error;
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : String(err));
    }
  }

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Failed to load data entries." />;

  return (
    <div>
      <h1>Transform Your Data Management Experience with DataLinker!</h1>
      <DynamicEditor dataEntries={data} />
      <div>
        <h2>Streamline dynamic data management for low-code developers.</h2>
        <p>
          Use our visual editor to manage your data effortlessly:
        </p>
        <ul>
          <li>Dynamic value assignments to data fields</li>
          <li>Drag-and-drop interface for linking data</li>
          <li>Predefined templates for quick setup</li>
          <li>Real-time previews of data interactions</li>
          <li>Contextual help and tooltips for guidance</li>
        </ul>
      </div>
    </div>
  );
};

export default EditorPage;