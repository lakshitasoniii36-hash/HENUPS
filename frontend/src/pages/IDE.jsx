import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Sparkles, FolderOpen, FilePlus, FolderPlus, RefreshCw, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

function LogoTransition({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 450);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className="fixed inset-0 flex items-center justify-center pointer-events-none"
      style={{ zIndex: 1000, backgroundColor: 'transparent' }}
    >
      <motion.img
        src="/LOGO.svg"
        alt="HENU PS"
        initial={{ 
          scale: 0.88, 
          opacity: 0
        }}
        animate={{ 
          scale: 1, 
          opacity: 1
        }}
        exit={{
          scale: 1.02,
          opacity: 0
        }}
        transition={{ 
          duration: 0.4, 
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        style={{
          width: '35vw',
          maxWidth: '550px',
          minWidth: '350px',
          height: 'auto',
          filter: 'drop-shadow(0 0 30px rgba(189, 147, 249, 0.5)) drop-shadow(0 0 60px rgba(189, 147, 249, 0.25))',
          display: 'block'
        }}
      />
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

function CorePulse({ isThinking }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* Concentric rings - no logo watermark */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full border"
          style={{
            width: `${180 + i * 60}px`,
            height: `${180 + i * 60}px`,
            borderColor: i % 2 === 0 ? 'rgba(189, 147, 249, 0.15)' : 'rgba(255, 121, 198, 0.1)',
            borderWidth: '1px',
            animation: `corePulse ${8 + i * 2}s ease-in-out infinite`,
            animationDelay: `${i * 0.8}s`
          }}
        />
      ))}
      
      <style>{`
        @keyframes corePulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.25;
          }
          50% {
            transform: scale(1.06);
            opacity: 0.45;
          }
        }
      `}</style>
    </div>
  );
}

export default function IDE() {
  const navigate = useNavigate();
  const [folderOpened, setFolderOpened] = useState(false);
  const [activeTab, setActiveTab] = useState('terminal');
  const [terminalVisible, setTerminalVisible] = useState(false);
  const [showLogoTransition, setShowLogoTransition] = useState(false);
  const [pendingAction, setPendingAction] = useState(null); // 'terminal' or 'folder'
  const [showTerminalRipple, setShowTerminalRipple] = useState(false);
  const [fileOpened, setFileOpened] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let lastTouchDistance = 0;

    const handleWheel = (e) => {
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
        
        if (lastTouchDistance - currentDistance > 50) {
          openTerminalWithAnimation();
          lastTouchDistance = 0;
        }
      }
    };

    const handleKeyDown = (e) => {
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
    setPendingAction('terminal');
    setShowLogoTransition(true);
  };

  const openFolderWithAnimation = () => {
    if (folderOpened) return; // Already open
    setPendingAction('folder');
    setShowLogoTransition(true);
  };

  const handleLogoTransitionComplete = () => {
    setShowLogoTransition(false);
    
    if (pendingAction === 'terminal') {
      setTerminalVisible(true);
      setShowTerminalRipple(true);
      setTimeout(() => setShowTerminalRipple(false), 300);
    } else if (pendingAction === 'folder') {
      setFolderOpened(true);
    }
    
    setPendingAction(null);
  };

  const closeTerminal = () => {
    setTerminalVisible(false);
  };

  const handleFileClick = () => {
    setFileOpened(true);
    setTimeout(() => setFileOpened(false), 500);
  };

  return (
    <div className="h-screen bg-[#0D0D0D] flex flex-col overflow-hidden" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
      {/* Import Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      
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
            className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <img
              src="/LOGO.svg"
              alt="HENU PS"
              style={{
                height: '28px',
                width: 'auto',
                filter: 'drop-shadow(0 0 8px rgba(189, 147, 249, 0.4))'
              }}
            />
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
        {/* Left Sidebar - File Explorer with Signal Spine */}
        <div 
          className="w-64 border-r relative overflow-hidden"
          style={{ 
            backgroundColor: '#161616',
            borderColor: '#8BE9FD40'
          }}
        >
          {/* Signal Spine - thin vertical indicator at left edge */}
          <motion.div
            className="absolute left-0 top-0 bottom-0"
            style={{
              width: '2px',
              background: hasError 
                ? 'linear-gradient(180deg, transparent 10%, rgba(255, 85, 85, 0.35) 50%, transparent 90%)'
                : 'linear-gradient(180deg, transparent 15%, rgba(189, 147, 249, 0.18) 50%, transparent 85%)',
              boxShadow: hasError
                ? '0 0 6px rgba(255, 85, 85, 0.25)'
                : '0 0 4px rgba(189, 147, 249, 0.12)'
            }}
            animate={{
              opacity: fileOpened ? [0.25, 0.85, 0.25] : 0.25
            }}
            transition={{
              duration: 0.5,
              ease: 'easeOut'
            }}
          />
          
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
                  onClick={openFolderWithAnimation}
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
                  <div 
                    onClick={handleFileClick}
                    className="flex items-center gap-2 px-2 py-1 hover:bg-[#0D0D0D]/50 cursor-pointer rounded bg-[#8BE9FD]/10"
                  >
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
            !folderOpened ? (
              <div className="flex-1 flex items-center justify-center bg-[#161616]">
                <div className="text-center">
                  <FolderOpen size={64} color="#8BE9FD" className="mx-auto mb-6 opacity-30" />
                  <h2 className="text-2xl font-semibold mb-2" style={{ color: '#8BE9FD' }}>No Folder Opened</h2>
                  <p className="text-[#EDEDED]/50 mb-6">Open a folder to start coding</p>
                  <Button
                    onClick={openFolderWithAnimation}
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
                <div className="flex-1 overflow-auto bg-[#161616] p-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  <pre className="text-sm leading-relaxed">
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex-1 bg-[#161616] relative flex flex-col"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {showTerminalRipple && <TerminalRipple />}
              
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

              <div className="flex-1 p-4 text-sm overflow-auto">
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

        {/* Right Sidebar - AI Assistant with Core Pulse */}
        <div 
          className="w-80 border-l bg-[#161616] relative"
          style={{ borderColor: '#FFB86C40' }}
        >
          <CorePulse isThinking={false} />
          
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


    </div>
  );
}
