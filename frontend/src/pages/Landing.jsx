import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import * as THREE from 'three';

const fileExtensions = [
  '.py', '.js', '.ipynb', '.ts', '.tsx', '.jsx', 
  '.java', '.c', '.cpp', '.go', '.rs', '.php', 
  '.rb', '.html', '.css', '.json', '.csv', '.sql', 
  '.env', '.yml', '.bash', '.sh', '.md', '.txt'
];

function FallingCube({ position, extension, mousePos }) {
  const meshRef = useRef();
  const [settled, setSettled] = useState(false);
  const initialY = position[1];
  const velocity = useRef(0);
  const targetX = useRef(position[0]);
  const targetZ = useRef(position[2]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    if (!settled) {
      velocity.current += -9.8 * delta * 0.3;
      meshRef.current.position.y += velocity.current * delta;

      if (meshRef.current.position.y <= -3) {
        meshRef.current.position.y = -3;
        setSettled(true);
        velocity.current = 0;
      }
    } else {
      // Subtle cursor interaction
      const dx = mousePos.x * 10 - meshRef.current.position.x;
      const dz = mousePos.y * 10 - meshRef.current.position.z;
      const distance = Math.sqrt(dx * dx + dz * dz);
      
      if (distance < 3) {
        const pushStrength = (3 - distance) / 3;
        targetX.current = position[0] - dx * pushStrength * 0.5;
        targetZ.current = position[2] - dz * pushStrength * 0.5;
      } else {
        targetX.current = position[0];
        targetZ.current = position[2];
      }

      meshRef.current.position.x += (targetX.current - meshRef.current.position.x) * 0.05;
      meshRef.current.position.z += (targetZ.current - meshRef.current.position.z) * 0.05;
    }

    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.3;
  });

  return (
    <group ref={meshRef} position={position}>
      <mesh castShadow>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial 
          color="#1a1a2e" 
          emissive="#FF79C6" 
          emissiveIntensity={0.2}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
      <Text
        position={[0, 0, 0.31]}
        fontSize={0.12}
        color="#EDEDED"
        anchorX="center"
        anchorY="middle"
      >
        {extension}
      </Text>
    </group>
  );
}

function Scene({ mousePos }) {
  const cubePositions = fileExtensions.map((_, i) => {
    const angle = (i / fileExtensions.length) * Math.PI * 2;
    const radius = 4 + Math.random() * 2;
    return [
      Math.cos(angle) * radius,
      10 + Math.random() * 15,
      Math.sin(angle) * radius
    ];
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.3} />
      
      {fileExtensions.map((ext, i) => (
        <FallingCube 
          key={ext} 
          position={cubePositions[i]} 
          extension={ext}
          mousePos={mousePos}
        />
      ))}
      
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#0D0D0D" transparent opacity={0.5} />
      </mesh>
    </>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#0D0D0D] overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0">
        <Canvas
          shadows
          camera={{ position: [0, 2, 12], fov: 50 }}
          style={{ background: '#0D0D0D' }}
        >
          <Suspense fallback={null}>
            <Scene mousePos={mousePos} />
          </Suspense>
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
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
          className="px-12 py-6 text-lg rounded-full transition-all duration-300 hover:shadow-2xl"
          style={{
            backgroundColor: '#EDEDED',
            color: '#0D0D0D',
            boxShadow: '0 0 30px rgba(237, 237, 237, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 50px rgba(237, 237, 237, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 0 30px rgba(237, 237, 237, 0.3)';
          }}
        >
          GET STARTED
        </Button>
      </div>
    </div>
  );
}