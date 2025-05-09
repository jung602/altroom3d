import React, { useEffect, useRef } from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import * as THREE from 'three';
import { getAssetPath } from '../utils/path';
import { scenesData } from '../../data/scenes';
import { SceneConfig } from '../../types/scene';
import { Reflector } from './Reflector';

interface ModelGroupProps {
  modelPath: string;
  position: [number, number, number];
  isActive: boolean;
  onLoaded: (path: string) => void;
}

const ModelGroup: React.FC<ModelGroupProps> = ({ modelPath, position, isActive, onLoaded }) => {
  const { gl } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  
  // 파일 이름에서 모델 ID 추출 (예: compressed_alt1.glb -> 1)
  const modelId = modelPath.match(/compressed_alt(\d+)\.glb$/)?.[1];
  
  // 씬 데이터에서 현재 모델에 해당하는 설정 찾기
  const sceneConfig = scenesData.find((scene: SceneConfig) => scene.id === modelId);
  
  // GLTFLoader 설정
  const gltf = useLoader(
    GLTFLoader,
    getAssetPath(modelPath),
    (loader) => {
      // DRACO Loader 설정
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath(getAssetPath('/draco/'));
      loader.setDRACOLoader(dracoLoader);
      
      // KTX2 Loader 설정
      const ktx2Loader = new KTX2Loader();
      ktx2Loader.setTranscoderPath(getAssetPath('/basis/'));
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