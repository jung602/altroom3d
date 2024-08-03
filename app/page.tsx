import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Text from "./components/Text"

const Scene3 = dynamic(() => import('./components/Scene3'),{
  ssr: false
})

export default function Home() {
  return (
    <main className="relative h-[100dvh]" style={{cursor:"pointer"}}>
      <Scene3 />
    </main>
  );
}
