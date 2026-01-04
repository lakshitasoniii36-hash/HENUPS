import React, { useState, useEffect, useRef } from 'react';
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
  const [smoothPos, setSmoothPos] = useState({ x: 0, y: 0 });
  const [isIdle, setIsIdle] = useState(false);
  const idleTimerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsIdle(false);
      
      // Reset idle timer
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        setIsIdle(true);
      }, 5000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Start idle timer on mount
    idleTimerRef.current = setTimeout(() => {
      setIsIdle(true);
    }, 5000);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  // Smooth cursor following with inertia
  useEffect(() => {
    const animate = () => {
      setSmoothPos(prev => ({
        x: prev.x + (mousePos.x - prev.x) * 0.15,
        y: prev.y + (mousePos.y - prev.y) * 0.15
      }));
    };
    
    const interval = setInterval(animate, 16);
    return () => clearInterval(interval);
  }, [mousePos]);

  const rows = 12;
  const cols = 20;
  const totalExtensions = rows * cols;
  const spotlightRadius = 200;
  
  return (
    <div 
      className="absolute inset-0 grid" 
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gap: '0px'
      }}
    >
      {Array.from({ length: totalExtensions }).map((_, index) => {
        const ext = fileExtensions[index % fileExtensions.length];
        const row = Math.floor(index / cols);
        const col = index % cols;
        
        const cellWidth = window.innerWidth / cols;
        const cellHeight = window.innerHeight / rows;
        const cellX = col * cellWidth + cellWidth / 2;
        const cellY = row * cellHeight + cellHeight / 2;
        
        // Use smooth position for organic feel
        const distance = Math.sqrt(
          Math.pow(smoothPos.x - cellX, 2) + Math.pow(smoothPos.y - cellY, 2)
        );
        
        // Radial gradient opacity calculation
        let opacity = 0;
        if (!isIdle && distance < spotlightRadius) {
          const fadeStrength = 1 - (distance / spotlightRadius);
          opacity = Math.max(0.05, Math.min(0.25, fadeStrength * 0.25));
        }
        
        const scale = distance < spotlightRadius && !isIdle ? 1 + (1 - distance / spotlightRadius) * 0.15 : 1;
        const glowIntensity = !isIdle && distance < spotlightRadius ? (1 - distance / spotlightRadius) : 0;
        
        return (
          <div
            key={index}
            className="flex items-center justify-center text-xs font-mono"
            style={{
              backgroundColor: '#000000',
              color: `rgba(237, 237, 237, ${opacity})`,
              transform: `scale(${scale})`,
              transition: 'opacity 0.2s ease, transform 0.2s ease',
              boxShadow: glowIntensity > 0 
                ? `0 0 ${15 * glowIntensity}px rgba(255, 121, 198, ${0.4 * glowIntensity})`
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
  const [glowPulse, setGlowPulse] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Pulse animation
  useEffect(() => {
    setIsLoaded(true);
    
    const pulseInterval = setInterval(() => {
      setGlowPulse(true);
      setTimeout(() => setGlowPulse(false), 2000);
    }, 9000);
    
    return () => clearInterval(pulseInterval);
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#000000] overflow-hidden">
      {/* Extension Wall Background */}
      <ExtensionWall />

      {/* Content Overlay */}
      <div className={`relative z-10 flex flex-col items-center justify-center h-full pointer-events-none transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Pulsing glow behind title */}
        <div 
          className="absolute"
          style={{
            width: '600px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(189, 147, 249, 0.15) 0%, transparent 70%)',
            filter: 'blur(60px)',
            transition: 'opacity 2s ease',
            opacity: glowPulse ? 0.6 : 0.2,
            zIndex: -1
          }}
        />
        
        <h1 
          className="text-8xl font-bold mb-6 tracking-wider"
          style={{ 
            color: '#BD93F9',
            textShadow: '0 0 40px rgba(189, 147, 249, 0.5)',
            animation: 'fadeInDown 0.8s ease'
          }}
        >
          HENU PS
        </h1>
        
        <p 
          className="text-2xl mb-12 font-light tracking-wide"
          style={{ 
            color: '#FFB86C',
            opacity: 0.85,
            letterSpacing: '0.05em',
            animation: 'fadeInUp 0.8s ease 0.2s both'
          }}
        >
          An intelligent development environment, designed to think with you.
        </p>
        
        <Button
          onClick={() => navigate('/ide')}
          className="px-12 py-6 text-lg font-semibold rounded-full transition-all duration-300 pointer-events-auto group"
          style={{
            backgroundColor: '#EDEDED',
            color: '#0D0D0D',
            boxShadow: '0 4px 20px rgba(237, 237, 237, 0.25), inset 0 -2px 8px rgba(0, 0, 0, 0.1)',
            animation: 'fadeInUp 0.8s ease 0.4s both',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(237, 237, 237, 0.4), inset 0 -2px 8px rgba(0, 0, 0, 0.1)';
            e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(237, 237, 237, 0.25), inset 0 -2px 8px rgba(0, 0, 0, 0.1)';
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px) scale(0.97)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
          }}
        >
          GET STARTED
        </Button>
      </div>

      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
