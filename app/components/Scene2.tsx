'use client';

import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { SSAO, ToneMapping, Bloom, EffectComposer } from '@react-three/postprocessing';

import { Altroom } from './Altroom';

export default function Scene2() {
  return (
    <Canvas orthographic camera={{ position: [0, 0, 30], zoom: 200 }} className="-z-0">
      <ambientLight />
      <Altroom />
      <EffectComposer>
            <Bloom 
                intensity={0.03} // The bloom intensity.
            />      
      </EffectComposer>
  </Canvas>
  );
}
