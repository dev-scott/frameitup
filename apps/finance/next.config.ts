import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@frameitup/ui', '@frameitup/types', '@frameitup/utils'],
};

export default nextConfig;
