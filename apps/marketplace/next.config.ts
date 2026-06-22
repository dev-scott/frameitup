import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@frameitup/ui', '@frameitup/types', '@frameitup/utils'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.r2.dev' },
      { protocol: 'https', hostname: '**.cloudflare.com' },
    ],
  },
};

export default nextConfig;
