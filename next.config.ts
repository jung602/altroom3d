import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === 'production';
const repoName = 'alt3d'; // GitHub 리포지토리 이름 (필요시 변경)

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  basePath: isProduction ? `/${repoName}` : '',
  assetPrefix: isProduction ? `/${repoName}` : '',
  images: {
    unoptimized: true, // GitHub Pages에서는 이미지 최적화 서버가 없어서 필요
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isProduction ? `/${repoName}` : '',
  },
};

export default nextConfig;
