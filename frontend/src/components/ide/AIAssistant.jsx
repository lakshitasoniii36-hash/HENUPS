import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';

const mockResponses = [
  "I can help you debug that issue. Let me analyze the code...",
  "Here's a suggestion: Consider using async/await for better error handling.",
  "I found a potential optimization in your loop. Would you like me to explain?",
  "That function looks good! You might want to add type hints for better clarity.",
  "Let me help you refactor that. Here's a cleaner approach..."
];

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    { type: 'assistant', text: 'Hi! I\'m your AI assistant. Ask me anything about your code!' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { type: 'user', text: input }]);
    setInput('');
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      const response = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      setMessages(prev => [...prev, { type: 'assistant', text: response }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col bg-[#161616]">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#FFB86C]/20 flex items-center gap-2">
        <Sparkles size={16} color="#FFB86C" />
        <span className="text-xs font-semibold text-[#FFB86C] uppercase tracking-wide">AI Assistant</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className="max-w-[80%] p-3 rounded-lg text-sm"
              style={{
                backgroundColor: msg.type === 'user' ? '#8BE9FD20' : '#FFB86C20',
                color: '#EDEDED',
                borderLeft: `3px solid ${msg.type === 'user' ? '#8BE9FD' : '#FFB86C'}`
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div
              className="p-3 rounded-lg text-sm"
              style={{
                backgroundColor: '#FFB86C20',
                color: '#EDEDED'
              }}
            >
              <span className="animate-pulse">Thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-[#FFB86C]/20">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything..."
            className="flex-1 px-3 py-2 rounded text-sm outline-none"
            style={{
              backgroundColor: '#0D0D0D',
              color: '#EDEDED',
              border: '1px solid #FFB86C40'
            }}
          />
          <Button
            onClick={handleSend}
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
  );
}