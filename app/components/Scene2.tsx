'use client';

import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { SSAO, ToneMapping, Bloom, EffectComposer } from '@react-three/postprocessing';

import { Room } from './Room'

export default function Scene2() {
  return (
    <Canvas orthographic camera={{ position: [0, 0, 45], zoom: 200 }} className="-z-0">

      <Room />

      <directionalLight
      position={[0, 1, 5]} 
      intensity={0.3} 
      color={'#ffffff'}
      />

      <directionalLight
      position={[3, 1, 0]} 
      intensity={1.5} 
      color={'#ffffff'}
      />

      <directionalLight
      position={[0, 6, -5]} 
      intensity={2} 
      color={'#7968e7'}
      />


      <EffectComposer>
            <Bloom 
                intensity={0.03} // The bloom intensity.
            />      
      </EffectComposer>
  </Canvas>
  );
}