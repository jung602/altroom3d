import { useState, useEffect, useCallback, useRef } from 'react';
import { useSpring } from '@react-spring/three';

/**
 * 브라우저 화면 크기에 따라 모델 크기를 조절하는 간단한 훅
 * 스프링 애니메이션을 적용하여 크기 변화를 부드럽게 처리
 * @returns 모델 스케일 및 위치에 대한 스프링 애니메이션 속성
 */
export function useModelScale() {
  // 뷰포트 너비만 필요하므로 최소한의 상태만 관리
  const [viewportWidth, setViewportWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  // 이전 값을 기억하기 위한 ref
  const prevScaleRef = useRef<number>(1.0);
  const prevOffsetRef = useRef<number>(0);

  // 리사이즈 이벤트 핸들러 - 간단하게 유지
  useEffect(() => {
    // 서버 사이드 렌더링 고려
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    // 리사이즈 이벤트 리스너 등록
    window.addEventListener('resize', handleResize, { passive: true });
    
    // 초기 사이즈 설정
    handleResize();
    
    // 정리 함수
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 화면 너비에 따른 스케일 팩터 계산
  const calculateScaleFactor = useCallback((): number => {
    // useResponsiveDevice.ts의 스케일 로직 참고
    if (viewportWidth > 1440) {
      return 0.9;      // 데스크탑 큰 화면 (1.2의 75%)
    } else if (viewportWidth > 1024) {
      return 0.79;     // 데스크탑 (1.05의 75%)
    } else if (viewportWidth > 768) {
      return 0.675;    // 태블릿 (0.9의 75%)
    } else if (viewportWidth > 480) {
      return 0.6;      // 큰 모바일 (0.8의 75%)
    } else {
      return 0.525;    // 작은 모바일 (0.7의 75%)
    }
  }, [viewportWidth]);

  // 화면 너비에 따른 Y축 위치 오프셋 계산
  const calculatePositionYOffset = useCallback((): number => {
    if (viewportWidth > 1440) return -0.3;    // 데스크탑 큰 화면
    if (viewportWidth > 1024) return -0.2;    // 데스크탑
    if (viewportWidth > 768) return -0.1;     // 태블릿
    if (viewportWidth > 480) return 0;        // 큰 모바일
    return 0;                                 // 작은 모바일
  }, [viewportWidth]);

  // 스프링 애니메이션 설정
  const [springProps, api] = useSpring(() => {
    // 초기 스케일값과 오프셋 계산
    const initialScale = calculateScaleFactor();
    const initialYOffset = calculatePositionYOffset();
    
    // 초기값 저장
    prevScaleRef.current = initialScale;
    prevOffsetRef.current = initialYOffset;
    
    return {
      scale: initialScale,
      yOffset: initialYOffset,
      config: {
        mass: 1,
        tension: 280,
        friction: 60,
        precision: 0.001
      },
      immediate: true // 첫 로드 시 즉시 적용
    };
  });

  // 뷰포트 크기가 변경될 때 스프링 애니메이션 업데이트
  useEffect(() => {
    const scaleFactor = calculateScaleFactor();
    const yOffset = calculatePositionYOffset();
    
    // 값이 변경된 경우에만 스프링 애니메이션 업데이트
    if (scaleFactor !== prevScaleRef.current || yOffset !== prevOffsetRef.current) {
      api.start({
        scale: scaleFactor,
        yOffset: yOffset,
        immediate: false // 값이 변경될 때는 애니메이션 적용
      });
      
      // 현재 값 기억
      prevScaleRef.current = scaleFactor;
      prevOffsetRef.current = yOffset;
    }
  }, [viewportWidth, api, calculateScaleFactor, calculatePositionYOffset]);

  // 스프링 애니메이션이 적용된 스케일 값 반환
  const getModelScale = useCallback((baseScale: number): number => {
    return baseScale * springProps.scale.get();
  }, [springProps.scale]);

  // 스프링 애니메이션이 적용된 위치 조정
  const adjustModelPosition = useCallback((basePosition: [number, number, number]): [number, number, number] => {
    return [
      basePosition[0],
      basePosition[1] + springProps.yOffset.get(),
      basePosition[2]
    ];
  }, [springProps.yOffset]);

  return {
    viewportWidth,
    getModelScale,
    adjustModelPosition,
    // 리액트 스프링 애니메이션 속성 직접 반환
    springProps
  };
} 