import React from 'react';
import { motion } from 'framer-motion';

const blogPosts = [
  {
    title: 'Introducing HENU PS',
    date: '2025-01-15',
    excerpt: 'A new era of code editing begins. HENU PS combines minimalist design with powerful features.',
    color: '#FF79C6'
  },
  {
    title: 'The Philosophy Behind HENU',
    date: '2025-01-20',
    excerpt: 'Why we built HENU PS from the ground up. Design decisions that matter.',
    color: '#8BE9FD'
  },
  {
    title: 'Performance Optimization',
    date: '2025-01-25',
    excerpt: 'How HENU PS achieves lightning-fast performance across large codebases.',
    color: '#50FA7B'
  },
  {
    title: 'AI Integration Done Right',
    date: '2025-02-01',
    excerpt: 'Our approach to AI assistance: helpful, not intrusive. Smart, not overbearing.',
    color: '#FFB86C'
  },
  {
    title: 'Community & Open Source',
    date: '2025-02-05',
    excerpt: 'Building HENU PS with the community. Open source contributions and roadmap.',
    color: '#BD93F9'
  },
  {
    title: 'The Future of IDEs',
    date: '2025-02-10',
    excerpt: 'What comes next? Our vision for the future of development environments.',
    color: '#FF79C6'
  }
];

function FilmReel({ position, direction }) {
  const reelHoles = Array.from({ length: 20 });
  
  return (
    <div
      className="absolute flex items-center gap-2"
      style={{
        top: position,
        left: direction === 'ltr' ? '-100%' : 'auto',
        right: direction === 'rtl' ? '-100%' : 'auto',
        width: '200%',
      }}
    >
      <motion.div
        className="flex items-center"
        animate={{
          x: direction === 'ltr' ? ['0%', '100%'] : ['0%', '-100%']
        }}
        transition={{
          duration: 15,
          ease: 'linear',
          repeat: Infinity
        }}
      >
        {/* Film strip */}
        <div className="flex items-center" style={{ width: '200%' }}>
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="flex items-center">
              {/* Left perforations */}
              <div className="flex flex-col gap-3 py-2">
                {reelHoles.map((_, i) => (
                  <div
                    key={`left-${i}`}
                    className="w-4 h-4 rounded-sm"
                    style={{ backgroundColor: '#8B7355' }}
                  />
                ))}
              </div>
              
              {/* Film frames */}
              <div className="mx-2">
                {blogPosts.map((post, i) => (
                  <div
                    key={i}
                    className="mb-2 px-6 py-4 rounded"
                    style={{
                      backgroundColor: '#8B7355',
                      width: '300px',
                      border: '2px solid #6B5345'
                    }}
                  >
                    <div className="text-sm font-semibold" style={{ color: '#FFE4C4' }}>
                      {post.title}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Right perforations */}
              <div className="flex flex-col gap-3 py-2">
                {reelHoles.map((_, i) => (
                  <div
                    key={`right-${i}`}
                    className="w-4 h-4 rounded-sm"
                    style={{ backgroundColor: '#8B7355' }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function Blog() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#EDEDED] relative overflow-hidden">
      {/* Film Reel Animations */}
      <div className="fixed inset-0 pointer-events-none" style={{ opacity: 0.4 }}>
        <FilmReel position="15%" direction="ltr" />
        <FilmReel position="45%" direction="rtl" />
        <FilmReel position="75%" direction="ltr" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 py-20">
        <h1 className="text-7xl font-bold mb-16 text-center" style={{ color: '#8BE9FD' }}>
          Blog & Updates
        </h1>

        <div className="grid gap-8">
          {blogPosts.map((post, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#161616] p-8 rounded-lg border hover:border-opacity-80 transition-all duration-300 cursor-pointer"
              style={{ borderColor: `${post.color}40` }}
              whileHover={{ scale: 1.02 }}
            >
              <h2 className="text-3xl font-semibold mb-3" style={{ color: post.color }}>
                {post.title}
              </h2>
              <p className="text-sm mb-4" style={{ color: '#6272A4' }}>
                {post.date}
              </p>
              <p className="text-lg leading-relaxed text-[#EDEDED]/80">
                {post.excerpt}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}