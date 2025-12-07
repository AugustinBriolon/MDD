import { Canvas } from '@react-three/fiber';

const Hero = () => {
  return (
    <section className="h-screen w-full">
      <Canvas>
        {/* Lumière ambiante pour éclairer la scène */}
        <ambientLight intensity={0.5} />
        {/* Lumière directionnelle pour créer des ombres */}
        <directionalLight position={[10, 10, 5]} intensity={1} />

        {/* Premier cube - positionné à gauche */}
        <mesh position={[-3, 0, 0]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshPhongMaterial color="orange" />
        </mesh>

        {/* Deuxième cube - positionné à droite */}
        <mesh position={[3, 0, 0]}>
          <boxGeometry args={[1, 3, 2]} />
          <meshPhongMaterial color="blue" />
        </mesh>
      </Canvas>
    </section>
  );
};

export default Hero;
