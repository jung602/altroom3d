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
import { Etc } from './etc';
import { Etc2 } from './etc2';





export default function Scene3() {
  return (
<Canvas orthographic camera={{ position: [90, 90, 45], zoom: 200 }} className="-z-0">
  <group position={[0, -1.5, 0]}>
    <Background />
    <Bed />
    <Desk />
    <Etc />
    <Etc2 />
  </group>
  <OrbitControls />
</Canvas>
  );
}
