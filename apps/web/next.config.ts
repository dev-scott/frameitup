import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  transpilePackages: ['@frameitup/ui', '@frameitup/types', '@frameitup/utils'],
  serverExternalPackages: ['@prisma/client', '.prisma/client','@frameitup/database'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.cloudflare.com' },
      { protocol: 'https', hostname: '**.r2.dev' },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    // outputFileTracingRoot: path.join(__dirname, '../../'),
    serverActions: {
      bodySizeLimit: '10mb',
    }
  }
};

export default nextConfig;
