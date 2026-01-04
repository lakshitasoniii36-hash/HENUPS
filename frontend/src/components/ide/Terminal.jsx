import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';

export default function Terminal() {
  const [history, setHistory] = useState([
    { type: 'output', text: 'HENU PS Terminal v1.0.0' },
    { type: 'output', text: 'Type "help" for available commands' }
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim();
    setHistory(prev => [...prev, { type: 'input', text: `$ ${trimmed}` }]);

    // Mock command responses
    let output = '';
    if (trimmed === 'help') {
      output = 'Available commands: help, clear, ls, pwd, echo, date';
    } else if (trimmed === 'clear') {
      setHistory([]);
      setInput('');
      return;
    } else if (trimmed === 'ls') {
      output = 'src/  backend/  README.md  package.json';
    } else if (trimmed === 'pwd') {
      output = '/workspace/my-project';
    } else if (trimmed.startsWith('echo ')) {
      output = trimmed.substring(5);
    } else if (trimmed === 'date') {
      output = new Date().toString();
    } else if (trimmed) {
      output = `Command not found: ${trimmed}`;
    }

    if (output) {
      setHistory(prev => [...prev, { type: 'output', text: output }]);
    }
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#161616]">
      {/* Terminal Header */}
      <div className="px-4 py-2 border-b border-[#50FA7B]/20 flex items-center gap-2">
        <TerminalIcon size={16} color="#50FA7B" />
        <span className="text-xs font-semibold text-[#50FA7B] uppercase tracking-wide">Terminal</span>
      </div>

      {/* Terminal Content */}
      <div 
        className="flex-1 overflow-y-auto p-4 font-mono text-sm"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((entry, idx) => (
          <div
            key={idx}
            className="mb-1"
            style={{
              color: entry.type === 'input' ? '#8BE9FD' : '#EDEDED'
            }}
          >
            {entry.text}
          </div>
        ))}
        
        <div className="flex items-center gap-2">
          <span style={{ color: '#50FA7B' }}>$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none"
            style={{ color: '#EDEDED' }}
            autoFocus
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}