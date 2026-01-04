import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

const fileExtensions = [
  '.py', '.js', '.ipynb', '.ts', '.tsx', '.jsx', 
  '.java', '.c', '.cpp', '.go', '.rs', '.php', 
  '.rb', '.html', '.css', '.json', '.csv', '.sql', 
  '.env', '.yml', '.bash', '.sh', '.md', '.txt'
];

function FloatingExtension({ extension, delay, index }) {
  const [position, setPosition] = useState({
    x: Math.random() * 100,
    y: -10
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setPosition(prev => ({
          x: prev.x + (Math.random() - 0.5) * 2,
          y: prev.y > 110 ? -10 : prev.y + 0.5
        }));
      }, 50);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className="absolute px-4 py-2 rounded-lg font-mono text-sm transition-all duration-100"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        backgroundColor: '#1a1a2e',
        color: '#EDEDED',
        border: '1px solid #FF79C640',
        boxShadow: '0 0 15px rgba(255, 121, 198, 0.3)',
        transform: 'translateX(-50%)',
        zIndex: 0
      }}
    >
      {extension}
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen bg-[#0D0D0D] overflow-hidden">
      {/* Floating Extensions Background */}
      <div className="absolute inset-0">
        {fileExtensions.map((ext, i) => (
          <FloatingExtension 
            key={ext} 
            extension={ext} 
            delay={i * 200}
            index={i}
          />
        ))}
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