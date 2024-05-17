import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { Float } from '@react-three/drei';
import { GroupProps, useFrame, useThree } from '@react-three/fiber';
import { GLTF, GLTFLoader } from 'three-stdlib';
import * as THREE from 'three';
import { cos } from 'three/examples/jsm/nodes/Nodes.js';


type GLTFResult = GLTF & {
  nodes: {
    r1: THREE.Mesh;
    Object_10: THREE.Mesh;
    Object_12: THREE.Mesh;
    Object_14: THREE.Mesh;
    Object_16: THREE.Mesh;
    Object_18: THREE.Mesh;
    Object_20: THREE.Mesh;
    Object_24: THREE.Mesh;
    Object_26: THREE.Mesh;
    Object_28: THREE.Mesh;
    Object_30: THREE.Mesh;
    Object_32: THREE.Mesh;
    Object_35: THREE.Mesh;
    Object_38: THREE.Mesh;
    Object_40: THREE.Mesh;
    Object_42: THREE.Mesh;
    Object_44: THREE.Mesh;
    Object_46: THREE.Mesh;
    Object_48: THREE.Mesh;
    Object_50: THREE.Mesh;
    Object_52: THREE.Mesh;
    Object_54: THREE.Mesh;
    Object_56: THREE.Mesh;
    Object_58: THREE.Mesh;
    Object_60: THREE.Mesh;
    Object_62: THREE.Mesh;
    Object_64: THREE.Mesh;
    Object_66: THREE.Mesh;
    Object_68: THREE.Mesh;
    Object_70: THREE.Mesh;
    Object_72: THREE.Mesh;
    Object_75: THREE.Mesh;
    Object_8: THREE.Mesh;
  };
  materials: {
    [key: string]: THREE.Material;
  };
};

export function Model(props: GroupProps) {

  const mesh = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF('./medias/r1.gltf') as GLTFResult;
  const { viewport } = useThree();

  /** 
  useFrame(() => {
    if (mesh.current) { // null 체크
      mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y += 0.01;
    }
  }); */
  
  return (
    <Float>
      <group {...props} dispose={null} ref={mesh} scale={viewport.width/3.5}>
        <mesh castShadow receiveShadow geometry={nodes.r1.geometry} material={materials.Hard_Shiny_Plastic_Red_1}>
          <mesh castShadow receiveShadow geometry={nodes.Object_10.geometry} material={materials.Metal_Polished_Grey_1} />
          <mesh castShadow receiveShadow geometry={nodes.Object_12.geometry} material={materials.Glass_Solid_Black_1} position={[0, 0.001, 0]} />
          <mesh castShadow receiveShadow geometry={nodes.Object_14.geometry} material={materials.Hard_Shiny_Plastic_Red_1} />
          <mesh castShadow receiveShadow geometry={nodes.Object_16.geometry} material={materials.Hard_Shiny_Plastic_Red_1} />
          <mesh castShadow receiveShadow geometry={nodes.Object_18.geometry} material={materials.DefaultPlaster} />
          <mesh castShadow receiveShadow geometry={nodes.Object_20.geometry} material={materials.DefaultPlaster} />
          <mesh castShadow receiveShadow geometry={nodes.Object_24.geometry} material={materials.DefaultPlastic_1} />
          <mesh castShadow receiveShadow geometry={nodes.Object_26.geometry} material={materials.DefaultPlastic_1} />
          <mesh castShadow receiveShadow geometry={nodes.Object_28.geometry} material={materials.Glass_Basic_White_4} />
          <mesh castShadow receiveShadow geometry={nodes.Object_30.geometry} material={materials.Glass_Basic_White_4} />
          <mesh castShadow receiveShadow geometry={nodes.Object_32.geometry} material={materials.Emissive_Neutral_1} />
          <mesh castShadow receiveShadow geometry={nodes.Object_35.geometry} material={materials.Glass_Basic_White_4} />
          <mesh castShadow receiveShadow geometry={nodes.Object_38.geometry} material={materials.usbusb_metal} />
          <mesh castShadow receiveShadow geometry={nodes.Object_40.geometry} material={materials.usbusb_metal} />
          <mesh castShadow receiveShadow geometry={nodes.Object_42.geometry} material={materials.usbusb_metal} />
          <mesh castShadow receiveShadow geometry={nodes.Object_44.geometry} material={materials.usbusb_metal} />
          <mesh castShadow receiveShadow geometry={nodes.Object_46.geometry} material={materials.usbusb_metal} />
          <mesh castShadow receiveShadow geometry={nodes.Object_48.geometry} material={materials.usbusb_metal} />
          <mesh castShadow receiveShadow geometry={nodes.Object_50.geometry} material={materials.usbusb_metal} />
          <mesh castShadow receiveShadow geometry={nodes.Object_52.geometry} material={materials.usbusb_metal} />
          <mesh castShadow receiveShadow geometry={nodes.Object_54.geometry} material={materials.usbusb_metal} />
          <mesh castShadow receiveShadow geometry={nodes.Object_56.geometry} material={materials.usbusb_metal} />
          <mesh castShadow receiveShadow geometry={nodes.Object_58.geometry} material={materials.usbusb_metal} />
          <mesh castShadow receiveShadow geometry={nodes.Object_60.geometry} material={materials.usbusb_metal} />
          <mesh castShadow receiveShadow geometry={nodes.Object_62.geometry} material={materials.usbusb_metal} />
          <mesh castShadow receiveShadow geometry={nodes.Object_64.geometry} material={materials.usbusb_metal} />
          <mesh castShadow receiveShadow geometry={nodes.Object_66.geometry} material={materials.usbusb_metal} />
          <mesh castShadow receiveShadow geometry={nodes.Object_68.geometry} material={materials.usbusb_metal} />
          <mesh castShadow receiveShadow geometry={nodes.Object_70.geometry} material={materials.usbusb_metal} />
          <mesh castShadow receiveShadow geometry={nodes.Object_72.geometry} material={materials.usbusb_plastic} />
          <mesh castShadow receiveShadow geometry={nodes.Object_75.geometry} material={materials.Hard_Shiny_Plastic_Red_1} />
          <mesh castShadow receiveShadow geometry={nodes.Object_8.geometry} material={materials.Hard_Shiny_Plastic_Red_1} />
        </mesh>
      </group>
    </Float>
  );
}
