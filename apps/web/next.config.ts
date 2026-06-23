import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@frameitup/ui', '@frameitup/types', '@frameitup/utils'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.cloudflare.com' },
      { protocol: 'https', hostname: '**.r2.dev' },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    }
   }
};

export default nextConfig;
