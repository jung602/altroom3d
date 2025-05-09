import type { NextConfig } from "next";

// 배포 환경에 따라 자동으로 basePath 설정
const isProd = process.env.NODE_ENV === 'production';
const isGithubPages = process.env.GITHUB_PAGES === 'true';
const basePath = isGithubPages ? '/altroom3d' : '';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  basePath: basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
  publicRuntimeConfig: {
    basePath: basePath
  },
  // 환경 변수를 클라이언트 측에서도 사용 가능하게 설정
  env: {
    NEXT_PUBLIC_BASE_URL: basePath,
    NEXT_PUBLIC_BASE_PATH: basePath
  }
};

export default nextConfig;
