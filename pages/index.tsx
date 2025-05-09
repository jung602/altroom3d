import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Nav } from '../src/ui/Nav';
import { useEffect } from 'react';

// React Three Fiber는 클라이언트 사이드에서만 렌더링되어야 하므로 dynamic import를 사용합니다
const Scene3D = dynamic(() => import('../src/components/Scene3D'), {
  ssr: false,
});

interface HomeProps {
  onLoadingProgress?: (progress: number) => void;
  onLoadingComplete?: () => void;
  isLoading?: boolean;
}

export default function Home({ onLoadingProgress, onLoadingComplete, isLoading }: HomeProps) {
  return (
    <main className="min-h-screen w-full fixed inset-0 flex flex-col items-center justify-center bg-black overflow-hidden relative">
      <div className='fixed top-3 left-3 mix-blend-difference text-slate-50 text-sm font-geist-sans z-[10000]'>
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/logowhite.png`}
          alt="Logo"
          width={54}
          height={54}
          priority
          className="w-auto h-[48px] cursor-pointer"
          onClick={() => window.location.reload()}
        />
      </div>

      <Nav />
      
      <div className="w-full h-screen absolute inset-0 bg-black">
        <Scene3D 
          onLoadingProgress={onLoadingProgress} 
          onLoadingComplete={onLoadingComplete}
        />
      </div>
    </main>
  );
}
