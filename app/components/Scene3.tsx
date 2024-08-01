'use client';

import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Stats, useHelper } from '@react-three/drei';
import { SSAO, ToneMapping, Bloom } from '@react-three/postprocessing';
import { BlurPass, Resizer, BlendFunction, KernelSize, Resolution } from 'postprocessing';
import { EffectComposer as BaseEffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three';

import { Background } from './background';
import { Bed } from './bed';
import { Desk } from './desk';

import { useControls } from 'leva';  // Assuming you are using Leva for control


interface ExtendedEffectComposerProps extends React.ComponentProps<typeof BaseEffectComposer> {
  smaa?: boolean;
}

const EffectComposer: React.FC<ExtendedEffectComposerProps> = (props) => {
  // Here you can handle the smaa prop as needed, possibly passing it to a custom effect or shader
  return <BaseEffectComposer {...props} />;
};



export default function Scene3() {
  return (
    <Canvas orthographic camera={{ position: [45, 45, 45], zoom: 200 }} className="-z-0">

      <Background />
      <Bed />
      <Desk />

      <OrbitControls />

    </Canvas>
  );
}
