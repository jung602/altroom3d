import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

const Scene = dynamic(() => import('./components/Scene'),{
  ssr: false
})

export default function Home() {
  return (
    <main className="relative h-[100dvh]" style={{cursor:"pointer"}}>
      <Scene />
    </main>
  );
}
