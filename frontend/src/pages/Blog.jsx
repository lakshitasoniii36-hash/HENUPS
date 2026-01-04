import React, { useEffect, useState } from 'react';
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

function FilmReel({ direction, items, delay }) {
  return (
    <motion.div
      className="flex gap-8 whitespace-nowrap py-4"
      initial={{ x: direction === 'ltr' ? '-100%' : '0%' }}
      animate={{ x: direction === 'ltr' ? '0%' : '-100%' }}
      transition={{
        duration: 20,
        ease: 'linear',
        delay: delay
      }}
    >
      {items.map((post, idx) => (
        <div
          key={idx}
          className="inline-block px-6 py-4 rounded-lg border"
          style={{
            backgroundColor: '#161616',
            borderColor: `${post.color}40`,
            minWidth: '300px'
          }}
        >
          <h3 className="text-xl font-semibold mb-2" style={{ color: post.color }}>
            {post.title}
          </h3>
          <p className="text-sm text-[#6272A4] mb-2">{post.date}</p>
        </div>
      ))}
    </motion.div>
  );
}

export default function Blog() {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimationComplete(true), 20000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#EDEDED]">
      {/* Film Reel Animation */}
      {!animationComplete && (
        <div className="fixed inset-0 flex flex-col justify-center gap-8 overflow-hidden pointer-events-none z-0">
          <FilmReel direction="ltr" items={blogPosts.slice(0, 2)} delay={0} />
          <FilmReel direction="rtl" items={blogPosts.slice(2, 4)} delay={0} />
          <FilmReel direction="ltr" items={blogPosts.slice(4, 6)} delay={0} />
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 py-20">
        <h1 className="text-6xl font-bold mb-12" style={{ color: '#8BE9FD' }}>
          Blog & Updates
        </h1>

        <div className="grid gap-8">
          {blogPosts.map((post, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: animationComplete ? 0 : idx * 0.1 + 0.5 }}
              className="bg-[#161616] p-8 rounded-lg border hover:border-opacity-60 transition-all duration-300"
              style={{ borderColor: `${post.color}40` }}
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