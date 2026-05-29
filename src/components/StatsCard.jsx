import React from 'react';
import { CheckCircle2, Circle, Star, LayoutGrid } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StatsCard({ totalTasks, completedTasks, pendingTasks }) {
  const percent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const getEncouragement = () => {
    if (totalTasks === 0) {
      return "Your canvas is clean! Add a task to start your cozy planning. 🎨";
    }
    if (percent === 0) {
      return "Let's take a deep breath and start with a single, small step! 🌱";
    }
    if (percent > 0 && percent < 50) {
      return "Off to a lovely start! Every step forward is a victory. 🌸";
    }
    if (percent >= 50 && percent < 100) {
      return "Look at you go! Over halfway there, you're doing amazing! 🌟";
    }
    return "Hooray! You've accomplished everything on your list today! 🥳✨";
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="cozy-transition p-5 rounded-3xl bg-cozy-card-light dark:bg-cozy-card-dark border border-cozy-accent/20 dark:border-cozy-text-secondary-dark/15 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex flex-col gap-4">
        {/* Info Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center p-3 rounded-2xl bg-cozy-bg-light dark:bg-cozy-bg-dark/50 border border-dashed border-cozy-text-secondary-light/10">
            <LayoutGrid className="w-5 h-5 text-cozy-text-secondary-light dark:text-cozy-text-secondary-dark mb-1" />
            <span className="text-xs font-semibold text-cozy-text-secondary-light dark:text-cozy-text-secondary-dark uppercase tracking-wider">Total</span>
            <span className="text-xl font-bold font-heading text-cozy-text-primary-light dark:text-cozy-text-primary-dark mt-0.5">{totalTasks}</span>
          </div>

          <div className="flex flex-col items-center p-3 rounded-2xl bg-cozy-mint dark:bg-emerald-950/20 border border-dashed border-cozy-mint-accent/20">
            <CheckCircle2 className="w-5 h-5 text-cozy-mint-accent mb-1" />
            <span className="text-xs font-semibold text-cozy-mint-dark dark:text-emerald-400 uppercase tracking-wider">Done</span>
            <span className="text-xl font-bold font-heading text-cozy-mint-dark dark:text-emerald-300 mt-0.5">{completedTasks}</span>
          </div>

          <div className="flex flex-col items-center p-3 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-dashed border-cozy-coral/20">
            <Circle className="w-5 h-5 text-cozy-coral mb-1" />
            <span className="text-xs font-semibold text-cozy-coral-dark dark:text-red-400 uppercase tracking-wider">Left</span>
            <span className="text-xl font-bold font-heading text-cozy-coral-dark dark:text-red-300 mt-0.5">{pendingTasks}</span>
          </div>
        </div>

        {/* Progress Bar & percentage */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm font-semibold">
            <span className="text-cozy-text-secondary-light dark:text-cozy-text-secondary-dark flex items-center gap-1">
              <Star className="w-4 h-4 text-cozy-yellow fill-cozy-yellow animate-spin" style={{ animationDuration: '6s' }} />
              Completion progress
            </span>
            <span className="text-cozy-text-primary-light dark:text-cozy-text-primary-dark">{percent}%</span>
          </div>
          
          <div className="relative w-full h-3 rounded-full bg-cozy-bg-light dark:bg-cozy-bg-dark border border-cozy-accent/10 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 50 }}
              className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-cozy-accent to-cozy-pink"
            />
          </div>
        </div>

        {/* Encouraging caption */}
        <motion.p 
          key={percent}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 0.9, y: 0 }}
          className="text-xs font-medium text-center text-cozy-text-primary-light/80 dark:text-cozy-text-primary-dark/80 bg-cozy-bg-light/60 dark:bg-cozy-bg-dark/40 py-2 px-3 rounded-xl border border-cozy-accent/10 italic"
        >
          {getEncouragement()}
        </motion.p>
      </div>
    </motion.div>
  );
}
