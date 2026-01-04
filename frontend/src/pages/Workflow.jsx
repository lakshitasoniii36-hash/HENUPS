import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Zap, Users, Terminal } from 'lucide-react';

function WorkflowCard({ children, delay, index }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-[#161616] p-10 rounded-xl border shadow-2xl overflow-hidden"
      style={{
        borderColor: isHovered ? `${children.props.color}60` : `${children.props.color}30`,
        transition: 'border-color 0.3s ease'
      }}
    >
      {/* Background gradient shift on hover */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${isHovered ? '50%' : '0%'} 50%, ${children.props.color}10, transparent)`,
          opacity: isHovered ? 0.5 : 0
        }}
      />
      
      {children}
    </motion.div>
  );
}

function ScenarioContent({ icon: Icon, title, color, children, isHovered }) {
  return (
    <div className="flex items-start gap-6 relative z-10">
      <div 
        className="p-4 rounded-lg transition-all duration-300" 
        style={{ 
          backgroundColor: `${color}20`,
          boxShadow: isHovered ? `0 0 20px ${color}40` : 'none'
        }}
      >
        <Icon size={40} color={color} />
      </div>
      <div className="flex-1">
        <h2 
          className="text-4xl font-semibold mb-6 relative inline-block" 
          style={{ color }}
        >
          {title}
          {/* Underline animation on hover */}
          <span
            className="absolute bottom-0 left-0 h-0.5 bg-current transition-all duration-500"
            style={{
              width: isHovered ? '100%' : '0%'
            }}
          />
        </h2>
        {children}
      </div>
    </div>
  );
}

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
      delay: 0.1
    },
    {
      icon: Zap,
      title: 'Lightning-Fast Multi-Language Support',
      color: '#50FA7B',
      delay: 0.2
    },
    {
      icon: Terminal,
      title: 'Integrated Terminal & AI-Powered Debugging',
      color: '#FFB86C',
      delay: 0.3
    },
    {
      icon: Users,
      title: 'Real-Time Collaboration for Distributed Teams',
      color: '#BD93F9',
      delay: 0.4
    }
  ];

  return (
    <div className=\"min-h-screen bg-[#000000] text-[#EDEDED] relative overflow-hidden\">\n      {/* Grain texture */}\n      <div \n        className=\"absolute inset-0 pointer-events-none\"\n        style={{\n          backgroundImage: 'url(\"data:image/svg+xml,%3Csvg viewBox=\\'0 0 200 200\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cfilter id=\\'noise\\'%3E%3CfeTurbulence type=\\'fractalNoise\\' baseFrequency=\\'0.9\\' numOctaves=\\'4\\' stitchTiles=\\'stitch\\'/%3E%3C/filter%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' filter=\\'url(%23noise)\\' opacity=\\'0.03\\'/%3E%3C/svg%3E\")',\n          zIndex: 100,\n          mixBlendMode: 'overlay'\n        }}\n      />\n\n      {/* Two-layer wave animation */}\n      <div className=\"absolute inset-0 overflow-hidden pointer-events-none\">\n        {/* Back layer - slower, blurrier */}\n        {[...Array(8)].map((_, i) => (\n          <motion.div\n            key={`back-${i}`}\n            className=\"absolute\"\n            style={{\n              width: '200px',\n              height: '100%',\n              background: `linear-gradient(180deg, \n                transparent 0%, \n                rgba(255, 121, 198, 0.08) 20%, \n                rgba(255, 121, 198, 0.12) 50%,\n                rgba(255, 121, 198, 0.08) 80%,\n                transparent 100%\n              )`,\n              left: `${i * 12}%`,\n              filter: 'blur(40px)',\n            }}\n            animate={{\n              y: ['-100%', '100%']\n            }}\n            transition={{\n              duration: 12 + i * 2,\n              repeat: Infinity,\n              ease: 'linear',\n              delay: i * 0.8\n            }}\n          />\n        ))}\n        \n        {/* Front layer - faster, sharper */}\n        {[...Array(6)].map((_, i) => (\n          <motion.div\n            key={`front-${i}`}\n            className=\"absolute\"\n            style={{\n              width: '150px',\n              height: '100%',\n              background: `linear-gradient(180deg, \n                transparent 0%, \n                rgba(255, 121, 198, 0.15) 25%, \n                rgba(255, 121, 198, 0.25) 50%,\n                rgba(255, 121, 198, 0.15) 75%,\n                transparent 100%\n              )`,\n              left: `${i * 16 + 5}%`,\n              filter: 'blur(20px)',\n            }}\n            animate={{\n              y: ['-100%', '100%']\n            }}\n            transition={{\n              duration: 8 + i * 1.5,\n              repeat: Infinity,\n              ease: 'linear',\n              delay: i * 0.6\n            }}\n          />\n        ))}\n      </div>\n\n      {/* Scroll progress indicator */}\n      <div\n        className=\"fixed right-0 top-0 w-1 bg-gradient-to-b from-transparent via-[#FF79C6] to-transparent transition-all duration-300\"\n        style={{\n          height: `${scrollProgress}%`,\n          opacity: 0.6\n        }}\n      />\n\n      {/* Content */}\n      <div className=\"relative z-10 max-w-7xl mx-auto px-8 py-20\">\n        <motion.h1 \n          initial={{ opacity: 0, y: -30 }}\n          animate={{ opacity: 1, y: 0 }}\n          transition={{ duration: 0.8 }}\n          className=\"text-7xl font-bold mb-16 text-center\" \n          style={{ color: '#FF79C6' }}\n        >\n          Workflow Scenarios\n        </motion.h1>\n        \n        <div className=\"space-y-16\">\n          {scenarios.map((scenario, idx) => (\n            <WorkflowCard key={idx} delay={scenario.delay} index={idx} color={scenario.color}>\n              <ScenarioContent \n                icon={scenario.icon} \n                title={scenario.title}\n                color={scenario.color}\n                isHovered={false}\n              >\n                <div className=\"space-y-4 text-lg leading-relaxed text-[#EDEDED]/90\">\n                  {idx === 0 && (\n                    <>\n                      <p>\n                        HENU PS leverages advanced AI algorithms to understand your coding patterns and context. \n                        As you type, the IDE analyzes your codebase, imports, and project structure to provide \n                        highly accurate suggestions.\n                      </p>\n                      <p>\n                        <strong style={{ color: '#FFB86C' }}>Key Features:</strong>\n                      </p>\n                      <ul className=\"list-disc list-inside space-y-2 ml-4\">\n                        <li>Context-aware completions based on your coding style</li>\n                        <li>Multi-language support with syntax-specific suggestions</li>\n                        <li>Automatic import management and dependency detection</li>\n                        <li>Smart refactoring suggestions to improve code quality</li>\n                        <li>Real-time error detection with instant fix recommendations</li>\n                      </ul>\n                      <p className=\"mt-4\" style={{ color: '#50FA7B' }}>\n                        <strong>Result:</strong> Write code 3x faster with 60% fewer errors. The AI learns from your \n                        patterns and adapts to your team's conventions.\n                      </p>\n                    </>\n                  )}\n                  {idx === 1 && (\n                    <>\n                      <p>\n                        Seamlessly work across Python, JavaScript, TypeScript, Go, Rust, Java, C++, and 20+ more \n                        languages without any configuration. HENU PS automatically detects your project type and \n                        configures the optimal environment.\n                      </p>\n                      <p>\n                        <strong style={{ color: '#FFB86C' }}>Workflow Example:</strong>\n                      </p>\n                      <ul className=\"list-disc list-inside space-y-2 ml-4\">\n                        <li>Open a Python Flask backend → Instant syntax highlighting and linting</li>\n                        <li>Switch to React TypeScript frontend → Auto-completion for JSX and hooks</li>\n                        <li>Edit Rust microservices → Cargo integration and memory safety checks</li>\n                        <li>Update SQL queries → Database schema awareness and query optimization</li>\n                      </ul>\n                      <p className=\"mt-4\" style={{ color: '#50FA7B' }}>\n                        <strong>Result:</strong> Zero context switching. Work on full-stack projects with polyglot \n                        codebases as smoothly as single-language projects.\n                      </p>\n                    </>\n                  )}\n                  {idx === 2 && (\n                    <>\n                      <p>\n                        Execute commands, run tests, debug issues, and deploy applications—all without leaving \n                        your workspace. The built-in terminal supports multiple shells and comes with AI-assisted \n                        command suggestions.\n                      </p>\n                      <p>\n                        <strong style={{ color: '#FFB86C' }}>Power User Workflow:</strong>\n                      </p>\n                      <ul className=\"list-disc list-inside space-y-2 ml-4\">\n                        <li>Split terminal view for parallel task execution</li>\n                        <li>AI suggests commands based on your intent (\"deploy to staging\" → full CI/CD command)</li>\n                        <li>Automatic error parsing with clickable stack traces</li>\n                        <li>Real-time log streaming with syntax highlighting</li>\n                        <li>Git integration with visual merge conflict resolution</li>\n                      </ul>\n                      <p className=\"mt-4\" style={{ color: '#50FA7B' }}>\n                        <strong>Result:</strong> Debug and deploy 5x faster. AI identifies issues before you do and \n                        suggests fixes with one-click application.\n                      </p>\n                    </>\n                  )}\n                  {idx === 3 && (\n                    <>\n                      <p>\n                        Share your workspace instantly with teammates. See live cursors, edits, and terminal output \n                        in real-time. Perfect for pair programming, code reviews, and onboarding new developers.\n                      </p>\n                      <p>\n                        <strong style={{ color: '#FFB86C' }}>Collaboration Features:</strong>\n                      </p>\n                      <ul className=\"list-disc list-inside space-y-2 ml-4\">\n                        <li>Live cursor tracking with teammate names and colors</li>\n                        <li>Shared terminal sessions for debugging together</li>\n                        <li>Voice and video chat built directly into the IDE</li>\n                        <li>Code review mode with inline comments and suggestions</li>\n                        <li>Session recording for async code walkthroughs</li>\n                        <li>Conflict-free collaborative editing with operational transforms</li>\n                      </ul>\n                      <p className=\"mt-4\" style={{ color: '#50FA7B' }}>\n                        <strong>Result:</strong> Remote teams feel like they're in the same room. Onboard junior \n                        developers 10x faster with live mentoring sessions.\n                      </p>\n                    </>\n                  )}\n                </div>\n              </ScenarioContent>\n            </WorkflowCard>\n          ))}\n        </div>\n      </div>\n    </div>\n  );\n}
