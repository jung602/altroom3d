import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect, createContext, useContext } from "react";
import LoadingScreen from "@/src/components/ui/LoadingScreen";

// 전역 로딩 상태를 관리하기 위한 컨텍스트
export const LoadingContext = createContext<{
  startLoading: () => void;
  updateProgress: (progress: number) => void;
  isLoading: boolean;
}>({
  startLoading: () => {},
  updateProgress: () => {},
  isLoading: false
});

// 컨텍스트 훅
export const useLoading = () => useContext(LoadingContext);

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  // 로딩 시작
  const startLoading = () => {
    setIsLoading(true);
    setLoadingProgress(0);
  };
  
  // 로딩 진행률 업데이트
  const updateProgress = (progress: number) => {
    // 현재 값보다 높은 경우에만 업데이트 (로딩은 항상 앞으로만 진행)
    setLoadingProgress(prev => Math.max(prev, Math.min(progress, 100)));
    
    // 100%에 도달하면 로딩 완료 처리
    if (progress >= 100) {
      // 로딩이 100%에 도달한 후 약간의 지연시간을 두고 로딩 화면을 제거합니다
      setTimeout(() => {
        setIsLoading(false);
      }, 600);
    }
  };

  // 로딩 상태를 전역 상태로 관리
  useEffect(() => {
    // 로딩 상태 정보를 window 객체에 등록
    window.__LOADING__ = {
      start: startLoading,
      updateProgress: updateProgress
    };
    
    return () => {
      // 클린업 함수
      if (window.__LOADING__) {
        delete window.__LOADING__;
      }
    };
  }, []);

  return (
    <LoadingContext.Provider value={{ 
      startLoading, 
      updateProgress,
      isLoading
    }}>
      <LoadingScreen isLoading={isLoading} progress={loadingProgress} />
      <Component {...pageProps} />
    </LoadingContext.Provider>
  );
}

// 전역 타입 선언
declare global {
  interface Window {
    __LOADING__?: {
      start: () => void;
      updateProgress: (progress: number) => void;
    };
  }
}
