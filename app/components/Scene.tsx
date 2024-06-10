'use client';

import React, { useEffect, useRef, MutableRefObject } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Stats, useHelper } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { BlurPass, Resizer, KernelSize, Resolution } from 'postprocessing';
import { useMotionValue, useSpring } from 'framer-motion';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

import { R1 } from './R1';
import { Omeko } from './Omeko';
import { Altroom } from './Altroom';
import { Background } from './background';
import { Bed } from './bed';
import { Etc } from './etc';
import { Desk } from './desk';

import { useControls } from 'leva';  // Assuming you are using Leva for control

function Lights() {
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const directionalRef = useRef<THREE.DirectionalLight>(null);
  const pointRef = useRef<THREE.PointLight>(null);
  const spotRef = useRef<THREE.SpotLight>(null);

  useControls('Ambient Light', {
    visible: {
      value: false,
      onChange: (v: boolean) => {
        if (ambientRef.current) ambientRef.current.visible = v;
      },
    },
    color: {
      value: 'white',
      onChange: (v: string) => {
        if (ambientRef.current) ambientRef.current.color = new THREE.Color(v);
      },
    },
  });

  useControls('Directional Light', {
    visible: {
      value: false,
      onChange: (v: boolean) => {
        if (directionalRef.current) directionalRef.current.visible = v;
      },
    },
    position: {
      value: { x: 1, y: 1, z: 1 },
      onChange: (v: { x: number; y: number; z: number }) => {
        if (directionalRef.current) directionalRef.current.position.set(v.x, v.y, v.z);
      },
    },
    color: {
      value: 'white',
      onChange: (v: string) => {
        if (directionalRef.current) directionalRef.current.color = new THREE.Color(v);
      },
    },
  });

  useControls('Point Light', {
    visible: {
      value: true,
      onChange: (v: boolean) => {
        if (pointRef.current) pointRef.current.visible = v;
      },
    },
    position: {
      value: { x: -1, y: 0.7, z: -0.5 },
      onChange: (v: { x: number; y: number; z: number }) => {
        if (pointRef.current) pointRef.current.position.set(v.x, v.y, v.z);
      },
    },
    color: {
      value: '#c47d00',
      onChange: (v: string) => {
        if (pointRef.current) pointRef.current.color = new THREE.Color(v);
      },
    },
  });

  useControls('Spot Light', {
    visible: {
      value: false,
      onChange: (v: boolean) => {
        if (spotRef.current) spotRef.current.visible = v;
      },
    },
    position: {
      value: { x: 3, y: 2.5, z: 1 },
      onChange: (v: { x: number; y: number; z: number }) => {
        if (spotRef.current) spotRef.current.position.set(v.x, v.y, v.z);
      },
    },
    color: {
      value: 'white',
      onChange: (v: string) => {
        if (spotRef.current) spotRef.current.color = new THREE.Color(v);
      },
    },
  });

  return (
    <>
      <ambientLight ref={ambientRef} />
      <directionalLight ref={directionalRef} />
      <pointLight ref={pointRef} />
      <spotLight ref={spotRef} />
    </>
  );
}

export default function Scene() {
  
  return (
    <Canvas orthographic camera={{ position: [45, 45, 45], zoom: 200 }} className="-z-0">
      <Lights />

      <Background />
      <Bed />
      <Etc />
      <Desk />

      <OrbitControls />
      <axesHelper args={[5]} />
      <gridHelper />
      <Stats />
    </Canvas>
  );
}
