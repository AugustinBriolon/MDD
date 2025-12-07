import { Canvas } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import type { Mesh } from 'three';

interface BarreProps {
  position: [number, number, number];
  width: number;
}

const Barre = ({ position, width }: BarreProps) => {
  const meshRef = useRef<Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);

  useGSAP(() => {
      if (isHovered && meshRef.current) {
        meshRef.current.rotation.y = 0;

        gsap.to(meshRef.current.rotation, {
          y: Math.PI * 2,
          duration: 0.8,
          ease: 'power4.out',
          onComplete: () => {
            setIsHovered(false);
          },
        });
      }
    },
    [isHovered]
  );

  const handlePointerEnter = () => {
    setIsHovered(true);
  };

  return (
    <mesh ref={meshRef} position={position} onPointerEnter={handlePointerEnter}>
      <boxGeometry args={[width, 4, width]} />
      <meshPhongMaterial color={isHovered ? '#333' : 'black'} />
    </mesh>
  );
};

const Hero = () => {
  return (
    <section className="h-screen w-full">
      <Canvas
        camera={{
          position: [0, 0, 15], // Position de la caméra (x, y, z)
          fov: 75, // Champ de vision (field of view)
          near: 0.1, // Plan proche
          far: 1000, // Plan lointain
        }}
      >
        {/* Lumière pour voir les objets */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        {Array.from({ length: 20 }).map((_, index) => {
          const spacing = 0.8;
          const totalWidth = (20 - 1) * spacing;
          const xPosition = index * spacing - totalWidth / 2;

          const widths = [
            0.2, 0.1, 0.6, 0.1, 0.6, 0.4, 0.2, 0.2, 0.2, 0.6, 0.3, 0.1, 0.6, 0.1, 0.6, 0.4, 0.2,
            0.2, 0.2, 0.6,
          ];
          const width = widths[index] || 0.1;

          return <Barre key={index} position={[xPosition, 2, 0]} width={width} />;
        })}
      </Canvas>
    </section>
  );
};

export default Hero;
