import type { NextConfig } from "next";

/**
 * Deployed as a fully static export to GitHub Pages at
 * https://harshith029.github.io/Portfolio-v2/.
 * CI sets NEXT_PUBLIC_BASE_PATH=/Portfolio-v2; local dev serves from root.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
