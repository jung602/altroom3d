'use client';

import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { BlurPass, Resizer, KernelSize, Resolution } from 'postprocessing'
import { useMotionValue, useSpring } from "framer-motion"


import { R1 } from './R1';
import { Omeko } from './Omeko';
import { Altroom } from './Altroom';

export default function Scene() {

    const mouse = {
        x: useMotionValue(0),
        y: useMotionValue(0)
      };
    
      const smoothMouse = {
        x: useSpring(mouse.x, {stiffness: 75, damping: 100, mass: 3}),
        y: useSpring(mouse.y, {stiffness: 75, damping: 100, mass: 3})
      };
    
      const manageMouse = (e: MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        const { clientX, clientY } = e;
        const x = clientX / innerWidth;
        const y = clientY / innerHeight;
        mouse.x.set(x);
        mouse.y.set(y);
      };
    
      useEffect( () => {
        window.addEventListener("mousemove", manageMouse)
        return () => window.removeEventListener("mousemove", manageMouse)
      }, [])


      /** 
            <directionalLight intensity={2} position={[-.5, 1, 1]}/>
            <R1 mouse={smoothMouse} />    
      */
    return(
        <Canvas orthographic camera={{position: [0,0,200], zoom: 5}} className="-z-0">
            <EffectComposer>
              <Bloom
                intensity={.3} // The bloom intensity.
                luminanceThreshold={.5} // luminance threshold. Raise this value to mask out darker elements in the scene.
                mipmapBlur
              />
            </EffectComposer>
            <Altroom/>
            <Environment environmentIntensity={1.2} preset='warehouse'/>

        </Canvas>
    );
}