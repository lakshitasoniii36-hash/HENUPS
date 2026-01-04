import React from 'react';
import { motion } from 'framer-motion';

export default function Workflow() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#EDEDED] relative overflow-hidden">
      {/* Vertical Wave Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full"
            style={{
              height: '200px',
              background: `linear-gradient(180deg, transparent, rgba(255, 121, 198, 0.05), transparent)`,
              top: '-200px',
              left: `${i * 20}%`,
            }}
            animate={{
              y: ['0vh', '120vh']
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 1.5
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 py-20">
        <h1 className="text-6xl font-bold mb-12" style={{ color: '#FF79C6' }}>
          Workflow Scenarios
        </h1>
        
        <div className="space-y-12">
          <section className="bg-[#161616] p-8 rounded-lg border border-[#FF79C6]/20">
            <h2 className="text-3xl font-semibold mb-4" style={{ color: '#8BE9FD' }}>
              Intelligent Code Completion
            </h2>
            <p className="text-lg leading-relaxed text-[#EDEDED]/80">
              HENU PS understands your coding patterns and provides context-aware suggestions. 
              Write code faster with AI-powered completions that learn from your style.
            </p>
          </section>

          <section className="bg-[#161616] p-8 rounded-lg border border-[#8BE9FD]/20">
            <h2 className="text-3xl font-semibold mb-4" style={{ color: '#50FA7B' }}>
              Multi-Language Support
            </h2>
            <p className="text-lg leading-relaxed text-[#EDEDED]/80">
              Seamlessly work across Python, JavaScript, TypeScript, Go, Rust, and 20+ more languages. 
              Switch contexts without friction.
            </p>
          </section>

          <section className="bg-[#161616] p-8 rounded-lg border border-[#50FA7B]/20">
            <h2 className="text-3xl font-semibold mb-4" style={{ color: '#FFB86C' }}>
              Integrated Terminal & AI Assistant
            </h2>
            <p className="text-lg leading-relaxed text-[#EDEDED]/80">
              Execute commands, run scripts, and get instant AI help - all without leaving your workspace. 
              Debug faster, code smarter.
            </p>
          </section>

          <section className="bg-[#161616] p-8 rounded-lg border border-[#FFB86C]/20">
            <h2 className="text-3xl font-semibold mb-4" style={{ color: '#BD93F9' }}>
              Real-Time Collaboration
            </h2>
            <p className="text-lg leading-relaxed text-[#EDEDED]/80">
              Share your workspace, pair program, and review code together. 
              Built for modern distributed teams.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}