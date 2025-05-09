import { motion, AnimatePresence, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { useEffect, useState, useCallback, useRef } from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
  progress?: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading, progress }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [internalProgress, setInternalProgress] = useState(0);
  
  // 부드러운 애니메이션을 위한 motion value 설정
  const progressMotionValue = useMotionValue(0);
  const smoothProgress = useSpring(progressMotionValue, { 
    stiffness: 80, 
    damping: 20 
  });
  
  // 현재 표시되는 진행률 숫자
  const displayProgress = useTransform(smoothProgress, value => Math.round(value));
  const [displayNumber, setDisplayNumber] = useState(0);
  
  // 모션값 변경 시 표시 숫자 업데이트
  useEffect(() => {
    const unsubscribe = displayProgress.onChange(value => {
      setDisplayNumber(value);
    });
    
    return () => unsubscribe();
  }, [displayProgress]);

  // 클라이언트 측에서만 마운트 여부 설정
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 외부에서 전달된 progress가 있으면 그 값을 사용
  useEffect(() => {
    if (progress !== undefined) {
      setInternalProgress(progress);
      progressMotionValue.set(progress);
    }
  }, [progress, progressMotionValue]);

  // 로딩 진행률 업데이트 로직을 useCallback으로 최적화
  const updateProgress = useCallback(() => {
    // 외부에서 progress가 제공되지 않은 경우에만 자체적으로 진행률 업데이트
    if (progress === undefined && internalProgress < 100) {
      // 진행 속도를 비선형적으로 조절
      const increment = Math.max(1, Math.floor((100 - internalProgress) / 10));
      const newProgress = Math.min(internalProgress + increment, 100);
      setInternalProgress(newProgress);
      progressMotionValue.set(newProgress);
    }
  }, [internalProgress, progress, progressMotionValue]);

  useEffect(() => {
    if (isLoading && progress === undefined && internalProgress < 100) {
      // 리플로우 및 리페인트 최소화를 위해 requestAnimationFrame 사용
      const timer = setTimeout(() => {
        requestAnimationFrame(updateProgress);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isLoading, internalProgress, updateProgress, progress]);

  // 클라이언트 측에서만 렌더링
  if (!isMounted) return null;

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed top-0 left-0 w-screen h-[100dvh] z-[9999] overflow-hidden"
          initial={{ 
            backgroundColor: 'rgba(0, 0, 0, 1)',
            opacity: 1,
            backdropFilter: 'blur(8px)' 
          }}
          exit={{ 
            backgroundColor: 'rgba(0, 0, 0, 0)',
            opacity: 0,
            backdropFilter: 'blur(0px)',
            transition: {
              backgroundColor: {
                duration: 0.8,
                ease: "easeInOut",
              },
              opacity: {
                duration: 0.5,
                delay: 0.8,
                ease: "easeInOut"
              },
              backdropFilter: {
                duration: 0.8,
                ease: "easeInOut"
              }
            }
          }}
          style={{
            userSelect: 'none',
            // GPU 가속을 위한 속성 추가
            willChange: 'opacity, backdrop-filter',
            transform: 'translateZ(0)'
          }}
        >
          <motion.div 
            className="fixed bottom-3 right-4 mix-blend-difference"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.8
            }}
            style={{ 
              willChange: 'opacity',
              transform: 'translateZ(0)'
            }}
          >
            <motion.div
              className="text-slate-50 font-geist-sans text-[12rem] leading-[0.8] font-light tracking-tighter text-right"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5,
                type: 'spring',
                damping: 20,
                stiffness: 100
              }}
              style={{
                userSelect: 'none',
                willChange: 'transform, opacity',
                transform: 'translateZ(0)'
              }}
            >
              {displayNumber}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen; 