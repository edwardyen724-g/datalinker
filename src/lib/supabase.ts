import { createClient } from '@supabase/supabase-js';
const supabase = createClient('your-supabase-url', 'your-supabase-anon-key');
export const SupabaseProvider = ({ children }) => <SupabaseContext.Provider value={supabase}>{children}</SupabaseContext.Provider>;
export const SupabaseContext = React.createContext(supabase);