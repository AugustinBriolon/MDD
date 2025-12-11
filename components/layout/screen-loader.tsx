import { usePerformance } from '@/providers/performance.provider';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

const ScreenLoader = () => {
  const screenLoaderRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const counterContainerRef = useRef<HTMLDivElement>(null);
  const [counter, setCounter] = useState(0);
  const [counterComplete, setCounterComplete] = useState(false);
  const { isLoading } = usePerformance();
  const { contextSafe } = useGSAP();

  const barWidths = [
    0.12, 0.18, 0.15, 0.35, 0.12, 0.25, 0.15, 0.12, 0.18, 0.28, 0.12, 0.42, 0.15, 0.18, 0.22, 0.12,
    0.15, 0.38, 0.12, 0.25, 0.15, 0.18, 0.12, 0.32, 0.15, 0.12, 0.28, 0.15, 0.12, 0.35, 0.18, 0.12,
    0.25, 0.15, 0.12, 0.38, 0.15, 0.18, 0.12, 0.28,
  ];

  const hideAnimation = contextSafe(() => {
    gsap.to(screenLoaderRef.current, {
      opacity: 0,
      duration: 0.1,
      ease: 'power2.inOut',
      onComplete: () => {
        if (screenLoaderRef.current) {
          gsap.set(screenLoaderRef.current, { display: 'none' });
        }
      },
    });
  });

  const revealAnimation = contextSafe(() => {
    if (!screenLoaderRef.current) return;
    const codebars = screenLoaderRef.current.querySelectorAll('.codebar');

    gsap
      .timeline()
      .to(
        { value: 0 },
        {
          value: 100,
          duration: 2,
          ease: 'power2.inOut',
          onUpdate: function () {
            setCounter(Math.round(this.targets()[0].value));
          },
        },
      )
      .to(
        counterContainerRef.current,
        {
          left: `calc(100% - 28px)`,
          duration: 2,
          ease: 'power2.inOut',
        },
        '<',
      )
      .fromTo(
        backgroundRef.current,
        {
          scaleX: 1,
        },
        {
          scaleX: 0,
          duration: 2,
          ease: 'power2.inOut',
        },
        '<',
      )
      .to(counterRef.current, {
        delay: 0.5,
        yPercent: 100,
        duration: 1,
        ease: 'power4.inOut',
      })
      .to(
        codebars,
        {
          scaleY: 0,
          duration: 1,
          ease: 'power4.inOut',
          onComplete: () => {
            setCounterComplete(true);
          },
        },
        '<',
      );
  });

  useGSAP(() => {
    revealAnimation();
  }, []);

  useEffect(() => {
    if (counterComplete && !isLoading) {
      hideAnimation();
    }
  }, [counterComplete, isLoading]);

  return (
    <div
      ref={screenLoaderRef}
      className="fixed inset-0 z-99999 flex flex-col items-center justify-center bg-white"
    >
      <div className="relative flex flex-col items-start justify-center gap-6 pb-10">
        <div className="relative flex items-end justify-center gap-2">
          <div
            ref={backgroundRef}
            className="absolute inset-0 z-10 h-full w-full origin-right bg-white"
          />
          {barWidths.map((width, index) => (
            <div
              key={index}
              className="codebar h-32 origin-bottom bg-black"
              style={{
                width: `${width}rem`,
              }}
            />
          ))}
        </div>
        <div
          ref={counterContainerRef}
          className="absolute bottom-0 left-[0%] overflow-hidden text-xl font-bold text-black"
        >
          <span ref={counterRef} className="block">
            {counter}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ScreenLoader;
