import React, { useRef, useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF, GLTFLoader } from 'three-stdlib';
import * as THREE from 'three';


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
