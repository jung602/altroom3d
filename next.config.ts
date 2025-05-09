import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '/altroom3d';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  basePath,
  assetPrefix: basePath,
};

export default nextConfig;
