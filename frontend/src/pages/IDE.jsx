import React, { useState } from 'react';
import FileExplorer from '../components/ide/FileExplorer';
import CodeEditor from '../components/ide/CodeEditor';
import Terminal from '../components/ide/Terminal';
import AIAssistant from '../components/ide/AIAssistant';
import { Menu, X } from 'lucide-react';

export default function IDE() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [terminalVisible, setTerminalVisible] = useState(true);
  const [aiVisible, setAiVisible] = useState(true);

  return (
    <div className="h-screen bg-[#0D0D0D] flex flex-col overflow-hidden">
      {/* Top Bar */}
      <div 
        className="h-12 px-4 flex items-center border-b"
        style={{ 
          backgroundColor: '#161616',
          borderColor: '#FF79C6' + '40'
        }}
      >
        <div className="flex items-center gap-4">
          <span className="text-[#BD93F9] font-bold text-lg">HENU PS</span>
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
            borderColor: '#8BE9FD' + '40'
          }}
        >
          {/* Electrical Wave Animation */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div 
              className="absolute w-1 h-full animate-wave"
              style={{
                background: 'linear-gradient(180deg, transparent, #8BE9FD, transparent)',
                left: '20%',
                animation: 'wave 3s ease-in-out infinite'
              }}
            />
            <div 
              className="absolute w-1 h-full"
              style={{
                background: 'linear-gradient(180deg, transparent, #FF79C6, transparent)',
                left: '80%',
                animation: 'wave 4s ease-in-out infinite 1s'
              }}
            />
          </div>
          <FileExplorer onFileSelect={setSelectedFile} />
        </div>

        {/* Center - Editor */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <CodeEditor file={selectedFile} />
          
          {/* Bottom Terminal */}
          {terminalVisible && (
            <div 
              className="h-64 border-t"
              style={{ borderColor: '#50FA7B' + '40' }}
            >
              <Terminal />
            </div>
          )}
        </div>

        {/* Right Sidebar - AI Assistant */}
        {aiVisible && (
          <div 
            className="w-80 border-l"
            style={{ 
              backgroundColor: '#161616',
              borderColor: '#FFB86C' + '40'
            }}
          >
            <AIAssistant />
          </div>
        )}
      </div>

      <style>{`
        @keyframes wave {
          0%, 100% { transform: translateY(-100%); }
          50% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
}