import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import LoadingScreen from "@/src/components/ui/LoadingScreen";

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // 글로벌 로딩 상태 관리 함수들
  const handleLoadingProgress = (progress: number) => {
    setLoadingProgress(progress);
  };

  const handleLoadingComplete = () => {
    // 로딩이 100%에 도달한 후 약간의 지연시간을 두고 로딩 화면을 제거합니다
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  };

  // 로딩 상태를 전역 상태로 관리
  useEffect(() => {
    // 로딩 상태 정보를 window 객체에 등록
    window.__LOADING__ = {
      setProgress: handleLoadingProgress,
      complete: handleLoadingComplete
    };
    
    return () => {
      // 클린업 함수
      if (window.__LOADING__) {
        delete window.__LOADING__;
      }
    };
  }, []);

  return (
    <>
      <LoadingScreen isLoading={isLoading} progress={loadingProgress} />
      <Component 
        {...pageProps} 
        isLoading={isLoading}
        onLoadingProgress={handleLoadingProgress}
        onLoadingComplete={handleLoadingComplete}
      />
    </>
  );
}

// 전역 타입 선언
declare global {
  interface Window {
    __LOADING__?: {
      setProgress: (progress: number) => void;
      complete: () => void;
    };
  }
}
