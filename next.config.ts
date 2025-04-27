import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.GITHUB_ACTIONS && '/portfolio',
  images: {
    unoptimized: true,
  },
  // This setting ensures GitHub Pages works properly with client-side routing
  trailingSlash: true,
};

export default nextConfig;
