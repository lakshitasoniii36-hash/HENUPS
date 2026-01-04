import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Sparkles, FolderOpen, FilePlus, FolderPlus, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/button';

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

export default function IDE() {
  const navigate = useNavigate();
  const [folderOpened, setFolderOpened] = useState(false);
  const [activeTab, setActiveTab] = useState('terminal');

  return (
    <div className="h-screen bg-[#0D0D0D] flex flex-col overflow-hidden">
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
          {/* Enhanced Electrical Wave Animation */}
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
                <button 
                  className="p-1 hover:bg-[#8BE9FD]/20 rounded transition-colors"
                  title="New File"
                >
                  <FilePlus size={14} color="#8BE9FD" />
                </button>
                <button 
                  className="p-1 hover:bg-[#8BE9FD]/20 rounded transition-colors"
                  title="New Folder"
                >
                  <FolderPlus size={14} color="#8BE9FD" />
                </button>
                <button 
                  className="p-1 hover:bg-[#8BE9FD]/20 rounded transition-colors"
                  title="Refresh"
                >
                  <RefreshCw size={14} color="#8BE9FD" />
                </button>
              </div>
            </div>
            
            {!folderOpened ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <FolderOpen size={48} color="#8BE9FD" className="mb-4 opacity-50" />
                <p className="text-sm text-[#EDEDED]/70 mb-4">
                  You have not yet opened a folder
                </p>
                <Button
                  onClick={() => setFolderOpened(true)}
                  className="px-4 py-2 text-sm"
                  style={{
                    backgroundColor: '#8BE9FD',
                    color: '#0D0D0D'
                  }}
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

        {/* Center - Editor */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {!folderOpened ? (
            <div className="flex-1 flex items-center justify-center bg-[#161616]">
              <div className="text-center">
                <FolderOpen size={64} color="#8BE9FD" className="mx-auto mb-6 opacity-30" />
                <h2 className="text-2xl font-semibold mb-2" style={{ color: '#8BE9FD' }}>
                  No Folder Opened
                </h2>
                <p className="text-[#EDEDED]/50 mb-6">
                  Open a folder to start coding
                </p>
                <Button
                  onClick={() => setFolderOpened(true)}
                  className="px-6 py-3"
                  style={{
                    backgroundColor: '#8BE9FD',
                    color: '#0D0D0D'
                  }}
                >
                  Open Folder
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Editor Tab */}
              <div className="flex items-center gap-2 px-2 py-1 border-b border-[#FF79C6]/20 bg-[#161616]">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0D0D0D] rounded-t text-sm">
                  <span className="text-[#EDEDED]">App.jsx</span>
                </div>
              </div>

              {/* Editor Content */}
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
          )}

          {/* Bottom Panel with Tabs */}
          <div 
            className="h-64 border-t bg-[#161616]"
            style={{ borderColor: '#50FA7B40' }}
          >
            {/* Tab Headers */}
            <div className="flex items-center border-b border-[#50FA7B]/20">
              <button
                onClick={() => setActiveTab('terminal')}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${
                  activeTab === 'terminal' ? 'text-[#50FA7B] border-b-2 border-[#50FA7B]' : 'text-[#EDEDED]/50 hover:text-[#EDEDED]/80'
                }`}
              >
                Terminal
              </button>
              <button
                onClick={() => setActiveTab('console')}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${
                  activeTab === 'console' ? 'text-[#8BE9FD] border-b-2 border-[#8BE9FD]' : 'text-[#EDEDED]/50 hover:text-[#EDEDED]/80'
                }`}
              >
                Console
              </button>
              <button
                onClick={() => setActiveTab('problems')}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${
                  activeTab === 'problems' ? 'text-[#FF5555] border-b-2 border-[#FF5555]' : 'text-[#EDEDED]/50 hover:text-[#EDEDED]/80'
                }`}
              >
                Problems
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-4 font-mono text-sm overflow-auto h-[calc(100%-40px)]">
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
          </div>
        </div>

        {/* Right Sidebar - AI Assistant with Ripple Effect */}
        <div 
          className="w-80 border-l bg-[#161616] relative"
          style={{ borderColor: '#FFB86C40' }}
        >
          {/* Ripple Animation */}
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
