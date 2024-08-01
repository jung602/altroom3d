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
    Plane007: THREE.Mesh
    Plane007_1: THREE.Mesh
    Plane007_2: THREE.Mesh
    Plane007_3: THREE.Mesh
    Plane007_4: THREE.Mesh
    Plane007_5: THREE.Mesh
  }
  materials: {
    [key: string]: THREE.Material;
  };
}

export function Bed(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('./roomset/bed.glb') as GLTFResult;
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
        geometry={nodes.Plane007.geometry}
        material={materials['bed_Baked.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane007_1.geometry}
        material={materials['tekla_fabrics_bed1_012.002_Baked']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane007_2.geometry}
        material={materials['tekla_fabrics_bed1_012.003_Baked.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane007_3.geometry}
        material={materials['Cylinder.002_Baked']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane007_4.geometry}
        material={materials['bedLight_Baked.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane007_5.geometry}
        material={materials['Linen.012_Baked']}
      />
    </group>
  )
}

useGLTF.preload('/bed.glb')
