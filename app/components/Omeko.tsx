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
      omeko: THREE.Mesh;
      Circle001: THREE.Mesh;
      Circle005: THREE.Mesh;
      Circle007: THREE.Mesh;
      Circle008: THREE.Mesh;
      Circle009: THREE.Mesh;
      Circle010: THREE.Mesh;
      Circle013: THREE.Mesh;
      Circle014: THREE.Mesh;
      Circle015: THREE.Mesh;
      Circle016: THREE.Mesh;
      Circle017: THREE.Mesh;
      Circle018: THREE.Mesh;
      Circle019: THREE.Mesh;
      Circle020: THREE.Mesh;
      Circle021: THREE.Mesh;
      Circle022: THREE.Mesh;
      Circle023: THREE.Mesh;
      Circle024: THREE.Mesh;
      Circle025: THREE.Mesh;
      Circle026: THREE.Mesh;
      Circle027: THREE.Mesh;
      Circle028: THREE.Mesh;
      Circle029: THREE.Mesh;
      Circle030: THREE.Mesh;
      Circle031: THREE.Mesh;
      Circle032: THREE.Mesh;
      Circle033: THREE.Mesh;
      Circle034: THREE.Mesh;
      Circle035: THREE.Mesh;
      Circle037: THREE.Mesh;
    };
    materials: {
        [key: string]: THREE.Material;
      };
  }

interface ModelProps extends GroupProps {
    mouse: {
      x: MotionValue<number>;
      y: MotionValue<number>;
    };
  }
  
  export function Omeko({ mouse, ...props }: ModelProps) {
    const mesh = useRef<THREE.Group>(null);
    const { nodes, materials } = useGLTF('./medias/omeko.gltf') as GLTFResult;
    const { viewport } = useThree();
    const multiplier = 0.1;
    const scale = window.innerWidth <= 768 ? viewport.width / 1 : viewport.width / 3;


    return (
      <Float>
        
      <group {...props} dispose={null} scale={scale} rotation={[Math.PI / -1.05, 3.3, -2.8]}>
        <Mesh node={nodes.omeko} material={materials['omeko metal2']} mouse={mouse} multiplier={multiplier}>
          <mesh geometry={nodes.Circle001.geometry} material={materials['omeko metal']} />
          <mesh geometry={nodes.Circle005.geometry} material={materials['omeko metal']} />
          <mesh geometry={nodes.Circle007.geometry} material={materials['omeko metal4']} />
          <mesh geometry={nodes.Circle008.geometry} material={materials.bulb} />
          <mesh geometry={nodes.Circle009.geometry} material={materials.Steel} />
          <mesh geometry={nodes.Circle010.geometry} material={materials['omeko metal3']} />
          <mesh geometry={nodes.Circle013.geometry} material={materials.black} />
          <mesh geometry={nodes.Circle014.geometry} material={materials['omeko metal']} />
          <mesh geometry={nodes.Circle015.geometry} material={materials['omeko metal2']} />
          <mesh geometry={nodes.Circle016.geometry} material={materials.white} />
          <mesh geometry={nodes.Circle017.geometry} material={materials['omeko logo']} />
          <mesh geometry={nodes.Circle018.geometry} material={materials['omeko metal']} />
          <mesh geometry={nodes.Circle019.geometry} material={materials['omeko metal']} />
          <mesh geometry={nodes.Circle020.geometry} material={materials['omeko metal']} />
          <mesh geometry={nodes.Circle021.geometry} material={materials['omeko metal']} />
          <mesh geometry={nodes.Circle022.geometry} material={materials['omeko metal4']} />
          <mesh geometry={nodes.Circle023.geometry} material={materials['omeko metal4']} />
          <mesh geometry={nodes.Circle024.geometry} material={materials['omeko metal4']} />
          <mesh geometry={nodes.Circle025.geometry} material={materials['omeko metal4']} />
          <mesh geometry={nodes.Circle026.geometry} material={materials['omeko metal4']} />
          <mesh geometry={nodes.Circle027.geometry} material={materials['omeko metal4']} />
          <mesh geometry={nodes.Circle028.geometry} material={materials['omeko metal4']} />
          <mesh geometry={nodes.Circle029.geometry} material={materials['omeko metal4']} />
          <mesh geometry={nodes.Circle030.geometry} material={materials['omeko metal4']} />
          <mesh geometry={nodes.Circle031.geometry} material={materials['omeko metal4']} />
          <mesh geometry={nodes.Circle032.geometry} material={materials.bulb} />
          <mesh geometry={nodes.Circle033.geometry} material={materials.Steel} />
          <mesh geometry={nodes.Circle034.geometry} material={materials.Steel} />
          <mesh geometry={nodes.Circle035.geometry} material={materials.black} />
          <mesh geometry={nodes.Circle037.geometry} material={materials.white} />
        </Mesh>
      </group>
      </Float>
    )
  }



interface MeshProps {
    node: THREE.Mesh;
    material: THREE.Material;
    mouse: {
      x: MotionValue<number>;
      y: MotionValue<number>;
    };
    position?: [number, number, number];
    multiplier?: number;
    children?: React.ReactNode;
  }
  
  const Mesh: React.FC<MeshProps> = ({ node, material, mouse, position, multiplier = 0.1, children }) => {
    const a = multiplier / 6;
    const rotationX = useTransform(mouse.x, [0, 1], [node.rotation.x - a, node.rotation.x + a]);
    const rotationY = useTransform(mouse.y, [0, 1], [node.rotation.y - a, node.rotation.y + a]);
    const positionX = useTransform(mouse.x, [0, 1], [
      position ? position[0] - multiplier * 2 : node.position.x - multiplier * 2,
      position ? position[0] + multiplier * 2 : node.position.x + multiplier * 2
    ]);
    const positionY = useTransform(mouse.y, [0, 0], [
      position ? position[1] + multiplier * 2 : node.position.y + multiplier * 2,
      position ? position[1] - multiplier * 2 : node.position.y - multiplier * 2
    ]);
  
    return (
        <motion.group
          castShadow
          receiveShadow
          position={position}
          rotation={node.rotation}
          scale={node.scale}
          rotation-x={rotationX}
          rotation-y={rotationY}
          position-x={positionX}
          position-y={positionY}
        >
          <mesh
            geometry={node.geometry}
            material={material}
          />
          {children}
        </motion.group>
    );
  };
  