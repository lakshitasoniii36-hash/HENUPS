import React from 'react';
import { BookOpen, FileCode, Terminal, Zap, Download } from 'lucide-react';
import { motion } from 'framer-motion';

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

export default function Resources() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#EDEDED]">
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-7xl font-bold mb-6" style={{ color: '#50FA7B' }}>
            Resources & Guides
          </h1>
          <p className="text-2xl text-[#EDEDED]/70">
            Everything you need to master HENU PS
          </p>
        </div>

        <div className="space-y-16">
          {resources.map((resource, idx) => {
            const Icon = resource.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#161616] rounded-xl border p-10"
                style={{ borderColor: `${resource.color}40` }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div 
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: `${resource.color}20` }}
                  >
                    <Icon size={40} style={{ color: resource.color }} />
                  </div>
                  <h2 className="text-4xl font-semibold" style={{ color: resource.color }}>
                    {resource.title}
                  </h2>
                </div>

                <div className="space-y-6">
                  {resource.steps.map((item, stepIdx) => (
                    <div key={stepIdx} className="flex items-start gap-6 p-6 bg-[#0D0D0D]/50 rounded-lg">
                      <div className="flex-shrink-0">
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${resource.color}30`, border: `2px solid ${resource.color}` }}
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
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Links */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 bg-[#161616] p-8 rounded-lg border border-[#6272A4]/40"
        >
          <h2 className="text-3xl font-semibold mb-6" style={{ color: '#BD93F9' }}>
            Quick Links
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <a href="#" className="text-[#8BE9FD] hover:underline text-lg">Documentation</a>
            <a href="#" className="text-[#8BE9FD] hover:underline text-lg">API Reference</a>
            <a href="#" className="text-[#8BE9FD] hover:underline text-lg">GitHub Repository</a>
            <a href="#" className="text-[#8BE9FD] hover:underline text-lg">Discord Community</a>
            <a href="#" className="text-[#8BE9FD] hover:underline text-lg">Report Issues</a>
            <a href="#" className="text-[#8BE9FD] hover:underline text-lg">Feature Requests</a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}