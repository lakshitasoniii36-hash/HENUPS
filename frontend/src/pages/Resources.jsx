import React, { useState, useEffect } from 'react';
import { BookOpen, FileCode, Terminal, Zap, Download } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const resources = [
  {
    title: 'Getting Started Guide',
    icon: BookOpen,
    color: '#FF79C6',
    steps: [
      {
        step: '1. Download HENU PS',
        description: 'Visit henu-ps.dev and download the installer for your OS (Windows, macOS, Linux)'
      },
      {
        step: '2. Installation',
        description: 'Run the installer. HENU PS will auto-configure based on your system and existing projects'
      },
      {
        step: '3. First Project',
        description: 'Open a folder or create a new project. HENU PS detects your tech stack automatically'
      },
      {
        step: '4. Explore Features',
        description: 'Try AI code completion (Ctrl+Space), integrated terminal (Ctrl+`), and live collaboration'
      }
    ]
  },
  {
    title: 'Keyboard Shortcuts',
    icon: Zap,
    color: '#8BE9FD',
    steps: [
      {
        step: 'Essential Shortcuts',
        description: 'Ctrl+P: Quick file open | Ctrl+Shift+P: Command palette | Ctrl+B: Toggle sidebar'
      },
      {
        step: 'Code Navigation',
        description: 'F12: Go to definition | Shift+F12: Find references | Ctrl+.: Quick fix'
      },
      {
        step: 'Terminal & Debug',
        description: 'Ctrl+`: Open terminal | F5: Start debugging | Shift+F5: Stop debugging'
      },
      {
        step: 'Customize',
        description: 'Go to File → Preferences → Keyboard Shortcuts to customize or export your bindings'
      }
    ]
  },
  {
    title: 'Extension Development',
    icon: FileCode,
    color: '#50FA7B',
    steps: [
      {
        step: '1. Setup Extension Project',
        description: 'Use `henu-cli create-extension` to scaffold a new extension with TypeScript templates'
      },
      {
        step: '2. Extension API',
        description: 'Access the full HENU PS API: editor, workspace, terminal, UI components, and AI services'
      },
      {
        step: '3. Testing',
        description: 'Press F5 to launch an Extension Development Host with your extension loaded for live testing'
      },
      {
        step: '4. Publishing',
        description: 'Package with `henu-cli package` and publish to HENU Marketplace with `henu-cli publish`'
      }
    ]
  },
  {
    title: 'Terminal Integration',
    icon: Terminal,
    color: '#FFB86C',
    steps: [
      {
        step: 'Multi-Shell Support',
        description: 'Use Bash, Zsh, PowerShell, or Fish. Switch profiles via dropdown in terminal panel'
      },
      {
        step: 'AI Command Assist',
        description: 'Type natural language like "find large files" and HENU suggests the exact command'
      },
      {
        step: 'Task Runner',
        description: 'Configure tasks in .henu/tasks.json for one-click build, test, deploy workflows'
      },
      {
        step: 'Split Terminals',
        description: 'Click split icon to run multiple commands side-by-side. Sync scroll with Ctrl+Shift+S'
      }
    ]
  }
];

function ResourceSection({ resource, index }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = resource.icon;
  const [iconPulsed, setIconPulsed] = useState(false);

  useEffect(() => {
    if (isInView && !iconPulsed) {
      setIconPulsed(true);
    }
  }, [isInView, iconPulsed]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-[#161616] rounded-xl border p-10"
      style={{ 
        borderColor: `${resource.color}30`,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
      }}
    >
      <div className="flex items-center gap-4 mb-8">
        <motion.div 
          className="p-4 rounded-lg"
          style={{ backgroundColor: `${resource.color}20` }}
          animate={iconPulsed ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.6 }}
        >
          <Icon size={40} style={{ color: resource.color }} />
        </motion.div>
        <h2 className="text-4xl font-semibold" style={{ color: resource.color }}>
          {resource.title}
        </h2>
      </div>

      <div className="space-y-6">
        {resource.steps.map((item, stepIdx) => {
          const stepRef = React.useRef(null);
          const stepInView = useInView(stepRef, { once: true, margin: "-50px" });
          const isCurrentStep = stepInView && !resource.steps[stepIdx + 1] || 
            (stepInView && !useInView(React.useRef(null), { once: true }));
          
          return (
            <motion.div 
              key={stepIdx} 
              ref={stepRef}
              initial={{ opacity: 0.5 }}
              animate={{ 
                opacity: stepInView ? 1 : 0.5,
                scale: isCurrentStep ? 1 : 0.98
              }}
              transition={{ duration: 0.3 }}
              className="flex items-start gap-6 p-6 bg-[#0D0D0D]/50 rounded-lg"
              style={{
                border: isCurrentStep ? `1px solid ${resource.color}40` : '1px solid transparent',
                transition: 'all 0.3s ease'
              }}
            >
              <div className="flex-shrink-0">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ 
                    backgroundColor: `${resource.color}30`, 
                    border: `2px solid ${resource.color}` 
                  }}
                >
                  <Download size={24} style={{ color: resource.color }} />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#EDEDED' }}>
                  {item.step}
                </h3>
                <p className="text-[#EDEDED]/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default function Resources() {
  return (
    <div className="min-h-screen bg-[#000000] text-[#EDEDED]">
      {/* Grain texture */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.03\'/%3E%3C/svg%3E")',
          zIndex: 100,
          mixBlendMode: 'overlay'
        }}
      />

      <div className="max-w-7xl mx-auto px-8 py-20 relative z-10">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-7xl font-bold mb-6" 
            style={{ color: '#50FA7B' }}
          >
            Resources & Guides
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl text-[#EDEDED]/70"
          >
            Everything you need to master HENU PS
          </motion.p>
        </div>

        <div className="space-y-16">
          {resources.map((resource, idx) => (
            <ResourceSection key={idx} resource={resource} index={idx} />
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 bg-[#161616] p-8 rounded-lg border border-[#6272A4]/40"
        >
          <h2 className="text-3xl font-semibold mb-6" style={{ color: '#BD93F9' }}>
            Quick Links
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <a href="#" className="text-[#8BE9FD] hover:underline text-lg transition-all duration-300">Documentation</a>
            <a href="#" className="text-[#8BE9FD] hover:underline text-lg transition-all duration-300">API Reference</a>
            <a href="#" className="text-[#8BE9FD] hover:underline text-lg transition-all duration-300">GitHub Repository</a>
            <a href="#" className="text-[#8BE9FD] hover:underline text-lg transition-all duration-300">Discord Community</a>
            <a href="#" className="text-[#8BE9FD] hover:underline text-lg transition-all duration-300">Report Issues</a>
            <a href="#" className="text-[#8BE9FD] hover:underline text-lg transition-all duration-300">Feature Requests</a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}