import React from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, ClipboardList, CheckCircle } from 'lucide-react';

export default function TaskFilters({ activeFilter, setActiveFilter }) {
  const filters = [
    { id: 'all', label: 'All', icon: LayoutGrid, countColor: 'bg-cozy-accent/20 text-cozy-text-primary-light' },
    { id: 'pending', label: 'Pending', icon: ClipboardList, countColor: 'bg-cozy-coral/20 text-cozy-coral-dark' },
    { id: 'completed', label: 'Completed', icon: CheckCircle, countColor: 'bg-cozy-mint-accent/20 text-cozy-mint-dark' }
  ];

  return (
    <div className="cozy-transition flex items-center justify-between p-1.5 rounded-2xl bg-cozy-card-light dark:bg-cozy-card-dark border border-cozy-accent/10 dark:border-cozy-text-secondary-dark/10 shadow-sm">
      <div className="flex w-full gap-1">
        {filters.map((filter) => {
          const Icon = filter.icon;
          const isActive = activeFilter === filter.id;

          return (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className="relative flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-sm font-semibold transition-colors duration-200 cursor-pointer focus:outline-none"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeFilterPill"
                  className="absolute inset-0 rounded-xl bg-cozy-accent/20 dark:bg-cozy-text-secondary-dark/20 border border-cozy-accent/40 dark:border-cozy-text-secondary-dark/30"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              
              <span className={`relative z-10 flex items-center gap-1.5 ${
                isActive 
                  ? 'text-cozy-text-primary-light dark:text-cozy-text-primary-dark font-bold' 
                  : 'text-cozy-text-secondary-light hover:text-cozy-text-primary-light dark:text-cozy-text-secondary-dark dark:hover:text-cozy-text-primary-dark'
              }`}>
                <Icon className="w-4 h-4" />
                <span>{filter.label}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
