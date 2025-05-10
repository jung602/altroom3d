import React, { useState, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stats } from '@react-three/drei';
import * as THREE from 'three';
import ModelGroup, { MODEL_DATA } from './ModelGroup';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

// 로딩 관리를 위한 컨텍스트
const LoadingContext = React.createContext<{
  setLoaded: (path: string) => void;
  totalModels: number;
}>({
  setLoaded: () => {},
  totalModels: MODEL_DATA.length,
});

// 스크롤이 가능한 모델 그룹 컴포넌트
function ModelsWithScrollControls() {
  const { setLoaded } = React.useContext(LoadingContext);
  
  // 커스텀 훅 사용
  const { groupRef, activeIndex } = useScrollAnimation({
    totalModels: MODEL_DATA.length,
    modelSpacing: 6
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {MODEL_DATA.map((model, index) => (
        <ModelGroup 
          key={model.id} 
          modelPath={model.path}
          sceneId={model.id}
          position={[0, -6 * index, 0]} 
          isActive={index === activeIndex}
          onLoaded={(loadedPath) => setLoaded(loadedPath)} 
        />
      ))}
    </group>
  );
}

// 메인 Scene 컴포넌트
interface Scene3DProps {
  onLoadingComplete?: () => void;
  onLoadingProgress?: (progress: number) => void;
}

const Scene3D: React.FC<Scene3DProps> = ({ onLoadingComplete, onLoadingProgress }) => {
  const [loadedModels, setLoadedModels] = useState<Set<string>>(new Set());
  const [isMounted, setIsMounted] = useState(false);
  
  // 클라이언트 사이드에서만 마운트 설정
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const setLoaded = useCallback((path: string) => {
    setLoadedModels(prev => {
      const newSet = new Set(prev);
      newSet.add(path);
      return newSet;
    });
  }, []);
  
  // 로딩 진행률 계산 및 콜백 처리
  useEffect(() => {
    const progress = Math.floor((loadedModels.size / MODEL_DATA.length) * 100);
    
    if (onLoadingProgress) {
      onLoadingProgress(progress);
    }
    
    if (progress === 100 && onLoadingComplete) {
      onLoadingComplete();
    }
  }, [loadedModels.size, onLoadingComplete, onLoadingProgress]);
  
  // 클라이언트 사이드에서만 렌더링
  if (!isMounted) return null;
  
  return (
    <div className="w-full h-screen">
      <LoadingContext.Provider value={{ setLoaded, totalModels: MODEL_DATA.length }}>
        <Canvas
          shadows
          camera={{ 
            position: [5 * 250, 6.5 * 250, -10 * 250], 
            fov: .1, 
            far: 10000, 
            near: 3000, 
            zoom: 1
          }}
          onCreated={({ gl }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.0;
          }}
        >
          <Stats />
          <ModelsWithScrollControls />
          <OrbitControls 
            autoRotate={true}
            autoRotateSpeed={0.1}
            enableZoom={false} 
            enablePan={false}
            enableRotate={true}
          />
        </Canvas>
      </LoadingContext.Provider>
    </div>
  );
};

export default Scene3D;
