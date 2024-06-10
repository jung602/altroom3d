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
    bedtable: THREE.Mesh
    bed: THREE.Mesh
    BezierCurve: THREE.Mesh
    tekla_fabrics_bed1_012014: THREE.Mesh
    tekla_fabrics_bed1_012012: THREE.Mesh
    tekla_fabrics_bed1_012003: THREE.Mesh
    tekla_fabrics_bed1_012001: THREE.Mesh
    matrix: THREE.Mesh
    Circle: THREE.Mesh
    bedlight001: THREE.Mesh
    tekla_fabrics_bed1_012004: THREE.Mesh
  }
  materials: {
    [key: string]: THREE.Material;
  };
}

export function Bed(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('./roomset/bed.gltf') as GLTFResult;
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
      geometry={nodes.bedtable.geometry}
      material={materials['Procedural Wood Texture 01.005']}
    />
    <mesh castShadow receiveShadow geometry={nodes.bed.geometry} material={materials.bedframe} />
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.BezierCurve.geometry}
      material={materials.yellowPlastic}
    />
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.tekla_fabrics_bed1_012014.geometry}
      material={materials['Pillows.003']}
    />
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.tekla_fabrics_bed1_012012.geometry}
      material={materials['Pillows.003']}
    />
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.tekla_fabrics_bed1_012003.geometry}
      material={materials['Pillows.013']}
    />
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.tekla_fabrics_bed1_012001.geometry}
      material={materials['Pillows.013']}
    />
    <mesh castShadow receiveShadow geometry={nodes.matrix.geometry} material={materials.Sheet} />
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Circle.geometry}
      material={materials.yellowPlastic}
    />
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.bedlight001.geometry}
      material={materials.Lightbulb}
    />
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.tekla_fabrics_bed1_012004.geometry}
      material={materials.blackBlanket}
    />
  </group>
)
}

useGLTF.preload('/bed.gltf')