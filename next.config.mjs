import { defineConfig } from 'next';

export default defineConfig({
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  },
  images: {
    domains: ['example.com'], // replace with your image hosting domain
  },
  experimental: {
    appDir: true,
  },
});