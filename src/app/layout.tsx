import React from 'react';
import './globals.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SupabaseProvider } from '../context/supabaseProvider';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const queryClient = new QueryClient();

export const metadata = {
  title: 'DataLinker',
  description: 'Streamline dynamic data management for low-code developers.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SupabaseProvider>
          <QueryClientProvider client={queryClient}>
            <Header />
            <main>{children}</main>
            <Footer />
          </QueryClientProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}