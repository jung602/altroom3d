import getConfig from 'next/config';

// Next.js 구성에서 basePath 가져오기
const { publicRuntimeConfig } = getConfig();
const configBasePath = publicRuntimeConfig?.basePath || process.env.NEXT_PUBLIC_BASE_URL || '';

/**
 * 에셋 경로를 호스팅 환경에 맞게 조정하는 함수
 * 배포 환경(GitHub Pages 등)과 개발 환경에서 모두 올바른 경로를 반환
 */
export function getAssetPath(path: string): string {
  // SSR 환경에서는 설정된 basePath 사용
  if (typeof window === 'undefined') {
    return `${configBasePath}${path.startsWith('/') ? path : `/${path}`}`;
  }

  // 클라이언트 사이드에서는 현재 URL을 기반으로 경로 감지
  try {
    const url = new URL(window.location.href);
    const pathSegments = url.pathname.split('/').filter(Boolean);
    
    // 배포 환경 감지 (GitHub Pages)
    if (url.hostname.includes('github.io') || url.hostname.includes('jung602.github.io')) {
      // altroom3d가 URL에 포함되어 있는지 확인
      if (pathSegments.includes('altroom3d')) {
        const basePathIndex = pathSegments.indexOf('altroom3d');
        // basePath 만들기: /altroom3d 또는 하위 경로 포함
        const detectedBasePath = '/' + pathSegments.slice(0, basePathIndex + 1).join('/');
        return `${detectedBasePath}${path.startsWith('/') ? path : `/${path}`}`;
      }
    }
    
    // 개발 환경 또는 다른 호스팅 환경
    return `${configBasePath}${path.startsWith('/') ? path : `/${path}`}`;
  } catch (error) {
    console.error('URL 처리 중 오류 발생:', error);
    // 오류 발생 시 기본 구성 사용
    return `${configBasePath}${path.startsWith('/') ? path : `/${path}`}`;
  }
} 