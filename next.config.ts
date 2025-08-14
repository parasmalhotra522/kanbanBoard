import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images: {
    domains: ['i.pravatar.cc'],
    // Or use the newer remotePatterns (Next.js 12.3+)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
