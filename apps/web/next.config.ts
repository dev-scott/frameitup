import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  transpilePackages: ['@frameitup/ui', '@frameitup/types', '@frameitup/utils'],
  serverExternalPackages: ['@prisma/client', '.prisma/client','@frameitup/database'],
  outputFileTracingRoot: path.join(__dirname, '../../'),
  outputFileTracingIncludes:{
    '/**':[
      '../../packages/database/node_modules/.prisma/client/**',
        '../../node_modules/.pnpm/@prisma+client*/node_modules/.prisma/client/**',
        '../../node_modules/.prisma/client/**',
    ]
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.cloudflare.com' },
      { protocol: 'https', hostname: '**.r2.dev' },
      { protocol:"https", hostname:"images.unsplash.com"}
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    }
  }
};

export default nextConfig;
