import { useRef, useEffect, useState } from 'react'
import { extend } from '@react-three/fiber'
import * as THREE from 'three'
import { Reflector as ThreeReflector } from 'three/examples/jsm/objects/Reflector.js'
import { SceneConfig } from '../../types/scene';
import { FrontSide, Group, Mesh, Material } from 'three';

interface ReflectorProps {
  config: SceneConfig['reflector'];
  isCurrentModel?: boolean;
}

// 라운드 렉트 셰이프 생성 함수
const createRoundedRectShape = (width: number, height: number, radius: number) => {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;
  
  shape.moveTo(x, y + radius);
  shape.lineTo(x, y + height - radius);
  shape.quadraticCurveTo(x, y + height, x + radius, y + height);
  shape.lineTo(x + width - radius, y + height);
  shape.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
  shape.lineTo(x + width, y + radius);
  shape.quadraticCurveTo(x + width, y, x + width - radius, y);
  shape.lineTo(x + radius, y);
  shape.quadraticCurveTo(x, y, x, y + radius);
  
  return shape;
};

// 모바일 기기 감지 함수
const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

// Three.js 네임스페이스에 리플렉터 추가
extend({ ThreeReflector });

export const Reflector: React.FC<ReflectorProps> = ({ config, isCurrentModel = true }) => {
  const groupRef = useRef<Group>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // 컴포넌트 마운트 시 모바일 감지
  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);
  
  useEffect(() => {
    if (!groupRef.current || !config?.enabled || !isCurrentModel) return;
    
    // 기존 리플렉터 제거
    const existingReflectors = groupRef.current.children.filter(
      child => child.userData.isReflector || child.userData.isReflectorOverlay
    );
    existingReflectors.forEach(child => {
      groupRef.current?.remove(child);
      // 메쉬로 타입 단언하여 material과 geometry에 접근
      const mesh = child as Mesh;
      if (mesh.material) {
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m: Material) => m.dispose());
        } else {
          mesh.material.dispose();
        }
      }
      if (mesh.geometry) mesh.geometry.dispose();
    });
    
    // 새로운 리플렉터 생성
    config.items.forEach(item => {
      // 지오메트리 생성
      let geometry;
      if (item.radius && item.radius > 0) {
        const width = item.args?.[0] ?? 10;
        const height = item.args?.[1] ?? 10;
        geometry = new THREE.ShapeGeometry(createRoundedRectShape(width, height, item.radius));
      } else {
        geometry = new THREE.PlaneGeometry(item.args?.[0] ?? 10, item.args?.[1] ?? 10);
      }
      
      // 모바일에서는 해상도 512, 아니면 설정값 또는 2048 사용
      const resolution = isMobile ? 512 : (item.resolution ?? 2048);
      
      // 리플렉터 생성
      const reflector = new ThreeReflector(geometry, {
        clipBias: item.clipBias ?? 0.1,
        textureWidth: resolution,
        textureHeight: resolution,
        color: item.color ? new THREE.Color(item.color).getHex() : 0x202020
      });
      
      // 리플렉터 속성 설정
      reflector.position.set(
        item.position[0],
        item.position[1],
        item.position[2]
      );
      reflector.rotation.set(
        item.rotation[0],
        item.rotation[1],
        item.rotation[2]
      );
      
      reflector.userData.isReflector = true;
      
      // 그림자 비활성화
      reflector.castShadow = false;
      reflector.receiveShadow = false;
      
      // 재질 설정
      if (reflector.material) {
        if (Array.isArray(reflector.material)) {
          reflector.material.forEach(material => {
            material.transparent = true;
            material.opacity = 0.3;
          });
        } else {
          reflector.material.transparent = true;
          reflector.material.opacity = 0.3;
        }
      }
      
      // 그룹에 추가
      groupRef.current?.add(reflector);
      
      // 오버레이 생성
      if (item.overlayOpacity !== 0) {
        const clonedGeometry = geometry.clone();
        
        const overlayMaterial = new THREE.MeshBasicMaterial({
          color: 0x000000,
          transparent: true,
          opacity: item.overlayOpacity ?? 0.5,
          side: FrontSide
        });
        
        const overlay = new THREE.Mesh(clonedGeometry, overlayMaterial);
        
        const overlayOffsetX = item.overlayOffset?.[0] ?? 0;
        const overlayOffsetY = item.overlayOffset?.[1] ?? 0;
        const overlayOffsetZ = item.overlayOffset?.[2] ?? 0;
        
        const posX = item.position[0] + overlayOffsetX;
        const posY = item.position[1] + overlayOffsetY;
        const posZ = item.position[2] + overlayOffsetZ;
        
        overlay.position.set(posX, posY, posZ);
        
        overlay.rotation.set(
          item.rotation[0],
          item.rotation[1],
          item.rotation[2]
        );
        
        overlay.userData.isReflectorOverlay = true;
        
        overlay.castShadow = false;
        overlay.receiveShadow = false;
        
        groupRef.current?.add(overlay);
      }
    });
    
    // 정리 함수
    return () => {
      // 정리 코드가 필요하면 여기에 추가
    };
  }, [config, isCurrentModel, isMobile]);
  
  // 조건부 렌더링
  if (!isCurrentModel || !config?.enabled) return null;
  
  return <group ref={groupRef} />;
};

Reflector.displayName = 'Reflector'; 