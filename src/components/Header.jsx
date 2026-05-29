import React, { useState, useEffect } from 'react';
import { Sun, Moon, Sparkles, Calendar, Bird } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [greeting, setGreeting] = useState('');
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateGreeting = () => {
      const hours = new Date().getHours();
      if (hours >= 5 && hours < 12) {
        setGreeting('Good morning, sunshine! ☀️');
      } else if (hours >= 12 && hours < 17) {
        setGreeting('Good afternoon, sweet friend! 🌸');
      } else if (hours >= 17 && hours < 21) {
        setGreeting('Good evening, cozy creator! ☕');
      } else {
        setGreeting('Time to wind down and rest! 🌙');
      }
    };

    const updateTime = () => {
      const now = new Date();
      const options = { weekday: 'long', month: 'short', day: 'numeric' };
      setTimeStr(now.toLocaleDateString('en-US', options));
    };

    updateGreeting();
    updateTime();

    // Update greeting/time every hour
    const timer = setInterval(() => {
      updateGreeting();
      updateTime();
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="relative flex flex-col md:flex-row md:items-center md:justify-between pb-6 mb-6 border-b border-dashed border-cozy-text-secondary-light/20 dark:border-cozy-text-secondary-dark/20">
      <div className="flex flex-col gap-2">
        {/* Berd Logo & Name */}
        <div className="flex items-center gap-2 self-start select-none">
          <div className="p-1.5 rounded-xl bg-cozy-accent/35 dark:bg-cozy-text-secondary-dark/25 text-cozy-text-primary-light dark:text-cozy-text-primary-dark">
            <Bird className="w-4 h-4 fill-current opacity-90 animate-bounce" style={{ animationDuration: '4s' }} />
          </div>
          <span className="text-xs font-bold font-heading tracking-widest uppercase text-cozy-text-primary-light/90 dark:text-cozy-text-primary-dark/90">
            Berd ~ To-Do-List
          </span>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
          className="flex items-center gap-2"
        >
          <Sparkles className="w-5 h-5 text-cozy-pink-dark dark:text-cozy-text-secondary-dark animate-pulse" />
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-heading text-cozy-text-primary-light dark:text-cozy-text-primary-dark">
            {greeting}
          </h1>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-1.5 text-sm font-medium text-cozy-text-secondary-light dark:text-cozy-text-secondary-dark"
        >
          <Calendar className="w-4 h-4" />
          <span>{timeStr}</span>
        </motion.div>
      </div>

      <div className="mt-4 md:mt-0 flex items-center gap-2 self-end md:self-auto p-2.5 rounded-2xl bg-cozy-card-dark border border-cozy-text-secondary-dark/15 text-cozy-text-secondary-dark select-none shadow-sm">
        <Moon className="w-4 h-4 text-cozy-text-secondary-dark fill-cozy-text-secondary-dark/15 animate-pulse" />
        <span className="text-xs font-bold tracking-wider uppercase font-heading pr-1">Cozy Dark Mode</span>
      </div>
    </header>
  );
}
