import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Nav } from '../src/components/ui/Nav';
import { useLoading } from './_app';
import { getAssetPath } from '../src/utils/path';

const Scene3D = dynamic(() => import('../src/components/3d/Scene3D'), {
  ssr: false,
});

export default function Home() {
  const { updateProgress } = useLoading();
  
  // 3D 씬 로딩 진행 상황 처리 - 실제 로딩 진행률을 그대로 사용
  const handleScene3DProgress = (progress: number) => {
    updateProgress(progress);
  };

  return (
    <main className="min-h-screen w-full fixed inset-0 flex flex-col items-center justify-center bg-black overflow-hidden relative">
      <div className='fixed top-3 left-3 mix-blend-difference text-slate-50 text-sm font-geist-sans z-[10000]'>
        <Image
          src={getAssetPath('/logowhite.png')}
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
          onLoadingProgress={handleScene3DProgress}
          onLoadingComplete={() => updateProgress(100)}
        />
      </div>
    </main>
  );
}
