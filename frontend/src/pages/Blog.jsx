import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const blogPosts = [
  {
    title: 'Introducing HENU PS',
    date: 'January 15, 2025',
    content: 'A new era of code editing begins with HENU PS. We have combined minimalist design principles with powerful features to create an IDE that feels both elegant and capable. Every pixel, every interaction has been crafted with intention. The journey started two years ago when we realized that existing IDEs were either too cluttered or too basic. We wanted something different—something that respects your intelligence while enhancing your productivity.',
    color: '#FF79C6'
  },
  {
    title: 'The Philosophy Behind HENU',
    date: 'January 20, 2025',
    content: 'Why did we build HENU PS from the ground up? The answer lies in our design philosophy: simplicity without sacrifice. We believe that an IDE should fade into the background, letting your code take center stage. But simplicity doesn\'t mean lacking features. Every decision was deliberate—from our dark-first color palette to our keyboard-first navigation. We studied how developers actually work, not how we think they should work.',
    color: '#8BE9FD'
  },
  {
    title: 'Performance Optimization',
    date: 'January 25, 2025',
    content: 'How does HENU PS achieve lightning-fast performance across large codebases? Through aggressive optimization and smart architecture. We use incremental parsing, lazy loading, and virtual rendering to keep everything snappy. Even with million-line projects, code navigation feels instant. Our custom syntax highlighting engine is 3x faster than traditional approaches. Memory usage stays lean through intelligent garbage collection and resource pooling.',
    color: '#50FA7B'
  },
  {
    title: 'AI Integration Done Right',
    date: 'February 1, 2025',
    content: 'Our approach to AI assistance is simple: helpful, not intrusive. Smart, not overbearing. The AI observes your patterns and learns your style. It suggests when you need help but never interrupts your flow. Unlike other IDEs where AI feels bolted on, we built it into the core architecture. The result? Completions that feel like mind-reading, refactoring that anticipates your intent, and debugging help that actually understands your code.',
    color: '#FFB86C'
  },
  {
    title: 'Community & Open Source',
    date: 'February 5, 2025',
    content: 'Building HENU PS with the community has been transformative. We open-sourced our core components and the response was overwhelming. Developers from 50+ countries have contributed plugins, themes, and improvements. Our extension marketplace has grown to over 1000 tools. We host monthly community calls where users drive the roadmap. This isn\'t just our IDE—it\'s our IDE together.',
    color: '#BD93F9'
  },
  {
    title: 'The Future of IDEs',
    date: 'February 10, 2025',
    content: 'What comes next? Our vision for the future of development environments is bold. We\'re exploring voice coding, AR/VR interfaces, and quantum-ready tooling. But the core remains: empowering developers to do their best work. We\'re building features for seamless cross-device workflows, real-time global collaboration, and AI pair programming that feels natural. The IDE of tomorrow will be more assistant than tool—and we\'re building it today.',
    color: '#FF79C6'
  }
];

function TransparentFilmReel({ position, direction }) {
  const reelHoles = Array.from({ length: 25 });
  const [hasPlayed, setHasPlayed] = useState(false);
  
  return (
    <div
      className="absolute flex items-center gap-2"
      style={{
        top: position,
        left: direction === 'ltr' ? '-100%' : 'auto',
        right: direction === 'rtl' ? '-100%' : 'auto',
        width: '200%',
        opacity: hasPlayed ? 0.05 : 0.15,
        pointerEvents: 'none',
        transition: 'opacity 3s ease'
      }}
    >
      <motion.div
        className="flex items-center"
        animate={{
          x: direction === 'ltr' ? ['0%', '100%'] : ['0%', '-100%']
        }}
        transition={{
          duration: 20,
          ease: 'linear',
          repeat: 0
        }}
        onAnimationComplete={() => setHasPlayed(true)}
      >
        <div className="flex items-center" style={{ width: '200%' }}>
          {[...Array(2)].map((_, idx) => (
            <div key={idx} className="flex items-center">
              <div className="flex flex-col gap-4 py-2">
                {reelHoles.map((_, i) => (
                  <div
                    key={`left-${i}`}
                    className="w-3 h-3 rounded-full"
                    style={{ 
                      backgroundColor: '#8B7355',
                      border: '1px solid #6B5345'
                    }}
                  />
                ))}
              </div>
              <div 
                className="mx-1"
                style={{
                  width: '100px',
                  height: `${reelHoles.length * 20}px`,
                  backgroundColor: '#8B7355',
                  border: '2px solid #6B5345',
                  borderLeft: 'none',
                  borderRight: 'none'
                }}
              />
              <div className="flex flex-col gap-4 py-2">
                {reelHoles.map((_, i) => (
                  <div
                    key={`right-${i}`}
                    className="w-3 h-3 rounded-full"
                    style={{ 
                      backgroundColor: '#8B7355',
                      border: '1px solid #6B5345'
                    }}
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

function BlogArticle({ post, index }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [focusMode, setFocusMode] = useState(false);
  
  useEffect(() => {
    if (isInView) {
      setFocusMode(true);
      const timer = setTimeout(() => setFocusMode(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const sentences = post.content.split('. ');

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      className="space-y-4 relative"
      style={{
        transition: 'all 0.5s ease'
      }}
    >
      <h2 
        className="text-4xl font-bold transition-all duration-500" 
        style={{ 
          color: post.color,
          transform: focusMode ? 'scale(1.02)' : 'scale(1)'
        }}
      >
        {post.title}
      </h2>
      <p className="text-sm" style={{ color: '#6272A4' }}>
        {post.date}
      </p>
      <div className="space-y-2">
        {sentences.map((sentence, idx) => (
          <motion.span
            key={idx}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="inline text-lg leading-relaxed"
            style={{ 
              color: focusMode ? '#EDEDED' : 'rgba(237, 237, 237, 0.85)',
              transition: 'color 0.5s ease'
            }}
          >
            {sentence}. 
          </motion.span>
        ))}
      </div>
      {index < blogPosts.length - 1 && (
        <div 
          className="mt-12 h-px" 
          style={{ 
            background: 'linear-gradient(90deg, transparent, rgba(255, 121, 198, 0.2), transparent)' 
          }} 
        />
      )}
    </motion.article>
  );
}

export default function Blog() {
  return (
    <div className="min-h-screen bg-[#000000] text-[#EDEDED] relative overflow-hidden">
      {/* Grain texture */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.03\'/%3E%3C/svg%3E")',
          zIndex: 100,
          mixBlendMode: 'overlay'
        }}
      />

      {/* Transparent Film Reel - plays once */}
      <div className="fixed inset-0 pointer-events-none">
        <TransparentFilmReel position="10%" direction="ltr" />
        <TransparentFilmReel position="40%" direction="rtl" />
        <TransparentFilmReel position="70%" direction="ltr" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-8 py-20">
        <motion.h1 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-7xl font-bold mb-20 text-center" 
          style={{ color: '#8BE9FD' }}
        >
          Blog & Updates
        </motion.h1>

        <div className="space-y-16">
          {blogPosts.map((post, idx) => (
            <BlogArticle key={idx} post={post} index={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}