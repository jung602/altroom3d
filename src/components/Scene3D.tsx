import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Canvas, useLoader, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, Stats } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import * as THREE from 'three';

// 베이스 경로 설정
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

// 모델 파일 경로 배열
const MODEL_PATHS = [
  `${basePath}/models/compressed_alt1.glb`,
  `${basePath}/models/compressed_alt2.glb`,
  `${basePath}/models/compressed_alt3.glb`,
  `${basePath}/models/compressed_alt4.glb`,
  `${basePath}/models/compressed_alt5.glb`,
  `${basePath}/models/compressed_alt6.glb`,
  `${basePath}/models/compressed_alt7.glb`,
  `${basePath}/models/compressed_alt8.glb`,
  `${basePath}/models/compressed_alt9.glb`,
];

// 로딩 관리를 위한 컨텍스트
const LoadingContext = React.createContext<{
  setLoaded: (path: string) => void;
  totalModels: number;
}>({
  setLoaded: () => {},
  totalModels: MODEL_PATHS.length,
});

// 스크롤이 가능한 모델 그룹 컴포넌트
function ModelsWithScrollControls() {
  const groupRef = useRef<THREE.Group>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const { gl } = useThree();
  
  // 휠 이벤트 리스너 추가
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      
      // 스크롤 속도 조절 (음수를 곱해서 방향 반전)
      const scrollSpeed = 0.05;
      const newOffset = scrollOffset - event.deltaY * scrollSpeed;
      
      // 스크롤 범위 제한
      const minOffset = 0;
      const maxOffset = (MODEL_PATHS.length - 1) * 6;
      const clampedOffset = Math.max(Math.min(newOffset, maxOffset), minOffset);
      
      setScrollOffset(clampedOffset);
      console.log(`휠 이벤트: deltaY=${event.deltaY}, 오프셋=${clampedOffset}`);
    };
    
    // React Fiber 캔버스의 DOM 요소에 이벤트 리스너 추가
    const domElement = gl.domElement;
    domElement.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      domElement.removeEventListener('wheel', handleWheel);
    };
  }, [gl, scrollOffset]);
  
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
  
  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {MODEL_PATHS.map((path, index) => (
        <Model key={path} path={path} position={[0, -6 * index, 0]} />
      ))}
    </group>
  );
}

// 개별 모델 컴포넌트
function Model({ path, position }: { path: string; position: [number, number, number] }) {
  const { gl } = useThree();
  const { setLoaded } = React.useContext(LoadingContext);
  
  // GLTFLoader 설정
  const gltf = useLoader(
    GLTFLoader,
    path,
    (loader) => {
      // DRACO Loader 설정
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath(`${basePath}/draco/`);
      loader.setDRACOLoader(dracoLoader);
      
      // KTX2 Loader 설정
      const ktx2Loader = new KTX2Loader();
      ktx2Loader.setTranscoderPath(`${basePath}/basis/`);
      ktx2Loader.detectSupport(gl);
      loader.setKTX2Loader(ktx2Loader);
    }
  );
  
  // 모델 로드 완료 시 로딩 상태 업데이트
  useEffect(() => {
    if (gltf) {
      setLoaded(path);
    }
  }, [gltf, path, setLoaded]);
  
  return gltf ? <primitive object={gltf.scene} scale={.8} position={position} /> : null;
}

// 메인 Scene 컴포넌트
interface Scene3DProps {
  onLoadingComplete?: () => void;
  onLoadingProgress?: (progress: number) => void;
}

const Scene3D: React.FC<Scene3DProps> = ({ onLoadingComplete, onLoadingProgress }) => {
  const [loadedModels, setLoadedModels] = useState<Set<string>>(new Set());
  
  const setLoaded = useCallback((path: string) => {
    setLoadedModels(prev => {
      const newSet = new Set(prev);
      newSet.add(path);
      return newSet;
    });
  }, []);
  
  // 로딩 진행률 계산 및 콜백 처리
  useEffect(() => {
    const progress = Math.floor((loadedModels.size / MODEL_PATHS.length) * 100);
    
    if (onLoadingProgress) {
      onLoadingProgress(progress);
    }
    
    if (progress === 100 && onLoadingComplete) {
      onLoadingComplete();
    }
  }, [loadedModels.size, onLoadingComplete, onLoadingProgress]);
  
  return (
    <div className="w-full h-screen">
      <LoadingContext.Provider value={{ setLoaded, totalModels: MODEL_PATHS.length }}>
        <Canvas
          shadows
          camera={{ position: [5 * 29, 6.5 * 29, -10 * 29], fov: 1, far: 1000, near: 100, zoom: 1 }}
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
