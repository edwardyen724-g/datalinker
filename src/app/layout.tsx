import './globals.css';
import { Inter } from 'next/font/google';
import { SupabaseProvider } from '../lib/supabase';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'DataLinker',
  description: 'Streamline dynamic data management for low-code developers.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <SupabaseProvider>
          <main>{children}</main>
        </SupabaseProvider>
      </body>
    </html>
  );
}