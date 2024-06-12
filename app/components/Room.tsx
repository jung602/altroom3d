import React, { useRef, useEffect, useState } from 'react';
import { Float, OrbitControls } from '@react-three/drei';
import { GroupProps, useThree } from '@react-three/fiber';

import { Background } from './background';
import { Bed } from './bed';
import { Etc } from './etc';
import { Desk } from './desk';


export function Room(props: JSX.IntrinsicElements['group']) {
  const { viewport } = useThree();
  const scale = window.innerWidth <= 768 ? viewport.width / 5 : viewport.width / 6;

  return (
    <Float>
    <group {...props} scale={scale} dispose={null} position={[0, -1.5, 0]} rotation={[Math.PI / 6, -1, 0]}>

        <Background />
        <Bed />
        <Etc />
        <Desk />

        <OrbitControls />

    </group>
    </Float>
  )
}
