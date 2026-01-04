import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

const fileExtensions = [
  '.py', '.js', '.ipynb', '.ts', '.tsx', '.jsx', 
  '.java', '.c', '.cpp', '.go', '.rs', '.php', 
  '.rb', '.html', '.css', '.json', '.csv', '.sql', 
  '.env', '.yml', '.bash', '.sh', '.md', '.txt'
];

function Falling3DCube({ extension, delay, shouldStay }) {
  const [position, setPosition] = useState({
    x: Math.random() * 90 + 5,
    y: -10,
    z: Math.random() * 200 - 100,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0
  });
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const fallDuration = 3000 + Math.random() * 2000;
    const groundY = shouldStay ? 75 : 85;
    
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setPosition(prev => {
          if (prev.y >= groundY && !settled) {
            setSettled(true);
            return { ...prev, y: groundY };
          }
          
          if (settled) {
            // Slow rotation when settled
            return {
              ...prev,
              rotateY: prev.rotateY + 0.5
            };
          }
          
          return {
            ...prev,
            y: prev.y + 1.5,
            rotateX: prev.rotateX + 5,
            rotateY: prev.rotateY + 4,
            rotateZ: prev.rotateZ + 3
          };
        });
      }, 30);
      
      return () => clearInterval(interval);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay, settled, shouldStay]);

  return (
    <div
      className=\"absolute\"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `
          translateZ(${position.z}px)
          translateX(-50%)
          rotateX(${position.rotateX}deg)
          rotateY(${position.rotateY}deg)
          rotateZ(${position.rotateZ}deg)
        `,
        transformStyle: 'preserve-3d',
        transition: settled ? 'transform 0.05s linear' : 'none'
      }}
    >
      <div
        className=\"relative\"
        style={{
          width: '60px',
          height: '60px',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Front face */}
        <div
          className=\"absolute flex items-center justify-center text-xs font-mono\"
          style={{
            width: '60px',
            height: '60px',
            backgroundColor: '#1a1a2e',
            border: '1px solid #FF79C6',
            boxShadow: '0 0 20px rgba(255, 121, 198, 0.4)',
            transform: 'translateZ(30px)',
            color: '#EDEDED'
          }}
        >
          {extension}
        </div>
        {/* Back face */}
        <div
          className=\"absolute\"
          style={{
            width: '60px',
            height: '60px',
            backgroundColor: '#1a1a2e',
            border: '1px solid #FF79C6',
            transform: 'translateZ(-30px) rotateY(180deg)'
          }}
        />
        {/* Right face */}
        <div
          className=\"absolute\"
          style={{
            width: '60px',
            height: '60px',
            backgroundColor: '#161626',
            border: '1px solid #8BE9FD',
            transform: 'rotateY(90deg) translateZ(30px)'
          }}
        />
        {/* Left face */}
        <div
          className=\"absolute\"
          style={{
            width: '60px',
            height: '60px',
            backgroundColor: '#161626',
            border: '1px solid #8BE9FD',
            transform: 'rotateY(-90deg) translateZ(30px)'
          }}
        />
        {/* Top face */}
        <div
          className=\"absolute\"
          style={{
            width: '60px',
            height: '60px',
            backgroundColor: '#1f1f3e',
            border: '1px solid #50FA7B',
            transform: 'rotateX(90deg) translateZ(30px)'
          }}
        />
        {/* Bottom face */}
        <div
          className=\"absolute\"
          style={{
            width: '60px',
            height: '60px',
            backgroundColor: '#1f1f3e',
            border: '1px solid #50FA7B',
            transform: 'rotateX(-90deg) translateZ(30px)'
          }}
        />
      </div>
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className=\"relative w-full h-screen bg-[#0D0D0D] overflow-hidden\">
      {/* 3D Scene Container */}
      <div 
        className=\"absolute inset-0\"
        style={{
          perspective: '1200px',
          perspectiveOrigin: '50% 50%'
        }}
      >
        {fileExtensions.map((ext, i) => (
          <Falling3DCube 
            key={ext} 
            extension={ext} 
            delay={i * 100}
            shouldStay={i % 4 === 0}
          />
        ))}
      </div>

      {/* Ground plane */}
      <div
        className=\"absolute bottom-0 left-0 right-0\"
        style={{
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(139, 233, 253, 0.3), transparent)'
        }}
      />

      {/* Content Overlay */}
      <div className=\"relative z-10 flex flex-col items-center justify-center h-full pointer-events-none\">
        <h1 
          className=\"text-8xl font-bold mb-6 tracking-wider\"
          style={{ 
            color: '#BD93F9',
            textShadow: '0 0 30px rgba(189, 147, 249, 0.6)'
          }}
        >
          HENU PS
        </h1>
        <p 
          className=\"text-2xl mb-12 font-light tracking-wide\"
          style={{ color: '#FFB86C' }}
        >
          A premium IDE experience for the modern developer
        </p>
        <Button
          onClick={() => navigate('/ide')}
          className=\"px-12 py-6 text-lg rounded-full transition-all duration-300 hover:shadow-2xl pointer-events-auto\"
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