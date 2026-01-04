import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Zap, Users, Terminal } from 'lucide-react';

export default function Workflow() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scenarios = [
    {
      icon: Code,
      title: 'Intelligent Code Completion',
      color: '#8BE9FD',
      content: {
        intro: 'HENU PS leverages advanced AI algorithms to understand your coding patterns and context. As you type, the IDE analyzes your codebase, imports, and project structure to provide highly accurate suggestions.',
        features: [
          'Context-aware completions based on your coding style',
          'Multi-language support with syntax-specific suggestions',
          'Automatic import management and dependency detection',
          'Smart refactoring suggestions to improve code quality',
          'Real-time error detection with instant fix recommendations'
        ],
        result: 'Write code 3x faster with 60% fewer errors. The AI learns from your patterns and adapts to your team\'s conventions.'
      }
    },
    {
      icon: Zap,
      title: 'Lightning-Fast Multi-Language Support',
      color: '#50FA7B',
      content: {
        intro: 'Seamlessly work across Python, JavaScript, TypeScript, Go, Rust, Java, C++, and 20+ more languages without any configuration. HENU PS automatically detects your project type and configures the optimal environment.',
        features: [
          'Open a Python Flask backend → Instant syntax highlighting and linting',
          'Switch to React TypeScript frontend → Auto-completion for JSX and hooks',
          'Edit Rust microservices → Cargo integration and memory safety checks',
          'Update SQL queries → Database schema awareness and query optimization'
        ],
        result: 'Zero context switching. Work on full-stack projects with polyglot codebases as smoothly as single-language projects.'
      }
    },
    {
      icon: Terminal,
      title: 'Integrated Terminal & AI-Powered Debugging',
      color: '#FFB86C',
      content: {
        intro: 'Execute commands, run tests, debug issues, and deploy applications—all without leaving your workspace. The built-in terminal supports multiple shells and comes with AI-assisted command suggestions.',
        features: [
          'Split terminal view for parallel task execution',
          'AI suggests commands based on your intent',
          'Automatic error parsing with clickable stack traces',
          'Real-time log streaming with syntax highlighting',
          'Git integration with visual merge conflict resolution'
        ],
        result: 'Debug and deploy 5x faster. AI identifies issues before you do and suggests fixes with one-click application.'
      }
    },
    {
      icon: Users,
      title: 'Real-Time Collaboration for Distributed Teams',
      color: '#BD93F9',
      content: {
        intro: 'Share your workspace instantly with teammates. See live cursors, edits, and terminal output in real-time. Perfect for pair programming, code reviews, and onboarding new developers.',
        features: [
          'Live cursor tracking with teammate names and colors',
          'Shared terminal sessions for debugging together',
          'Voice and video chat built directly into the IDE',
          'Code review mode with inline comments and suggestions',
          'Session recording for async code walkthroughs'
        ],
        result: 'Remote teams feel like they\'re in the same room. Onboard junior developers 10x faster with live mentoring sessions.'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-[#EDEDED] relative overflow-hidden">
      {/* Grain texture */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
          zIndex: 100,
          mixBlendMode: 'overlay'
        }}
      />

      {/* Two-layer wave animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Back layer */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`back-${i}`}
            className="absolute"
            style={{
              width: '200px',
              height: '100%',
              background: `linear-gradient(180deg, transparent 0%, rgba(255, 121, 198, 0.08) 20%, rgba(255, 121, 198, 0.12) 50%, rgba(255, 121, 198, 0.08) 80%, transparent 100%)`,
              left: `${i * 12}%`,
              filter: 'blur(40px)'
            }}
            animate={{ y: ['-100%', '100%'] }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.8
            }}
          />
        ))}
        
        {/* Front layer */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`front-${i}`}
            className="absolute"
            style={{
              width: '150px',
              height: '100%',
              background: `linear-gradient(180deg, transparent 0%, rgba(255, 121, 198, 0.15) 25%, rgba(255, 121, 198, 0.25) 50%, rgba(255, 121, 198, 0.15) 75%, transparent 100%)`,
              left: `${i * 16 + 5}%`,
              filter: 'blur(20px)'
            }}
            animate={{ y: ['-100%', '100%'] }}
            transition={{
              duration: 8 + i * 1.5,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.6
            }}
          />
        ))}
      </div>

      {/* Scroll progress */}
      <div
        className="fixed right-0 top-0 w-1 bg-gradient-to-b from-transparent via-[#FF79C6] to-transparent transition-all duration-300"
        style={{ height: `${scrollProgress}%`, opacity: 0.6 }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-20">
        <motion.h1 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-7xl font-bold mb-16 text-center" 
          style={{ color: '#FF79C6' }}
        >
          Workflow Scenarios
        </motion.h1>
        
        <div className="space-y-16">
          {scenarios.map((scenario, idx) => {
            const Icon = scenario.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-[#161616] p-10 rounded-xl border shadow-2xl"
                style={{ borderColor: `${scenario.color}30` }}
              >
                <div className="flex items-start gap-6">
                  <div className="p-4 rounded-lg" style={{ backgroundColor: `${scenario.color}20` }}>
                    <Icon size={40} color={scenario.color} />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-4xl font-semibold mb-6" style={{ color: scenario.color }}>
                      {scenario.title}
                    </h2>
                    <div className="space-y-4 text-lg leading-relaxed text-[#EDEDED]/90">
                      <p>{scenario.content.intro}</p>
                      <p><strong style={{ color: '#FFB86C' }}>Key Features:</strong></p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        {scenario.content.features.map((feature, fidx) => (
                          <li key={fidx}>{feature}</li>
                        ))}
                      </ul>
                      <p className="mt-4" style={{ color: '#50FA7B' }}>
                        <strong>Result:</strong> {scenario.content.result}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}