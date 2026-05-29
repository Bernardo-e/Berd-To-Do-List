import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

export default function EmptyState({ activeFilter }) {
  const getMessages = () => {
    switch (activeFilter) {
      case 'completed':
        return {
          title: "No completed tasks yet",
          sub: "Every little step counts! Complete a task to see it celebrated here.",
          emoji: "🌱"
        };
      case 'pending':
        return {
          title: "Hooray! No pending tasks",
          sub: "You have completely cleared your plate! Time to take a cozy break.",
          emoji: "✨"
        };
      default:
        return {
          title: "Your day is a clean slate",
          sub: "Add a task below to start organizing your cozy, beautiful day.",
          emoji: "🌸"
        };
    }
  };

  const { title, sub, emoji } = getMessages();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="cozy-transition flex flex-col items-center justify-center text-center p-8 rounded-3xl bg-cozy-card-light dark:bg-cozy-card-dark border border-dashed border-cozy-accent/30 dark:border-cozy-text-secondary-dark/20 min-h-[340px] shadow-sm select-none"
    >
      {/* Animated Cute Custom SVG: Steaming Mug & Sleeping Cat */}
      <div className="relative mb-6">
        <svg 
          width="200" 
          height="160" 
          viewBox="0 0 200 160" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-48 h-36 drop-shadow-sm text-cozy-text-secondary-light/40 dark:text-cozy-text-secondary-dark/30"
        >
          {/* Soft Pastel Blob Background */}
          <circle cx="100" cy="90" r="55" fill="currentColor" className="opacity-10" />
          <path d="M 50 100 Q 100 70 150 100 Q 180 120 140 140 Q 100 150 60 135 Q 30 120 50 100 Z" fill="currentColor" className="opacity-5" />

          {/* Table Line */}
          <line x1="20" y1="130" x2="180" y2="130" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-40" />

          {/* Steaming Mug */}
          <g transform="translate(45, 60)">
            {/* Mug Shadow */}
            <ellipse cx="25" cy="68" rx="20" ry="4" fill="currentColor" className="opacity-20" />
            
            {/* Mug Handle */}
            <path d="M 40 20 C 52 20, 52 48, 40 48" stroke="currentColor" strokeWidth="5" strokeLinecap="round" fill="none" />
            
            {/* Mug Main Body */}
            <path d="M 10 10 C 10 10, 10 65, 25 65 C 40 65, 40 10, 40 10 Z" fill="var(--color-cozy-accent)" className="opacity-90" />
            <path d="M 10 10 L 40 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            
            {/* Heart Decor on Mug */}
            <path d="M 25 35 C 25 35, 21 31, 21 27 C 21 24, 23.5 22, 25 24.5 C 26.5 22, 29 24, 29 27 C 29 31, 25 35, 25 35 Z" fill="var(--color-cozy-pink)" />
          </g>

          {/* Animated Steam lines */}
          <g transform="translate(60, 20)">
            <motion.path 
              d="M 10 30 Q 5 15, 10 0" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              fill="none"
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.3, 0.9, 0.3],
                pathLength: [0.7, 1, 0.7]
              }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            />
            <motion.path 
              d="M 20 35 Q 25 20, 18 5" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              fill="none"
              animate={{ 
                y: [-3, -13, -3],
                opacity: [0.2, 0.8, 0.2],
                pathLength: [0.8, 1, 0.8]
              }}
              transition={{ repeat: Infinity, duration: 3.5, delay: 0.5, ease: "easeInOut" }}
            />
          </g>

          {/* Cute Sleeping Cat */}
          <g transform="translate(100, 80)">
            {/* Cat shadow */}
            <ellipse cx="35" cy="48" rx="28" ry="5" fill="currentColor" className="opacity-20" />
            
            {/* Cat Body (curled up blob) */}
            <path d="M 10 40 C 5 25, 60 20, 60 40 C 60 48, 50 48, 35 48 C 20 48, 15 48, 10 40 Z" fill="var(--color-cozy-pink)" className="opacity-90" />
            <path d="M 10 40 C 5 25, 60 20, 60 40 C 60 48, 50 48, 35 48 C 20 48, 15 48, 10 40 Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            
            {/* Cat Head */}
            <circle cx="18" cy="30" r="12" fill="var(--color-cozy-pink)" />
            <circle cx="18" cy="30" r="12" stroke="currentColor" strokeWidth="2.5" fill="none" />
            
            {/* Ears */}
            <polygon points="9,20 13,10 18,20" fill="var(--color-cozy-pink)" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
            <polygon points="27,20 23,10 18,20" fill="var(--color-cozy-pink)" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
            
            {/* Sleeping Eyes */}
            <path d="M 11 31 Q 13 33, 15 31" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M 21 31 Q 23 33, 25 31" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            
            {/* Little Nose / Mouth */}
            <path d="M 18 34 L 18 36" stroke="currentColor" strokeWidth="1.5" />

            {/* Cat Tail (wrapped around) */}
            <path d="M 60 40 C 65 38, 70 42, 65 48 C 60 52, 50 48, 50 48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            {/* Zzz floating */}
            <motion.text 
              x="5" y="5" 
              className="text-[10px] font-bold fill-current opacity-70"
              animate={{ 
                y: [0, -12, 0],
                x: [0, 4, 0],
                opacity: [0, 0.8, 0]
              }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              z
            </motion.text>
            <motion.text 
              x="-5" y="-5" 
              className="text-[12px] font-bold fill-current opacity-70"
              animate={{ 
                y: [0, -16, 0],
                x: [0, -5, 0],
                opacity: [0, 0.8, 0]
              }}
              transition={{ repeat: Infinity, duration: 4, delay: 1.5, ease: "easeInOut" }}
            >
              Z
            </motion.text>
          </g>
        </svg>
        
        {/* Sparkle indicators */}
        <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-cozy-yellow animate-pulse" />
      </div>

      <h3 className="text-lg font-bold font-heading text-cozy-text-primary-light dark:text-cozy-text-primary-dark mb-2 flex items-center gap-1.5 justify-center">
        <span>{title}</span>
        <span className="text-xl">{emoji}</span>
      </h3>
      <p className="text-sm font-medium text-cozy-text-secondary-light/90 dark:text-cozy-text-secondary-dark/95 max-w-sm leading-relaxed">
        {sub}
      </p>

      {activeFilter === 'completed' && (
        <motion.div 
          className="mt-4 flex items-center gap-1 text-xs text-cozy-coral font-bold bg-cozy-coral/10 py-1.5 px-3 rounded-full"
          whileHover={{ scale: 1.05 }}
        >
          <Heart className="w-3.5 h-3.5 fill-current" />
          <span>Keep up the lovely spirit!</span>
        </motion.div>
      )}
    </motion.div>
  );
}
