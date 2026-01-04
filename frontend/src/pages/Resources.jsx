import React from 'react';
import { Download, BookOpen, FileCode, Terminal, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';

const resources = [
  {
    title: 'Getting Started Guide',
    description: 'Learn the basics of HENU PS in 10 minutes. Installation, setup, and first project.',
    icon: BookOpen,
    downloadUrl: '#',
    color: '#FF79C6'
  },
  {
    title: 'Keyboard Shortcuts',
    description: 'Complete reference of keyboard shortcuts to supercharge your productivity.',
    icon: Zap,
    downloadUrl: '#',
    color: '#8BE9FD'
  },
  {
    title: 'Extension Development',
    description: 'Build custom extensions for HENU PS. API documentation and examples included.',
    icon: FileCode,
    downloadUrl: '#',
    color: '#50FA7B'
  },
  {
    title: 'Terminal Integration',
    description: 'Master the integrated terminal. Command execution, customization, and tips.',
    icon: Terminal,
    downloadUrl: '#',
    color: '#FFB86C'
  }
];

export default function Resources() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#EDEDED]">
      <div className="max-w-6xl mx-auto px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6" style={{ color: '#50FA7B' }}>
            Resources & Downloads
          </h1>
          <p className="text-xl text-[#EDEDED]/70">
            Everything you need to master HENU PS
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {resources.map((resource, idx) => {
            const Icon = resource.icon;
            return (
              <div
                key={idx}
                className="bg-[#161616] p-8 rounded-lg border hover:border-opacity-80 transition-all duration-300"
                style={{ borderColor: `${resource.color}40` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div 
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: `${resource.color}20` }}
                  >
                    <Icon size={32} style={{ color: resource.color }} />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold mb-2" style={{ color: resource.color }}>
                      {resource.title}
                    </h2>
                  </div>
                </div>
                <p className="text-[#EDEDED]/70 mb-6">
                  {resource.description}
                </p>
                <Button
                  className="w-full transition-all duration-300"
                  style={{
                    backgroundColor: resource.color,
                    color: '#0D0D0D'
                  }}
                >
                  <Download size={18} className="mr-2" />
                  Download Guide
                </Button>
              </div>
            );
          })}
        </div>

        {/* Quick Links */}
        <div className="bg-[#161616] p-8 rounded-lg border border-[#6272A4]/40">
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
        </div>
      </div>
    </div>
  );
}