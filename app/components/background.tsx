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
    Stick_Notes002: THREE.Mesh
    Stick_Notes002_1: THREE.Mesh
  }

  materials: {
    [key: string]: THREE.Material;
  };
}

export function Background(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('./roomset/background.glb') as GLTFResult;
  /** 
  const { viewport } = useThree();
  const scale = window.innerWidth <= 768 ? viewport.width / 5 : viewport.width / 5;
   scale={scale} dispose={null} rotation={[Math.PI / 6, -1, 0]}
  */

   return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Stick_Notes002.geometry}
        material={materials['Stick Notes 1_Baked.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Stick_Notes002_1.geometry}
        material={materials['glass.001']}
      />
    </group>
  )
}

useGLTF.preload('./roomset/background.glb')
