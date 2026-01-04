import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Download } from 'lucide-react';
import { Button } from './ui/button';

export default function Navigation() {
  const location = useLocation();
  const [downloadGlow, setDownloadGlow] = useState(false);

  useEffect(() => {
    const glowInterval = setInterval(() => {
      setDownloadGlow(true);
      setTimeout(() => setDownloadGlow(false), 1500);
    }, 12000);
    
    return () => clearInterval(glowInterval);
  }, []);
  
  // Don't show navigation in IDE
  if (location.pathname === '/ide') return null;

  const navLinks = [
    { path: '/', label: 'HENU PS' },
    { path: '/workflow', label: 'WORKFLOW SCENARIO' },
    { path: '/blog', label: 'BLOG' },
    { path: '/resources', label: 'RESOURCES' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#000000]/90 backdrop-blur-md border-b border-[#FF79C6]/20">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        {/* Left Navigation */}
        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="relative text-sm font-medium tracking-wide transition-all duration-300 group"
              style={{
                color: location.pathname === link.path ? '#FF79C6' : '#EDEDED',
                textShadow: location.pathname === link.path ? '0 0 10px rgba(255, 121, 198, 0.5)' : 'none'
              }}
            >
              {link.label}
              <span 
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF79C6] transition-all duration-500 group-hover:w-full"
                style={{
                  boxShadow: '0 0 8px rgba(255, 121, 198, 0.6)'
                }}
              />
            </Link>
          ))}
        </div>

        {/* Right - Download Button */}
        <Button
          className="px-6 py-2 rounded-full transition-all duration-300"
          style={{
            backgroundColor: '#EDEDED',
            color: '#0D0D0D',
            boxShadow: downloadGlow 
              ? '0 0 30px rgba(237, 237, 237, 0.5)' 
              : '0 0 20px rgba(237, 237, 237, 0.2)',
            transition: 'box-shadow 1.5s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 30px rgba(237, 237, 237, 0.4)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 0 20px rgba(237, 237, 237, 0.2)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <Download size={16} className="mr-2" />
          Download
        </Button>
      </div>
    </nav>
  );
}