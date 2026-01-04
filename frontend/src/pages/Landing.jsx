import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

const fileExtensions = [
  '.py', '.js', '.ipynb', '.ts', '.tsx', '.jsx', 
  '.java', '.c', '.cpp', '.go', '.rs', '.php', 
  '.rb', '.html', '.css', '.json', '.csv', '.sql', 
  '.env', '.yml', '.bash', '.sh', '.md', '.txt',
  '.vue', '.svelte', '.go', '.dart', '.kt', '.swift',
  '.r', '.scala', '.pl', '.lua', '.elm', '.ex'
];

function ExtensionWall() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const rows = 12;
  const cols = 20;
  const totalExtensions = rows * cols;
  
  return (
    <div className="absolute inset-0 grid" style={{
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gridTemplateRows: `repeat(${rows}, 1fr)`,
      gap: '2px'
    }}>
      {Array.from({ length: totalExtensions }).map((_, index) => {
        const ext = fileExtensions[index % fileExtensions.length];
        const row = Math.floor(index / cols);
        const col = index % cols;
        
        const cellWidth = window.innerWidth / cols;
        const cellHeight = window.innerHeight / rows;
        const cellX = col * cellWidth + cellWidth / 2;
        const cellY = row * cellHeight + cellHeight / 2;
        
        const distance = Math.sqrt(
          Math.pow(mousePos.x - cellX, 2) + Math.pow(mousePos.y - cellY, 2)
        );
        
        const glowRadius = 150;
        const opacity = distance < glowRadius ? (1 - distance / glowRadius) * 0.9 : 0.05;
        const scale = distance < glowRadius ? 1 + (1 - distance / glowRadius) * 0.3 : 1;
        const glowIntensity = distance < glowRadius ? (1 - distance / glowRadius) : 0;
        
        return (
          <div
            key={index}
            className="flex items-center justify-center text-xs font-mono transition-all duration-200"
            style={{
              backgroundColor: '#0D0D0D',
              border: '1px solid rgba(255, 121, 198, 0.1)',
              color: `rgba(237, 237, 237, ${opacity})`,
              transform: `scale(${scale})`,
              boxShadow: glowIntensity > 0 
                ? `0 0 ${20 * glowIntensity}px rgba(255, 121, 198, ${0.6 * glowIntensity}), inset 0 0 ${30 * glowIntensity}px rgba(255, 121, 198, ${0.3 * glowIntensity})`
                : 'none'
            }}
          >
            {ext}
          </div>
        );
      })}
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen bg-[#0D0D0D] overflow-hidden">
      {/* Extension Wall Background */}
      <ExtensionWall />

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full pointer-events-none">
        <h1 
          className="text-8xl font-bold mb-6 tracking-wider"
          style={{ 
            color: '#BD93F9',
            textShadow: '0 0 30px rgba(189, 147, 249, 0.6)'
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
