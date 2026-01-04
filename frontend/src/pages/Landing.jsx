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
      
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        setIsIdle(true);
      }, 5000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    idleTimerRef.current = setTimeout(() => setIsIdle(true), 5000);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

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
        
        const distance = Math.sqrt(
          Math.pow(smoothPos.x - cellX, 2) + Math.pow(smoothPos.y - cellY, 2)
        );
        
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
  const [breathingGlow, setBreathingGlow] = useState(0.06);
  const [buttonAura, setButtonAura] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [proximityEffect, setProximityEffect] = useState({ title: 0, tagline: 0, button: 0 });

  // Breathing glow animation
  useEffect(() => {
    let opacity = 0.06;
    let increasing = true;
    
    const breathe = setInterval(() => {
      if (increasing) {
        opacity += 0.0005;
        if (opacity >= 0.12) increasing = false;
      } else {
        opacity -= 0.0005;
        if (opacity <= 0.06) increasing = true;
      }
      setBreathingGlow(opacity);
    }, 50);
    
    return () => clearInterval(breathe);
  }, []);

  // Button aura pulse
  useEffect(() => {
    const auraInterval = setInterval(() => {
      setButtonAura(true);
      setTimeout(() => setButtonAura(false), 2000);
    }, 12000);
    
    return () => clearInterval(auraInterval);
  }, []);

  // Page load animation
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Cursor proximity tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const titleDist = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - (centerY - 100), 2));
      const taglineDist = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));
      const buttonDist = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - (centerY + 100), 2));
      
      setProximityEffect({
        title: Math.max(0, 1 - titleDist / 300),
        tagline: Math.max(0, 1 - taglineDist / 300),
        button: Math.max(0, 1 - buttonDist / 300)
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#000000] overflow-hidden">
      {/* Grain texture overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.03\'/%3E%3C/svg%3E")',
          zIndex: 100,
          mixBlendMode: 'overlay'
        }}
      />

      {/* Extension Wall Background */}
      <ExtensionWall />

      {/* 3D Circular Rings - Decorative Element */}
      <div 
        className="absolute"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          perspective: '1200px',
          zIndex: 5,
          pointerEvents: 'none'
        }}
      >
        {/* Ring 1 - Largest, slowest */}
        <div
          style={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            border: '2px solid rgba(180, 140, 255, 0.15)',
            boxShadow: '0 0 20px rgba(180, 140, 255, 0.1), inset 0 0 20px rgba(180, 140, 255, 0.05)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'ringRotate1 80s linear infinite'
          }}
        />
        
        {/* Ring 2 - Medium, medium speed */}
        <div
          style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            border: '2px solid rgba(160, 160, 180, 0.18)',
            boxShadow: '0 0 15px rgba(160, 160, 180, 0.12), inset 0 0 15px rgba(160, 160, 180, 0.08)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'ringRotate2 60s linear infinite reverse'
          }}
        />
        
        {/* Ring 3 - Smaller, faster */}
        <div
          style={{
            position: 'absolute',
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            border: '2px solid rgba(180, 140, 255, 0.2)',
            boxShadow: '0 0 18px rgba(180, 140, 255, 0.15), inset 0 0 18px rgba(180, 140, 255, 0.1)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'ringRotate3 45s linear infinite'
          }}
        />
        
        {/* Ring 4 - Smallest, fastest */}
        <div
          style={{
            position: 'absolute',
            width: '260px',
            height: '260px',
            borderRadius: '50%',
            border: '2px solid rgba(160, 160, 180, 0.22)',
            boxShadow: '0 0 12px rgba(160, 160, 180, 0.18), inset 0 0 12px rgba(160, 160, 180, 0.12)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'ringRotate4 35s linear infinite reverse'
          }}
        />
      </div>

      {/* Content Overlay with micro floating */}
      <div 
        className={`relative z-10 flex flex-col items-center justify-center h-full pointer-events-none transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{
          animation: 'microFloat 14s ease-in-out infinite'
        }}
      >
        {/* Decorative radial gradient behind HENU PS */}
        <div 
          className="absolute"
          style={{
            width: '420px',
            height: '420px',
            background: 'radial-gradient(circle, rgba(180, 140, 255, 0.12) 0%, transparent 70%)',
            animation: 'glowPulse 12s ease-in-out infinite',
            zIndex: -1,
            top: '-180px'
          }}
        />

        {/* Ambient breathing glow */}
        <div 
          className="absolute"
          style={{
            width: '700px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(189, 147, 249, 1) 0%, transparent 70%)',
            filter: 'blur(80px)',
            transition: 'opacity 0.05s linear',
            opacity: breathingGlow,
            zIndex: -2
          }}
        />
        
        {/* Title with proximity glow */}
        <h1 
          className="text-8xl font-bold mb-6 tracking-wider"
          style={{ 
            color: '#BD93F9',
            textShadow: `0 0 ${40 + proximityEffect.title * 20}px rgba(189, 147, 249, ${0.5 + proximityEffect.title * 0.3})`,
            animation: 'fadeInDown 0.8s ease',
            transition: 'text-shadow 0.3s ease'
          }}
        >
          HENU PS
        </h1>
        
        {/* Tagline with proximity warmth */}
        <p 
          className="text-2xl mb-12 font-light tracking-wide"
          style={{ 
            color: proximityEffect.tagline > 0.3 ? '#FFA86C' : '#FFB86C',
            opacity: 0.85,
            letterSpacing: '0.05em',
            animation: 'fadeInUp 0.8s ease 0.2s both',
            transition: 'color 0.3s ease'
          }}
        >
          An intelligent development environment, designed to think with you.
        </p>
        
        {/* Button with aura */}
        <div className="relative">
          {/* Button passive aura */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              filter: 'blur(18px)',
              animation: 'buttonAura 12s ease-in-out infinite',
              zIndex: -1
            }}
          />
          
          <Button
            onClick={() => navigate('/ide')}
            className="px-12 py-6 text-lg font-semibold rounded-full transition-all duration-300 pointer-events-auto group relative"
            style={{
              backgroundColor: '#EDEDED',
              color: '#0D0D0D',
              boxShadow: `0 4px 20px rgba(237, 237, 237, ${0.25 + proximityEffect.button * 0.2}), inset 0 -2px 8px rgba(0, 0, 0, 0.1)`,
              animation: 'fadeInUp 0.8s ease 0.4s both',
              cursor: 'pointer',
              transition: 'box-shadow 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(237, 237, 237, 0.4), inset 0 -2px 8px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(237, 237, 237, 0.25), inset 0 -2px 8px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px) scale(0.97)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px) scale(1)';
            }}
          >
            GET STARTED
          </Button>
        </div>
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
        
        @keyframes microFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-2px);
          }
        }
        
        @keyframes ringRotate1 {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        
        @keyframes ringRotate2 {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        
        @keyframes ringRotate3 {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        
        @keyframes ringRotate4 {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        
        @keyframes glowPulse {
          0%, 100% {
            opacity: 0.12;
          }
          50% {
            opacity: 0.24;
          }
        }
        
        @keyframes buttonAura {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.15);
          }
        }
      `}</style>
    </div>
  );
}
