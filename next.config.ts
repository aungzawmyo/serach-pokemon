import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static optimization with ISR support
  trailingSlash: false,
  
  // Optimize images
  images: {
    domains: ['raw.githubusercontent.com', 'assets.pokemon.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Enable compression
  compress: true,
  
  // Optimize for performance (removed problematic optimizeCss)
  experimental: {
    scrollRestoration: true,
  },
  
  // Configure caching headers for static assets
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
