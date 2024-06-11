'use client';

import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Stats, useHelper } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { BlurPass, Resizer, KernelSize, Resolution } from 'postprocessing';
import { useMotionValue, useSpring } from 'framer-motion';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

import { Background } from './background';
import { Bed } from './bed';
import { Etc } from './etc';
import { Desk } from './desk';

import { useControls } from 'leva';  // Assuming you are using Leva for control

function Lights() {
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const directionalRefs = Array.from({ length: 3 }, () => useRef<THREE.DirectionalLight>(null!));
  const pointRefs = Array.from({ length: 2 }, () => useRef<THREE.PointLight>(null!));
  const spotRef = useRef<THREE.SpotLight>(null!);

  // Add helpers
  directionalRefs.forEach(ref => {
    useHelper(ref, THREE.DirectionalLightHelper, 5);
  });
  pointRefs.forEach(ref => {
    useHelper(ref, THREE.PointLightHelper, 1);
  });
  useHelper(spotRef, THREE.SpotLightHelper, 5);

  // Controls for Directional Lights
  directionalRefs.forEach((ref, i) => {
    useControls(`Directional Light ${i + 1}`, {
      visible: {
        value: false,
        onChange: (v: boolean) => {
          if (ref.current) ref.current.visible = v;
        },
      },
      position: {
        value: { x: 1, y: 1, z: 1 },
        onChange: (v: { x: number; y: number; z: number }) => {
          if (ref.current) ref.current.position.set(v.x, v.y, v.z);
        },
      },
      rotation: {
        value: { x: 0, y: 0, z: 0 },
        onChange: (v: { x: number; y: number; z: number }) => {
          if (ref.current) ref.current.rotation.set(v.x, v.y, v.z);
        },
      },
      color: {
        value: 'white',
        onChange: (v: string) => {
          if (ref.current) ref.current.color = new THREE.Color(v);
        },
      },
      intensity: {
        value: 1,
        onChange: (v: number) => {
          if (ref.current) ref.current.intensity = v;
        },
      },
    });
  });

  // Controls for Point Lights
  pointRefs.forEach((ref, i) => {
    useControls(`Point Light ${i + 1}`, {
      visible: {
        value: false,
        onChange: (v: boolean) => {
          if (ref.current) ref.current.visible = v;
        },
      },
      position: {
        value: { x: -1, y: 0.7, z: -0.5 },
        onChange: (v: { x: number; y: number; z: number }) => {
          if (ref.current) ref.current.position.set(v.x, v.y, v.z);
        },
      },
      color: {
        value: '#c47d00',
        onChange: (v: string) => {
          if (ref.current) ref.current.color = new THREE.Color(v);
        },
      },
      intensity: {
        value: 1,
        onChange: (v: number) => {
          if (ref.current) ref.current.intensity = v;
        },
      },
      size: {
        value: 1,
        min: 0.1,
        max: 10,
        step: 0.1,
        onChange: (v: number) => {
          if (ref.current) ref.current.scale.set(v, v, v);
        },
      },
    });
  });

  // Controls for Spot Light
  useControls('Spot Light 1', {
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
    rotation: {
      value: { x: 0, y: 0, z: 0 },
      onChange: (v: { x: number; y: number; z: number }) => {
        if (spotRef.current) spotRef.current.rotation.set(v.x, v.y, v.z);
      },
    },
    angle: {
      value: Math.PI / 4,
      min: 0,
      max: Math.PI,
      step: 0.01,
      onChange: (v: number) => {
        if (spotRef.current) spotRef.current.angle = v;
      },
    },
    color: {
      value: 'white',
      onChange: (v: string) => {
        if (spotRef.current) spotRef.current.color = new THREE.Color(v);
      },
    },
    intensity: {
      value: 1,
      onChange: (v: number) => {
        if (spotRef.current) spotRef.current.intensity = v;
      },
    },
  });

  return (
    <>
      <ambientLight ref={ambientRef} visible={false} />
      {directionalRefs.map((ref, i) => (
        <directionalLight key={`directional-${i}`} ref={ref} visible={false} />
      ))}
      {pointRefs.map((ref, i) => (
        <pointLight key={`point-${i}`} ref={ref} visible={false} />
      ))}
      <spotLight ref={spotRef} visible={false} />
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
