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
    Trackpad: THREE.Mesh
    tablellight: THREE.Mesh
    chair: THREE.Mesh
    caffet: THREE.Mesh
    Keyboard: THREE.Mesh
    iMac_Silver: THREE.Mesh
    vitra: THREE.Mesh
    trashcan: THREE.Mesh
    desk: THREE.Mesh
    calender: THREE.Mesh
    scisors: THREE.Mesh
    pencil: THREE.Mesh
    Circle001: THREE.Mesh
    Circle001_1: THREE.Mesh
    Circle001_2: THREE.Mesh
    FbxMesh004: THREE.Mesh
  }
  materials: {
    [key: string]: THREE.Material;
  };
}

export function Desk(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('./roomset/desk.gltf') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Trackpad.geometry}
        material={materials.TrackPad}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tablellight.geometry}
        material={materials['head-tolomeo']}
      />
      <mesh castShadow receiveShadow geometry={nodes.chair.geometry} material={materials.chair} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.caffet.geometry}
        material={materials.carffet}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Keyboard.geometry}
        material={materials.Keyboard}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.iMac_Silver.geometry}
        material={materials.imac}
      />
      <mesh castShadow receiveShadow geometry={nodes.vitra.geometry} material={materials.toolbox} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.trashcan.geometry}
        material={materials.blakc}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.desk.geometry}
        material={materials.BenchAndTable}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.calender.geometry}
        material={materials.calender}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.scisors.geometry}
        material={materials['metal.002']}
      />
      <mesh castShadow receiveShadow geometry={nodes.pencil.geometry} material={materials.pen} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.FbxMesh004.geometry}
        material={materials.Stool}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle001.geometry}
        material={materials['Material.010']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle001_1.geometry}
        material={materials['Material.015']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle001_2.geometry}
        material={materials['Material.018']}
      />
    </group>
  )
}

useGLTF.preload('/desk.gltf')