import React, { useRef, useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { Float } from '@react-three/drei';
import { GroupProps, useThree } from '@react-three/fiber';
import { GLTF, GLTFLoader } from 'three-stdlib';
import { Text } from "@react-three/drei";
import * as THREE from 'three';
import { MotionValue, useTransform } from 'framer-motion';
import { motion } from 'framer-motion-3d';

type GLTFResult = GLTF & {
  nodes: {
    curtain001: THREE.Mesh
    curtain: THREE.Mesh
    wall003: THREE.Mesh
    windowglass: THREE.Mesh
  }
  materials: {
    [key: string]: THREE.Material;
  };
}

export function Background(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('./roomset/background.gltf') as GLTFResult;
  /** 
  const { viewport } = useThree();
  const scale = window.innerWidth <= 768 ? viewport.width / 5 : viewport.width / 5;
   scale={scale} dispose={null} rotation={[Math.PI / 6, -1, 0]}
  */


  return (
    <group {...props}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.curtain001.geometry}
        material={materials.curtain}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.curtain.geometry}
        material={materials.curtain}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wall003.geometry}
        material={materials['Material.002']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.windowglass.geometry}
        material={materials['glass2.001']}
      />
    </group>
  )
}

useGLTF.preload('/background.gltf')
