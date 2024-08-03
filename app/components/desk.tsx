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
    Mesh007: THREE.Mesh
    Mesh007_1: THREE.Mesh
  }
  materials: {
    [key: string]: THREE.Material;
  };
}

export function Desk(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('./roomset/desk.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh007.geometry}
        material={materials['desk.001_Baked']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh007_1.geometry}
        material={materials.desk_Baked}
      />
    </group>
  )
}

useGLTF.preload('./roomset/desk.glb')