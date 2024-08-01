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
    Plane003: THREE.Mesh
    Plane003_1: THREE.Mesh
    Plane003_2: THREE.Mesh
    Plane003_3: THREE.Mesh
    Plane003_4: THREE.Mesh
    Plane003_5: THREE.Mesh
    Plane003_6: THREE.Mesh
    Plane003_7: THREE.Mesh
    Plane003_8: THREE.Mesh
    Plane003_9: THREE.Mesh
  }
  materials: {
    [key: string]: THREE.Material;
  };
}

export function Background(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('./roomset/room.glb') as GLTFResult;
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
        geometry={nodes.Plane003.geometry}
        material={materials['MergedBake_Baked.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane003_1.geometry}
        material={materials['Background_Baked.009']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane003_2.geometry}
        material={materials['Background_Baked.005']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane003_3.geometry}
        material={materials.Wall_Baked}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane003_4.geometry}
        material={materials['MergedBake_Baked.002']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane003_5.geometry}
        material={materials['Background_Baked.007']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane003_6.geometry}
        material={materials['Background_Baked.008']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane003_7.geometry}
        material={materials['Plane.011_Baked.002']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane003_8.geometry}
        material={materials['Cold Pressed Paper - 01.004']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane003_9.geometry}
        material={materials['Material.028']}
      />
    </group>
  )
}

useGLTF.preload('/room.glb')
