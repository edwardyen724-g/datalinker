import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import nextTranslate from 'next-translate';

const { withSass } = require('@zeit/next-sass');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
  },
  images: {
    domains: ['your-image-domain.com'], // specify allowed image domains
  },
};

export default nextTranslate(withSass(nextConfig));