import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';

interface UseScrollAnimationProps {
  totalModels: number;
  modelSpacing?: number;
  scrollSpeed?: number;
  onActiveIndexChange?: (index: number) => void;
}

export const useScrollAnimation = ({
  totalModels,
  modelSpacing = 6,
  scrollSpeed = 0.05,
  onActiveIndexChange
}: UseScrollAnimationProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const { gl } = useThree();
  
  // 휠 이벤트 리스너 추가
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      
      // 스크롤 속도 조절 (음수를 곱해서 방향 반전)
      const newOffset = scrollOffset - event.deltaY * scrollSpeed;
      
      // 스크롤 범위 제한
      const minOffset = 0;
      const maxOffset = (totalModels - 1) * modelSpacing;
      const clampedOffset = Math.max(Math.min(newOffset, maxOffset), minOffset);
      
      setScrollOffset(clampedOffset);
      
      // 현재 활성화된 모델 인덱스 계산
      const newActiveIndex = Math.round(clampedOffset / modelSpacing);
      setActiveIndex(newActiveIndex);
      
      if (onActiveIndexChange && newActiveIndex !== activeIndex) {
        onActiveIndexChange(newActiveIndex);
      }
    };
    
    // React Fiber 캔버스의 DOM 요소에 이벤트 리스너 추가
    const domElement = gl.domElement;
    domElement.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      domElement.removeEventListener('wheel', handleWheel);
    };
  }, [gl, scrollOffset, activeIndex, modelSpacing, onActiveIndexChange, scrollSpeed, totalModels]);
  
  // 모델 그룹 위치 업데이트
  useFrame(() => {
    if (groupRef.current) {
      // 부드러운 애니메이션으로 위치 업데이트
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        scrollOffset,
        0.1
      );
    }
  });

  return {
    groupRef,
    scrollOffset,
    activeIndex,
    setScrollOffset,
    setActiveIndex
  };
}; 