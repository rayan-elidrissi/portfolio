import type { NextConfig } from "next";

// Determine if we're in a GitHub Pages context
const isGitHubPages = process.env.GITHUB_ACTIONS || process.env.NODE_ENV === 'production';
const repoName = 'portfolio';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isGitHubPages ? `/${repoName}` : '',
  assetPrefix: isGitHubPages ? `/${repoName}/` : '',
  images: {
    unoptimized: true,
  },
  // This setting ensures GitHub Pages works properly with client-side routing
  trailingSlash: true,
};

export default nextConfig;
