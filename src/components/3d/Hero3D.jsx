import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Box, Torus, OrbitControls } from '@react-three/drei';

function FloatingShape({ position, color, shape = 'sphere', speed = 1, scale = 0.5 }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
    }
  });

  const Shape = shape === 'box' ? Box : shape === 'torus' ? Torus : Sphere;
  const args = shape === 'box' ? [1, 1, 1] : shape === 'torus' ? [0.8, 0.3, 16, 32] : [1, 32, 32];

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Shape ref={meshRef} position={position} args={args} scale={scale}>
        <MeshDistortMaterial
          color={color}
          speed={2}
          distort={0.3}
          radius={1}
          transparent
          opacity={0.8}
        />
      </Shape>
    </Float>
  );
}

function FloatingElements() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Primary sphere - represents core */}
      <FloatingShape position={[0, 0, 0]} color="#4070F4" shape="sphere" speed={0.5} scale={0.8} />

      {/* Orbiting elements */}
      <FloatingShape position={[2, 1, -1]} color="#71B9EA" shape="box" speed={1.2} scale={0.4} />
      <FloatingShape position={[-2, -0.5, 0.5]} color="#EA9D7D" shape="torus" speed={0.8} scale={0.5} />
      <FloatingShape position={[1, -1.5, 1]} color="#4070F4" shape="box" speed={1} scale={0.3} />
      <FloatingShape position={[-1.5, 1.5, -0.5]} color="#333333" shape="sphere" speed={0.6} scale={0.35} />
    </group>
  );
}

export default function Hero3D({ className = '' }) {
  return (
    <div className={`w-full h-full min-h-[300px] md:min-h-[400px] ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4070F4" />

        <FloatingElements />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
