import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

const fileExtensions = [
  '.py', '.js', '.ipynb', '.ts', '.tsx', '.jsx', 
  '.java', '.c', '.cpp', '.go', '.rs', '.php', 
  '.rb', '.html', '.css', '.json', '.csv', '.sql', 
  '.env', '.yml', '.bash', '.sh', '.md', '.txt'
];

function FallingCube({ position, extension, shouldStay }) {
  const meshRef = useRef();
  const groupRef = useRef();
  const [settled, setSettled] = useState(false);
  const velocity = useRef(0);
  const groundY = shouldStay ? -2 : -2.5;

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (!settled) {
      velocity.current += -9.8 * delta * 0.5;
      groupRef.current.position.y += velocity.current * delta;

      if (groupRef.current.position.y <= groundY) {
        groupRef.current.position.y = groundY;
        setSettled(true);
        velocity.current = 0;
      }
      
      groupRef.current.rotation.x += delta * 1.5;
      groupRef.current.rotation.y += delta * 1.2;
    } else {
      // Slight idle rotation when settled
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial 
          color="#1a1a2e" 
          emissive="#FF79C6" 
          emissiveIntensity={0.3}
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>
      <Text
        position={[0, 0, 0.41]}
        fontSize={0.15}
        color="#EDEDED"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff"
      >
        {extension}
      </Text>
    </group>
  );
}

function Scene() {
  const positions = fileExtensions.map((_, i) => {
    const angle = (i / fileExtensions.length) * Math.PI * 2;
    const radius = 5 + Math.random() * 3;
    return {
      pos: [
        Math.cos(angle) * radius,
        8 + Math.random() * 12,
        Math.sin(angle) * radius
      ],
      shouldStay: i % 3 === 0 // Every 3rd cube stays on ground
    };
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} castShadow />
      <pointLight position={[-10, 5, -10]} intensity={0.5} />
      <spotLight position={[0, 15, 0]} intensity={0.8} angle={0.6} penumbra={1} castShadow />
      
      {fileExtensions.map((ext, i) => (
        <FallingCube 
          key={ext} 
          position={positions[i].pos} 
          extension={ext}
          shouldStay={positions[i].shouldStay}
        />
      ))}
      
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial 
          color="#0D0D0D" 
          metalness={0.2}
          roughness={0.8}
        />
      </mesh>
    </>
  );
}

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen bg-[#0D0D0D] overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0">
        <Canvas
          shadows
          camera={{ position: [0, 3, 15], fov: 60 }}
          style={{ background: '#0D0D0D' }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full pointer-events-none">
        <h1 
          className="text-8xl font-bold mb-6 tracking-wider"
          style={{ 
            color: '#BD93F9',
            textShadow: '0 0 20px rgba(189, 147, 249, 0.5)'
          }}
        >
          HENU PS
        </h1>
        <p 
          className="text-2xl mb-12 font-light tracking-wide"
          style={{ color: '#FFB86C' }}
        >
          A premium IDE experience for the modern developer
        </p>
        <Button
          onClick={() => navigate('/ide')}
          className="px-12 py-6 text-lg rounded-full transition-all duration-300 hover:shadow-2xl pointer-events-auto"
          style={{
            backgroundColor: '#EDEDED',
            color: '#0D0D0D',
            boxShadow: '0 0 30px rgba(237, 237, 237, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 50px rgba(237, 237, 237, 0.6)';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 0 30px rgba(237, 237, 237, 0.3)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          GET STARTED
        </Button>
      </div>
    </div>
  );
}