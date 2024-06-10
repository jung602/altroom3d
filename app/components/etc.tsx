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
    btrolli: THREE.Mesh
    imagetostl_mesh3002: THREE.Mesh
    imagetostl_mesh3001: THREE.Mesh
    car001: THREE.Mesh
    shelve: THREE.Mesh
    book001: THREE.Mesh
    haylight: THREE.Mesh
    cup: THREE.Mesh
    aesop_RIBB001: THREE.Mesh
    haylight001: THREE.Mesh
    haylight002: THREE.Mesh
    clock001: THREE.Mesh
    clock003: THREE.Mesh
  }
  materials: {
    [key: string]: THREE.Material;
  };
}

export function Etc(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('./roomset/etc.gltf') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.btrolli.geometry}
        material={materials.BtrolliBody}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.imagetostl_mesh3002.geometry}
        material={materials.BTrolli}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.imagetostl_mesh3001.geometry}
        material={materials.BTrolli}
      />
      <mesh castShadow receiveShadow geometry={nodes.car001.geometry} material={materials.sibal} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.shelve.geometry}
        material={materials.balckMetal}
      />
      <mesh castShadow receiveShadow geometry={nodes.book001.geometry} material={materials.Book} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.haylight.geometry}
        material={materials.whitePlastic}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cup.geometry}
        material={materials['Material_0.003']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.aesop_RIBB001.geometry}
        material={materials.Aesop}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.haylight001.geometry}
        material={materials.Haylight}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.haylight002.geometry}
        material={materials.haylight2}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.clock001.geometry}
        material={materials.glass2}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.clock003.geometry}
        material={materials['Material.045']}
      />
    </group>
  )
}

useGLTF.preload('/etc.gltf')