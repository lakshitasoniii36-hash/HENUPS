import React from 'react';
import { motion } from 'framer-motion';
import { Code, Zap, Users, Terminal } from 'lucide-react';

export default function Workflow() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#EDEDED] relative overflow-hidden">
      {/* Enhanced Vertical Wave Animation - Full Height */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: '180px',
              height: '100%',
              background: `linear-gradient(180deg, 
                transparent 0%, 
                rgba(255, 121, 198, 0.15) 20%, 
                rgba(255, 121, 198, 0.25) 40%,
                rgba(255, 121, 198, 0.15) 60%,
                transparent 80%
              )`,
              left: `${i * 10}%`,
              filter: 'blur(25px)',
            }}
            animate={{
              y: ['-100%', '100%']
            }}
            transition={{
              duration: 8 + i * 1.5,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.6
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-20">
        <h1 className="text-7xl font-bold mb-16 text-center" style={{ color: '#FF79C6' }}>
          Workflow Scenarios
        </h1>
        
        <div className="space-y-16">
          {/* Scenario 1 */}
          <motion.section 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[#161616] p-10 rounded-xl border border-[#FF79C6]/30 shadow-2xl"
          >
            <div className="flex items-start gap-6">
              <div className="p-4 rounded-lg" style={{ backgroundColor: '#FF79C620' }}>
                <Code size={40} color="#8BE9FD" />
              </div>
              <div className="flex-1">
                <h2 className="text-4xl font-semibold mb-6" style={{ color: '#8BE9FD' }}>
                  Intelligent Code Completion
                </h2>
                <div className="space-y-4 text-lg leading-relaxed text-[#EDEDED]/90">
                  <p>
                    HENU PS leverages advanced AI algorithms to understand your coding patterns and context. 
                    As you type, the IDE analyzes your codebase, imports, and project structure to provide 
                    highly accurate suggestions.
                  </p>
                  <p>
                    <strong style={{ color: '#FFB86C' }}>Key Features:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Context-aware completions based on your coding style</li>
                    <li>Multi-language support with syntax-specific suggestions</li>
                    <li>Automatic import management and dependency detection</li>
                    <li>Smart refactoring suggestions to improve code quality</li>
                    <li>Real-time error detection with instant fix recommendations</li>
                  </ul>
                  <p className="mt-4" style={{ color: '#50FA7B' }}>
                    <strong>Result:</strong> Write code 3x faster with 60% fewer errors. The AI learns from your 
                    patterns and adapts to your team's conventions.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Scenario 2 */}
          <motion.section 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#161616] p-10 rounded-xl border border-[#8BE9FD]/30 shadow-2xl"
          >
            <div className="flex items-start gap-6">
              <div className="p-4 rounded-lg" style={{ backgroundColor: '#8BE9FD20' }}>
                <Zap size={40} color="#FFB86C" />
              </div>
              <div className="flex-1">
                <h2 className="text-4xl font-semibold mb-6" style={{ color: '#50FA7B' }}>
                  Lightning-Fast Multi-Language Support
                </h2>
                <div className="space-y-4 text-lg leading-relaxed text-[#EDEDED]/90">
                  <p>
                    Seamlessly work across Python, JavaScript, TypeScript, Go, Rust, Java, C++, and 20+ more 
                    languages without any configuration. HENU PS automatically detects your project type and 
                    configures the optimal environment.
                  </p>
                  <p>
                    <strong style={{ color: '#FFB86C' }}>Workflow Example:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Open a Python Flask backend → Instant syntax highlighting and linting</li>
                    <li>Switch to React TypeScript frontend → Auto-completion for JSX and hooks</li>
                    <li>Edit Rust microservices → Cargo integration and memory safety checks</li>
                    <li>Update SQL queries → Database schema awareness and query optimization</li>
                  </ul>
                  <p className="mt-4" style={{ color: '#50FA7B' }}>
                    <strong>Result:</strong> Zero context switching. Work on full-stack projects with polyglot 
                    codebases as smoothly as single-language projects.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Scenario 3 */}
          <motion.section 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-[#161616] p-10 rounded-xl border border-[#50FA7B]/30 shadow-2xl"
          >
            <div className="flex items-start gap-6">
              <div className="p-4 rounded-lg" style={{ backgroundColor: '#50FA7B20' }}>
                <Terminal size={40} color="#FF79C6" />
              </div>
              <div className="flex-1">
                <h2 className="text-4xl font-semibold mb-6" style={{ color: '#FFB86C' }}>
                  Integrated Terminal & AI-Powered Debugging
                </h2>
                <div className="space-y-4 text-lg leading-relaxed text-[#EDEDED]/90">
                  <p>
                    Execute commands, run tests, debug issues, and deploy applications—all without leaving 
                    your workspace. The built-in terminal supports multiple shells and comes with AI-assisted 
                    command suggestions.
                  </p>
                  <p>
                    <strong style={{ color: '#FFB86C' }}>Power User Workflow:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Split terminal view for parallel task execution</li>
                    <li>AI suggests commands based on your intent ("deploy to staging" → full CI/CD command)</li>
                    <li>Automatic error parsing with clickable stack traces</li>
                    <li>Real-time log streaming with syntax highlighting</li>
                    <li>Git integration with visual merge conflict resolution</li>
                  </ul>
                  <p className="mt-4" style={{ color: '#50FA7B' }}>
                    <strong>Result:</strong> Debug and deploy 5x faster. AI identifies issues before you do and 
                    suggests fixes with one-click application.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Scenario 4 */}
          <motion.section 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-[#161616] p-10 rounded-xl border border-[#FFB86C]/30 shadow-2xl"
          >
            <div className="flex items-start gap-6">
              <div className="p-4 rounded-lg" style={{ backgroundColor: '#FFB86C20' }}>
                <Users size={40} color="#50FA7B" />
              </div>
              <div className="flex-1">
                <h2 className="text-4xl font-semibold mb-6" style={{ color: '#BD93F9' }}>
                  Real-Time Collaboration for Distributed Teams
                </h2>
                <div className="space-y-4 text-lg leading-relaxed text-[#EDEDED]/90">
                  <p>
                    Share your workspace instantly with teammates. See live cursors, edits, and terminal output 
                    in real-time. Perfect for pair programming, code reviews, and onboarding new developers.
                  </p>
                  <p>
                    <strong style={{ color: '#FFB86C' }}>Collaboration Features:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Live cursor tracking with teammate names and colors</li>
                    <li>Shared terminal sessions for debugging together</li>
                    <li>Voice and video chat built directly into the IDE</li>
                    <li>Code review mode with inline comments and suggestions</li>
                    <li>Session recording for async code walkthroughs</li>
                    <li>Conflict-free collaborative editing with operational transforms</li>
                  </ul>
                  <p className="mt-4" style={{ color: '#50FA7B' }}>
                    <strong>Result:</strong> Remote teams feel like they're in the same room. Onboard junior 
                    developers 10x faster with live mentoring sessions.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}