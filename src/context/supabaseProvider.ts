import React, { createContext, useContext, ReactNode } from 'react';

interface SupabaseContextType {
  // Add types for the values you expect from Supabase
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);

export const SupabaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize your Supabase client here
  return <SupabaseContext.Provider value={{ /* values */ }}>{children}</SupabaseContext.Provider>;
};

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};