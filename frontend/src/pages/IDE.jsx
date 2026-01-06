import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Sparkles, FolderOpen, FilePlus, FolderPlus, RefreshCw, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

function RippleEffect() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full border-2"
          style={{
            borderColor: '#FFB86C',
            opacity: 0,
            animation: `ripple 4s ease-out infinite ${i * 0.8}s`
          }}
        />
      ))}
      <style>{`
        @keyframes ripple {
          0% {
            width: 20px;
            height: 20px;
            opacity: 0.8;
          }
          100% {
            width: 600px;
            height: 600px;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

function LogoTransition({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 400);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 bg-[#0D0D0D] flex items-center justify-center"
      style={{ zIndex: 1000 }}
    >
      <motion.div
        initial={{ scale: 0.8, rotateY: -15, rotateX: 10 }}
        animate={{ scale: 1, rotateY: 0, rotateX: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{ 
          perspective: '1000px',
          transformStyle: 'preserve-3d'
        }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="200" 
          height="200" 
          viewBox="0 0 375 374.999991"
          style={{
            filter: 'url(#purpleGlow)'
          }}
        >
          <defs>
            <filter id="purpleGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur"/>
              <feColorMatrix 
                in="blur" 
                type="matrix" 
                values="0.75 0 0 0 0
                        0 0.45 0 0 0
                        0 0 0.97 0 0
                        0 0 0 0.6 0"
                result="glowColor"
              />
              <feMerge>
                <feMergeNode in="glowColor"/>
                <feMergeNode in="glowColor"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <g transform="matrix(1, 0, 0, 1, 107, 144)">
            <motion.path 
              fill="#5e17eb" 
              d="M 81.46875 86.785156 C 54.570312 86.785156 28.105469 73.367188 2.8125 46.902344 L 0.296875 44.269531 L 2.5625 41.421875 C 3.902344 39.742188 35.917969 0.207031 81.6875 0.207031 C 108.652344 0.207031 134.476562 14.019531 158.4375 41.265625 L 160.695312 43.835938 L 158.617188 46.554688 C 157.359375 48.199219 127.289062 86.785156 81.46875 86.785156 Z M 11.492188 43.859375 C 34.324219 66.816406 57.851562 78.445312 81.46875 78.445312 C 116.585938 78.445312 142.324219 52.554688 149.785156 44.113281 C 128.175781 20.507812 105.277344 8.542969 81.6875 8.542969 C 46.605469 8.542969 19.476562 35.105469 11.492188 43.859375 Z M 11.492188 43.859375"
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
            />
            <motion.path 
              fill="#5e17eb" 
              d="M 80.566406 16.875 C 65.863281 16.875 53.945312 28.792969 53.945312 43.496094 C 53.945312 58.199219 65.863281 70.117188 80.566406 70.117188 C 95.269531 70.117188 107.1875 58.199219 107.1875 43.496094 C 107.1875 28.792969 95.269531 16.875 80.566406 16.875 Z M 80.566406 54.667969 C 74.394531 54.667969 69.394531 49.667969 69.394531 43.496094 C 69.394531 37.324219 74.394531 32.324219 80.566406 32.324219 C 86.734375 32.324219 91.738281 37.324219 91.738281 43.496094 C 91.738281 49.667969 86.734375 54.667969 80.566406 54.667969 Z M 80.566406 54.667969"
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.05 }}
            />
            <motion.path 
              fill="#121820" 
              d="M 0.296875 0.296875 L 54.703125 0.296875 L 54.703125 54.703125 L 0.296875 54.703125 Z M 0.296875 0.296875"
              transform="translate(53, 16)"
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.1 }}
            />
            <motion.path 
              fill="#fffcfa" 
              d="M 100.527344 46.492188 C 99.628906 49.691406 94.25 58.59375 83.109375 60.382812 C 72.710938 62.058594 61.199219 54.570312 59.421875 43.160156 C 57.882812 33.3125 64.0625 23.519531 73.71875 20.191406 C 69.277344 21.617188 62.742188 24.90625 59.035156 32.339844 C 58.65625 33.101562 53.613281 43.664062 59.355469 54.238281 C 60.214844 55.820312 64.6875 64.0625 74.402344 65.761719 C 85.433594 67.695312 93.207031 59.4375 93.738281 58.847656 C 92.992188 60.242188 91.414062 62.722656 88.488281 64.738281 C 84.332031 67.601562 80.074219 67.71875 78.5 67.683594 C 79.71875 67.75 88.734375 68.070312 95.210938 60.898438 C 100.511719 55.03125 100.558594 48.089844 100.527344 46.492188 Z M 68.726562 61.707031 C 62.171875 58.136719 60.140625 51.933594 59.761719 50.695312 C 60.65625 52.472656 63.441406 57.429688 69.492188 60.640625 C 75.617188 63.894531 81.359375 63.382812 83.324219 63.117188 C 82.171875 63.476562 75.566406 65.433594 68.726562 61.707031 Z M 68.726562 61.707031"
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.15 }}
            />
            <motion.path 
              fill="#fffcfa" 
              d="M 65.992188 37.503906 C 65.007812 40.125 63.890625 44.335938 65.351562 48.605469 C 67.699219 55.453125 75.253906 58.289062 75.085938 58.550781 C 74.90625 58.832031 65.339844 56.667969 61.769531 48.007812 C 58.566406 40.25 62.578125 33.09375 63.089844 32.210938 C 62.429688 33.449219 60.886719 36.738281 61.511719 40.921875 C 61.835938 43.085938 62.628906 44.753906 63.261719 45.828125 C 63.246094 44.757812 63.347656 43.125 63.988281 41.261719 C 64.566406 39.574219 65.375 38.316406 65.996094 37.503906 Z M 65.992188 37.503906"
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.2 }}
            />
            <motion.path 
              fill="#fffcfa" 
              d="M 77.160156 57.25 C 79.9375 57.488281 85.386719 57.761719 90.828125 53.40625 C 94.636719 50.351562 96.148438 46.414062 96.441406 42.914062 C 96.734375 39.332031 95.445312 36.203125 94.828125 34.933594 C 96.363281 40.921875 95.648438 44.867188 91.007812 48.839844 C 86.367188 52.808594 79.90625 51.726562 76.164062 53.566406 C 76.164062 53.566406 78.617188 53.171875 79.953125 53.277344 C 81.285156 53.382812 84.710938 53.136719 84.710938 53.136719 C 84.710938 53.136719 81.574219 53.390625 79.207031 54.636719 C 76.835938 55.886719 74.132812 55.964844 74.132812 55.964844 C 74.132812 55.964844 75.089844 57.070312 77.160156 57.25 Z M 77.160156 57.25"
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.25 }}
            />
          </g>
        </svg>
      </motion.div>
    </motion.div>
  );
}

function TerminalRipple() {
  return (
    <motion.div
      initial={{ scaleY: 0, opacity: 0.6 }}
      animate={{ scaleY: 1, opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="absolute inset-0 pointer-events-none"
      style={{
        background: 'linear-gradient(180deg, rgba(80, 250, 123, 0.2) 0%, transparent 100%)',
        transformOrigin: 'top'
      }}
    />
  );
}

export default function IDE() {
  const navigate = useNavigate();
  const [folderOpened, setFolderOpened] = useState(false);
  const [activeTab, setActiveTab] = useState('terminal');
  const [terminalVisible, setTerminalVisible] = useState(false);
  const [showLogoTransition, setShowLogoTransition] = useState(false);
  const [showTerminalRipple, setShowTerminalRipple] = useState(false);

  // Gesture detection for terminal opening
  useEffect(() => {
    let lastTouchDistance = 0;

    const handleWheel = (e) => {
      // Ctrl + Scroll to open terminal
      if (e.ctrlKey && !terminalVisible) {
        e.preventDefault();
        openTerminalWithAnimation();
      }
    };

    const handleTouchStart = (e) => {
      if (e.touches.length === 2) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        lastTouchDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 2 && !terminalVisible) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const currentDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
        
        // Pinch in to open terminal
        if (lastTouchDistance - currentDistance > 50) {
          openTerminalWithAnimation();
          lastTouchDistance = 0;
        }
      }
    };

    const handleKeyDown = (e) => {
      // Ctrl + ` to toggle terminal
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault();
        if (terminalVisible) {
          closeTerminal();
        } else {
          openTerminalWithAnimation();
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [terminalVisible]);

  const openTerminalWithAnimation = () => {
    setShowLogoTransition(true);
  };

  const handleLogoTransitionComplete = () => {
    setShowLogoTransition(false);
    setTerminalVisible(true);
    setShowTerminalRipple(true);
    setTimeout(() => setShowTerminalRipple(false), 300);
  };

  const closeTerminal = () => {
    setTerminalVisible(false);
  };

  return (
    <div className="h-screen bg-[#0D0D0D] flex flex-col overflow-hidden">
      {/* Logo Transition */}
      <AnimatePresence>
        {showLogoTransition && (
          <LogoTransition onComplete={handleLogoTransitionComplete} />
        )}
      </AnimatePresence>

      {/* Top Bar */}
      <div 
        className="h-12 px-4 flex items-center justify-between border-b"
        style={{ 
          backgroundColor: '#161616',
          borderColor: '#FF79C640'
        }}
      >
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className="text-[#BD93F9] font-bold text-lg hover:text-[#FF79C6] transition-colors cursor-pointer"
          >
            HENU PS
          </button>
          <div className="flex gap-2 text-sm text-[#EDEDED]/70">
            <button className="hover:text-[#EDEDED] px-2 py-1 rounded transition-colors">File</button>
            <button className="hover:text-[#EDEDED] px-2 py-1 rounded transition-colors">Edit</button>
            <button className="hover:text-[#EDEDED] px-2 py-1 rounded transition-colors">View</button>
            <button className="hover:text-[#EDEDED] px-2 py-1 rounded transition-colors">Run</button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - File Explorer */}
        <div 
          className="w-64 border-r relative overflow-hidden"
          style={{ 
            backgroundColor: '#161616',
            borderColor: '#8BE9FD40'
          }}
        >
          {/* Electrical Wave Animation */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full"
                style={{
                  height: '100px',
                  background: `linear-gradient(180deg, transparent, rgba(139, 233, 253, 0.15), rgba(139, 233, 253, 0.3), rgba(139, 233, 253, 0.15), transparent)`,
                  top: '-100px',
                  animation: `waveFlow ${4 + i}s ease-in-out infinite`,
                  animationDelay: `${i * 1.3}s`,
                  filter: 'blur(10px)'
                }}
              />
            ))}
          </div>
          
          {/* File Tree */}
          <div className="relative z-10 h-full overflow-y-auto flex flex-col">
            <div className="p-3 border-b border-[#8BE9FD]/20 flex items-center justify-between">
              <span className="text-xs font-semibold text-[#8BE9FD] uppercase tracking-wide">Explorer</span>
              <div className="flex gap-1">
                <button className="p-1 hover:bg-[#8BE9FD]/20 rounded transition-colors" title="New File">
                  <FilePlus size={14} color="#8BE9FD" />
                </button>
                <button className="p-1 hover:bg-[#8BE9FD]/20 rounded transition-colors" title="New Folder">
                  <FolderPlus size={14} color="#8BE9FD" />
                </button>
                <button className="p-1 hover:bg-[#8BE9FD]/20 rounded transition-colors" title="Refresh">
                  <RefreshCw size={14} color="#8BE9FD" />
                </button>
              </div>
            </div>
            
            {!folderOpened ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <FolderOpen size={48} color="#8BE9FD" className="mb-4 opacity-50" />
                <p className="text-sm text-[#EDEDED]/70 mb-4">You have not yet opened a folder</p>
                <Button
                  onClick={() => setFolderOpened(true)}
                  className="px-4 py-2 text-sm"
                  style={{ backgroundColor: '#8BE9FD', color: '#0D0D0D' }}
                >
                  Open Folder
                </Button>
              </div>
            ) : (
              <div className="p-2 flex-1">
                <div className="flex items-center gap-2 px-2 py-1.5 hover:bg-[#0D0D0D]/50 cursor-pointer rounded">
                  <FolderOpen size={16} color="#FFB86C" />
                  <span className="text-sm text-[#EDEDED]">src</span>
                </div>
                <div className="ml-4 space-y-1">
                  <div className="flex items-center gap-2 px-2 py-1 hover:bg-[#0D0D0D]/50 cursor-pointer rounded bg-[#8BE9FD]/10">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8BE9FD" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                    </svg>
                    <span className="text-xs text-[#EDEDED]">App.jsx</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1 hover:bg-[#0D0D0D]/50 cursor-pointer rounded">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8BE9FD" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                    </svg>
                    <span className="text-xs text-[#EDEDED]">index.js</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 hover:bg-[#0D0D0D]/50 cursor-pointer rounded mt-2">
                  <FolderOpen size={16} color="#FFB86C" />
                  <span className="text-sm text-[#EDEDED]">backend</span>
                </div>
                <div className="ml-4 space-y-1">
                  <div className="flex items-center gap-2 px-2 py-1 hover:bg-[#0D0D0D]/50 cursor-pointer rounded">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#50FA7B" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                    </svg>
                    <span className="text-xs text-[#EDEDED]">server.py</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center - Editor or Terminal */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {!terminalVisible ? (
            // Code Editor View
            !folderOpened ? (
              <div className="flex-1 flex items-center justify-center bg-[#161616]">
                <div className="text-center">
                  <FolderOpen size={64} color="#8BE9FD" className="mx-auto mb-6 opacity-30" />
                  <h2 className="text-2xl font-semibold mb-2" style={{ color: '#8BE9FD' }}>No Folder Opened</h2>
                  <p className="text-[#EDEDED]/50 mb-6">Open a folder to start coding</p>
                  <Button
                    onClick={() => setFolderOpened(true)}
                    className="px-6 py-3"
                    style={{ backgroundColor: '#8BE9FD', color: '#0D0D0D' }}
                  >
                    Open Folder
                  </Button>
                  <p className="text-xs text-[#EDEDED]/40 mt-8">
                    Tip: Use Ctrl+` or Ctrl+Scroll to open terminal
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 px-2 py-1 border-b border-[#FF79C6]/20 bg-[#161616]">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0D0D0D] rounded-t text-sm">
                    <span className="text-[#EDEDED]">App.jsx</span>
                  </div>
                </div>
                <div className="flex-1 overflow-auto bg-[#161616] p-4">
                  <pre className="text-sm font-mono leading-relaxed">
                    <code>
                      <span style={{color: '#6272A4'}}>// JavaScript Sample</span>{'\n'}
                      <span style={{color: '#FF79C6'}}>import</span> <span style={{color: '#EDEDED'}}>React</span><span style={{color: '#FF79C6'}}>,</span> {'{ '}<span style={{color: '#EDEDED'}}>useState</span> {'}'} <span style={{color: '#FF79C6'}}>from</span> <span style={{color: '#50FA7B'}}>'react'</span><span style={{color: '#EDEDED'}}>;</span>{'\n\n'}
                      <span style={{color: '#FF79C6'}}>const</span> <span style={{color: '#8BE9FD'}}>App</span> <span style={{color: '#FF79C6'}}>=</span> <span style={{color: '#EDEDED'}}>() {'=> {'}</span>{'\n'}
                      <span style={{color: '#EDEDED'}}>  </span><span style={{color: '#FF79C6'}}>const</span> <span style={{color: '#EDEDED'}}>[count, setCount]</span> <span style={{color: '#FF79C6'}}>=</span> <span style={{color: '#8BE9FD'}}>useState</span><span style={{color: '#EDEDED'}}>(</span><span style={{color: '#FFB86C'}}>0</span><span style={{color: '#EDEDED'}}>);</span>{'\n\n'}
                      <span style={{color: '#EDEDED'}}>  </span><span style={{color: '#FF79C6'}}>return</span> <span style={{color: '#EDEDED'}}>{'('}</span>{'\n'}
                      <span style={{color: '#EDEDED'}}>    {'<'}div{'>'}</span>{'\n'}
                      <span style={{color: '#EDEDED'}}>      {'<'}h1{'>'}HENU PS IDE{'</'}h1{'>'}</span>{'\n'}
                      <span style={{color: '#EDEDED'}}>      {'<'}button onClick={'{'}</span><span style={{color: '#8BE9FD'}}>{'() => setCount(count + 1)'}</span><span style={{color: '#EDEDED'}}>{'}'}{'>Count: {count}</'}button{'>'}</span>{'\n'}
                      <span style={{color: '#EDEDED'}}>    {'</'}div{'>'}</span>{'\n'}
                      <span style={{color: '#EDEDED'}}>  {')'};</span>{'\n'}
                      <span style={{color: '#EDEDED'}}>{'};'}</span>{'\n\n'}
                      <span style={{color: '#FF79C6'}}>export default</span> <span style={{color: '#EDEDED'}}>App;</span>
                    </code>
                  </pre>
                </div>
              </>
            )
          ) : (
            // Terminal View
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex-1 bg-[#161616] relative flex flex-col"
            >
              {showTerminalRipple && <TerminalRipple />}
              
              {/* Terminal Close Button */}
              <div className="p-2 border-b border-[#50FA7B]/20 flex items-center justify-between">
                <button
                  onClick={closeTerminal}
                  className="flex items-center gap-2 px-3 py-1.5 hover:bg-[#50FA7B]/10 rounded transition-colors"
                  style={{ color: '#50FA7B' }}
                >
                  <X size={16} />
                  <span className="text-xs font-semibold uppercase tracking-wide">Close Terminal</span>
                </button>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setActiveTab('terminal')}
                    className={`px-3 py-1 text-xs font-semibold uppercase tracking-wide transition-colors ${
                      activeTab === 'terminal' ? 'text-[#50FA7B]' : 'text-[#EDEDED]/50 hover:text-[#EDEDED]/80'
                    }`}
                  >
                    Terminal
                  </button>
                  <button
                    onClick={() => setActiveTab('console')}
                    className={`px-3 py-1 text-xs font-semibold uppercase tracking-wide transition-colors ${
                      activeTab === 'console' ? 'text-[#8BE9FD]' : 'text-[#EDEDED]/50 hover:text-[#EDEDED]/80'
                    }`}
                  >
                    Console
                  </button>
                  <button
                    onClick={() => setActiveTab('problems')}
                    className={`px-3 py-1 text-xs font-semibold uppercase tracking-wide transition-colors ${
                      activeTab === 'problems' ? 'text-[#FF5555]' : 'text-[#EDEDED]/50 hover:text-[#EDEDED]/80'
                    }`}
                  >
                    Problems
                  </button>
                </div>
              </div>

              {/* Terminal Content */}
              <div className="flex-1 p-4 font-mono text-sm overflow-auto">
                {activeTab === 'terminal' && (
                  <>
                    <div style={{color: '#EDEDED'}}>HENU PS Terminal v1.0.0</div>
                    <div style={{color: '#EDEDED'}}>Type "help" for available commands</div>
                    <div className="mt-2 flex items-center gap-2">
                      <span style={{color: '#50FA7B'}}>$</span>
                      <span style={{color: '#EDEDED'}} className="animate-pulse">_</span>
                    </div>
                  </>
                )}
                {activeTab === 'console' && (
                  <>
                    <div style={{color: '#8BE9FD'}}>Console output will appear here</div>
                    <div style={{color: '#EDEDED'}} className="mt-2">Ready to log messages...</div>
                  </>
                )}
                {activeTab === 'problems' && (
                  <>
                    <div style={{color: '#6272A4'}}>No problems detected</div>
                    <div style={{color: '#EDEDED'}} className="mt-2">Your code is clean ✓</div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Sidebar - AI Assistant */}
        <div 
          className="w-80 border-l bg-[#161616] relative"
          style={{ borderColor: '#FFB86C40' }}
        >
          <RippleEffect />
          
          <div className="relative z-10 h-full flex flex-col">
            <div className="px-4 py-3 border-b border-[#FFB86C]/20 flex items-center gap-2">
              <Sparkles size={16} color="#FFB86C" />
              <span className="text-xs font-semibold text-[#FFB86C] uppercase tracking-wide">AI Assistant</span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="flex justify-start">
                <div
                  className="max-w-[80%] p-3 rounded-lg text-sm"
                  style={{
                    backgroundColor: '#FFB86C20',
                    color: '#EDEDED',
                    borderLeft: '3px solid #FFB86C'
                  }}
                >
                  Hi! I'm your AI assistant. Ask me anything about your code!
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-[#FFB86C]/20">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask me anything..."
                  className="flex-1 px-3 py-2 rounded text-sm outline-none"
                  style={{
                    backgroundColor: '#0D0D0D',
                    color: '#EDEDED',
                    border: '1px solid #FFB86C40'
                  }}
                />
                <Button
                  size="sm"
                  className="px-3"
                  style={{
                    backgroundColor: '#FFB86C',
                    color: '#0D0D0D'
                  }}
                >
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes waveFlow {
          0%, 100% { transform: translateY(-100%); }
          50% { transform: translateY(calc(100vh + 100px)); }
        }
      `}</style>
    </div>
  );
}
