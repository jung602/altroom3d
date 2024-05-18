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
    alt: THREE.Mesh
    Circle: THREE.Mesh
    Circle001: THREE.Mesh
    Circle003: THREE.Mesh
    Circle004: THREE.Mesh
    Circle005: THREE.Mesh
    Cube002: THREE.Mesh
    Cube005: THREE.Mesh
    Cube021: THREE.Mesh
    Cube151: THREE.Mesh
    Cube156: THREE.Mesh
    Cylinder002: THREE.Mesh
    Cylinder012: THREE.Mesh
    FbxMesh001: THREE.Mesh
    FbxMesh002: THREE.Mesh
    iMac_Silver: THREE.Mesh
    iMac_Silver001: THREE.Mesh
    iMac_Silver003: THREE.Mesh
    imagetostl_mesh3002: THREE.Mesh
    imagetostl_mesh3240: THREE.Mesh
    Keyboard: THREE.Mesh
    Linen012: THREE.Mesh
    Plane002: THREE.Mesh
    Plane009: THREE.Mesh
    Plane013: THREE.Mesh
    Plane040: THREE.Mesh
    SE_42009: THREE.Mesh
    tekla_fabrics_bed1_012001: THREE.Mesh
    tekla_fabrics_bed1_012002: THREE.Mesh
    tekla_fabrics_bed1_012003: THREE.Mesh
    tekla_fabrics_bed1_012012: THREE.Mesh
    tekla_fabrics_bed1_012014: THREE.Mesh
    ['tolomeo-table']: THREE.Mesh
    Trackpad: THREE.Mesh
    wall: THREE.Mesh
  }
  materials: {
    [key: string]: THREE.Material;
  };
}

export function Altroom(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('./medias/altroom.gltf') as GLTFResult;
  const { viewport } = useThree();
  const scale = window.innerWidth <= 768 ? viewport.width / 1.3 : viewport.width / 2.3;



  return (
    <Float>
    <group {...props} scale={scale} dispose={null} rotation={[Math.PI / 6, -1, 0]}>
      <group>
        <mesh castShadow receiveShadow geometry={nodes.alt.geometry} material={materials.floor}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle.geometry}
            material={materials.yellow}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle001.geometry}
            material={materials.glass}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle003.geometry}
            material={materials.black}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle004.geometry}
            material={materials.red}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle005.geometry}
            material={materials.yellow}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube002.geometry}
            material={materials.black2}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube005.geometry}
            material={materials['Material.043']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube021.geometry}
            material={materials.black2}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube151.geometry}
            material={materials.wood2}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube156.geometry}
            material={materials.wood}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder002.geometry}
            material={materials.yellow2}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder012.geometry}
            material={materials.black}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.FbxMesh001.geometry}
            material={materials.yellow}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.FbxMesh002.geometry}
            material={materials.black2}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.iMac_Silver.geometry}
            material={materials.imac}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.iMac_Silver001.geometry}
            material={materials.mac}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.iMac_Silver003.geometry}
            material={materials.black2}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.imagetostl_mesh3002.geometry}
            material={materials.grey}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.imagetostl_mesh3240.geometry}
            material={materials.black}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Keyboard.geometry}
            material={materials.mac}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Linen012.geometry}
            material={materials.white}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane002.geometry}
            material={materials.calender}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane009.geometry}
            material={materials.glass}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane013.geometry}
            material={materials.black}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane040.geometry}
            material={materials.blanket}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.SE_42009.geometry}
            material={materials.metal}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.tekla_fabrics_bed1_012001.geometry}
            material={materials.white}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.tekla_fabrics_bed1_012002.geometry}
            material={materials.black3}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.tekla_fabrics_bed1_012003.geometry}
            material={materials.white}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.tekla_fabrics_bed1_012012.geometry}
            material={materials.yellow}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.tekla_fabrics_bed1_012014.geometry}
            material={materials.yellow}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['tolomeo-table'].geometry}
            material={materials.metal}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Trackpad.geometry}
            material={materials.mac}
          />
          <mesh castShadow receiveShadow geometry={nodes.wall.geometry} material={materials.mac} />
        </mesh>
      </group>
    </group>
    </Float>
  )
}
