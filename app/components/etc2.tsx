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
    Stick_Notes009: THREE.Mesh
    Stick_Notes009_1: THREE.Mesh
  }
  materials: {
    [key: string]: THREE.Material;
  };
}

export function Etc2(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('./roomset/etc2.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Stick_Notes009.geometry}
        material={materials['etc_Baked.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Stick_Notes009_1.geometry}
        material={materials['glass.001']}
      />
    </group>
  )
}

useGLTF.preload('./roomset/etc2.glb')
