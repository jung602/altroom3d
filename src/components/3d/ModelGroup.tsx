import React, { useEffect, useRef } from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import * as THREE from 'three';
import { scenesData } from '../../../data/scenes';
import { SceneConfig } from '../../../types/scene';
import { Reflector } from './Reflector';

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

const ModelGroup: React.FC<ModelGroupProps> = ({ modelPath, sceneId, position, isActive, onLoaded }) => {
  const { gl } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  
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
  
  return (
    <group 
      position={position}
      ref={groupRef}
    >
      {/* 모델과 리플렉터를 함께 그룹화 */}
      <group
        scale={modelConfig.scale}
        position={modelConfig.position}
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
      </group>
    </group>
  );
};

export default ModelGroup; 