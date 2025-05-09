import React, { useEffect, useRef } from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import * as THREE from 'three';
import { scenesData } from '../../../data/scenes';
import { SceneConfig } from '../../../types/scene';
import { Reflector } from './Reflector';
import { useModelScale } from '../../hooks/useModelScale';
import { useSpring, animated } from '@react-spring/three';

// scenesData를 기반으로 모델 정보 생성
export const MODEL_DATA = scenesData.map(scene => ({
  id: scene.id,
  path: `/models/compressed_alt${scene.id}.glb`
}));

interface ModelGroupProps {
  modelPath: string;
  sceneId: string;
  position: [number, number, number];
  isActive: boolean;
  onLoaded: (path: string) => void;
}

// animated.group 타입 정의
const AnimatedGroup = animated('group');

const ModelGroup: React.FC<ModelGroupProps> = ({ modelPath, sceneId, position, isActive, onLoaded }) => {
  const { gl } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const modelScaler = useModelScale();
  
  // 씬 데이터에서 현재 모델에 해당하는 설정 찾기
  const sceneConfig = scenesData.find((scene: SceneConfig) => scene.id === sceneId);
  
  // 경로 생성 함수
  const getPath = (path: string) => {
    return `${process.env.NEXT_PUBLIC_BASE_PATH || './'}${path.startsWith('/') ? path.substring(1) : path}`;
  };
  
  // GLTFLoader 설정
  const gltf = useLoader(
    GLTFLoader,
    getPath(modelPath),
    (loader) => {
      // DRACO Loader 설정
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath(getPath('draco/'));
      loader.setDRACOLoader(dracoLoader);
      
      // KTX2 Loader 설정
      const ktx2Loader = new KTX2Loader();
      ktx2Loader.setTranscoderPath(getPath('basis/'));
      ktx2Loader.detectSupport(gl);
      loader.setKTX2Loader(ktx2Loader);
    }
  );
  
  // 모델 로드 완료 시 로딩 상태 업데이트
  useEffect(() => {
    if (gltf) {
      onLoaded(modelPath);
    }
  }, [gltf, modelPath, onLoaded]);
  
  // 모델이 로드되지 않았거나 씬 설정이 없으면 null 반환
  if (!gltf || !sceneConfig) return null;
  
  const modelConfig = sceneConfig.model;
  
  // 화면 크기에 따른 모델 스케일 및 위치 조정
  const adjustedScale = modelScaler.getModelScale(modelConfig.scale);
  const adjustedPosition = modelScaler.adjustModelPosition(modelConfig.position);
  
  // 스프링 애니메이션 값 추출
  const { scale } = modelScaler.springProps;
  
  return (
    <group 
      position={position}
      ref={groupRef}
    >
      {/* 모델과 리플렉터를 함께 그룹화 */}
      <AnimatedGroup
        scale={scale.to(s => modelConfig.scale * s)}  // 스프링 애니메이션 적용
        position={[adjustedPosition[0], adjustedPosition[1], adjustedPosition[2]]}
        rotation={new THREE.Euler(
          modelConfig.rotation[0],
          modelConfig.rotation[1],
          modelConfig.rotation[2]
        )}
      >
        {/* 모델 렌더링 */}
        <primitive object={gltf.scene} />
        
        {/* 리플렉터 렌더링 */}
        <Reflector config={sceneConfig.reflector} isCurrentModel={isActive} />
      </AnimatedGroup>
    </group>
  );
};

export default ModelGroup; 