'use client';

import React from 'react';
import { Model } from './Model';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';

export default function Scene() {
    return(
        <Canvas orthographic camera={{position: [0,0,200], zoom: 5}} style={{backgroundColor: "black"}}>
            <directionalLight intensity={3} position={[0, 3, 2]}/>
            <Environment preset='city' />
            <Model />
        </Canvas>
    );
}