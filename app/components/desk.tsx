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
    Plane012: THREE.Mesh
    Plane012_1: THREE.Mesh
    Plane012_2: THREE.Mesh
    Plane012_3: THREE.Mesh
    Plane012_4: THREE.Mesh
    Plane012_5: THREE.Mesh
    Plane012_6: THREE.Mesh
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
        geometry={nodes.Plane012.geometry}
        material={materials.Trolli_Baked}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane012_1.geometry}
        material={materials['Desk_Baked.009']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane012_2.geometry}
        material={materials['Desk_Baked.008']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane012_3.geometry}
        material={materials.acc_Baked}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane012_4.geometry}
        material={materials.book001_Baked}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane012_5.geometry}
        material={materials['Cube.001_Baked_Baked.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane012_6.geometry}
        material={materials.Keyboard_Baked_Baked}
      />
    </group>
  )
}

useGLTF.preload('/desk.glb')