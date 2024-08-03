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
    Stang_350003: THREE.Mesh
    Stang_350003_1: THREE.Mesh
  }
  materials: {
    [key: string]: THREE.Material;
  };
}

export function Etc(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('./roomset/etc.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Stang_350003.geometry}
        material={materials.etc_Baked}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Stang_350003_1.geometry}
        material={materials['etc.002_Baked']}
      />
    </group>
  )
}

useGLTF.preload('./roomset/etc.glb')
