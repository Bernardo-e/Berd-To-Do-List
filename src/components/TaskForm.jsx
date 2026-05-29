import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Calendar, Tag, AlertCircle, X, ChevronRight } from 'lucide-react';

export default function TaskForm({ onAddTask }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium'); // mild, medium, spicy
  const [category, setCategory] = useState('Personal 🧸'); // Study, Personal, Health, Work, Chores

  const formRef = useRef(null);

  const categories = [
    { label: 'Personal 🧸', value: 'Personal 🧸' },
    { label: 'Study 📚', value: 'Study 📚' },
    { label: 'Work 💼', value: 'Work 💼' },
    { label: 'Health 🍎', value: 'Health 🍎' },
    { label: 'Chores 🧹', value: 'Chores 🧹' }
  ];

  const priorities = [
    { id: 'mild', label: 'Mild 🌸', color: 'bg-cozy-mint/60 border-cozy-mint-accent/40 text-cozy-mint-dark dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-700/50' },
    { id: 'medium', label: 'Medium ☀️', color: 'bg-cozy-yellow/60 border-amber-300/40 text-amber-800 dark:bg-amber-950/20 dark:text-amber-300 dark:border-amber-700/40' },
    { id: 'spicy', label: 'Spicy 🔥', color: 'bg-cozy-coral/40 border-cozy-coral-dark/30 text-cozy-coral-dark dark:bg-rose-950/30 dark:text-rose-300 dark:border-rose-800/40' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      title: title.trim(),
      description: description.trim(),
      dueDate,
      priority,
      category,
      completed: false,
      createdAt: new Date().toISOString()
    });

    // Reset Form states
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('medium');
    setCategory('Personal 🧸');
    setIsExpanded(false);
  };

  return (
    <div className="w-full relative mb-6" ref={formRef}>
      <AnimatePresence initial={false} mode="wait">
        {!isExpanded ? (
          /* Collapsed View */
          <motion.button
            key="collapsed"
            layoutId="formContainer"
            onClick={() => setIsExpanded(true)}
            whileHover={{ scale: 1.01, y: -2 }}
            whileTap={{ scale: 0.99 }}
            className="cozy-transition w-full flex items-center justify-between p-4 rounded-2xl bg-cozy-card-light dark:bg-cozy-card-dark border border-cozy-accent/30 dark:border-cozy-text-secondary-dark/20 shadow-sm hover:shadow-md cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cozy-accent/20 text-cozy-text-primary-light dark:text-cozy-text-secondary-dark">
                <Plus className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-sm font-semibold text-cozy-text-secondary-light dark:text-cozy-text-secondary-dark">
                Add a new task to your lovely list... ✨
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-cozy-text-secondary-light/60 dark:text-cozy-text-secondary-dark/60" />
          </motion.button>
        ) : (
          /* Expanded Full Form View */
          <motion.div
            key="expanded"
            layoutId="formContainer"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="cozy-transition w-full p-5 rounded-3xl bg-cozy-card-light dark:bg-cozy-card-dark border-2 border-cozy-accent/50 dark:border-cozy-text-secondary-dark/30 shadow-md"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Form Title & Collapse Cross */}
              <div className="flex items-center justify-between border-b border-dashed border-cozy-text-secondary-light/10 pb-2">
                <span className="text-sm font-bold font-heading text-cozy-text-primary-light dark:text-cozy-text-primary-dark flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-cozy-accent" />
                  Creating a new task
                </span>
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="p-1 rounded-lg hover:bg-cozy-bg-light dark:hover:bg-cozy-bg-dark text-cozy-text-secondary-light hover:text-cozy-coral-dark dark:text-cozy-text-secondary-dark cursor-pointer transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Title input */}
              <div className="flex flex-col gap-1">
                <label htmlFor="task-title" className="text-xs font-bold text-cozy-text-secondary-light dark:text-cozy-text-secondary-dark uppercase tracking-wider">
                  Task Title *
                </label>
                <input
                  id="task-title"
                  type="text"
                  required
                  placeholder="Water my succulent plants 🪴"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-cozy-bg-light dark:bg-cozy-bg-dark border border-cozy-accent/30 dark:border-cozy-text-secondary-dark/20 text-sm text-cozy-text-primary-light dark:text-cozy-text-primary-dark font-medium focus:outline-none focus:ring-2 focus:ring-cozy-accent"
                  autoFocus
                />
              </div>

              {/* Description Input */}
              <div className="flex flex-col gap-1">
                <label htmlFor="task-desc" className="text-xs font-bold text-cozy-text-secondary-light dark:text-cozy-text-secondary-dark uppercase tracking-wider">
                  Details (Optional)
                </label>
                <textarea
                  id="task-desc"
                  rows="2"
                  placeholder="Give them a small sip of room-temp water 💧"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-cozy-bg-light dark:bg-cozy-bg-dark border border-cozy-accent/30 dark:border-cozy-text-secondary-dark/20 text-sm text-cozy-text-primary-light dark:text-cozy-text-primary-dark font-medium focus:outline-none focus:ring-2 focus:ring-cozy-accent resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Due Date picker */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="task-due" className="text-xs font-bold text-cozy-text-secondary-light dark:text-cozy-text-secondary-dark uppercase tracking-wider flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-cozy-text-secondary-light" />
                    Due Date
                  </label>
                  <input
                    id="task-due"
                    type="date"
                    value={dueDate}
                    onClick={(e) => {
                      try {
                        e.target.showPicker();
                      } catch (err) {
                        console.warn(err);
                      }
                    }}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-cozy-bg-light dark:bg-cozy-bg-dark border border-cozy-accent/30 dark:border-cozy-text-secondary-dark/20 text-sm text-cozy-text-primary-light dark:text-cozy-text-primary-dark font-medium focus:outline-none focus:ring-2 focus:ring-cozy-accent cursor-pointer"
                  />
                </div>

                {/* Priority Selector */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-cozy-text-secondary-light dark:text-cozy-text-secondary-dark uppercase tracking-wider flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 text-cozy-text-secondary-light" />
                    Priority Level
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {priorities.map((p) => {
                      const isSelected = priority === p.id;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setPriority(p.id)}
                          className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all duration-200 cursor-pointer text-center ${
                            isSelected 
                              ? `${p.color} border-current scale-102 ring-2 ring-cozy-accent/30 shadow-sm` 
                              : 'bg-cozy-bg-light dark:bg-cozy-bg-dark text-cozy-text-secondary-light border-cozy-accent/20 dark:border-cozy-text-secondary-dark/10 opacity-70 hover:opacity-100'
                          }`}
                        >
                          {p.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Category tags horizontal pills */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-cozy-text-secondary-light dark:text-cozy-text-secondary-dark uppercase tracking-wider">
                  Category Tag
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => {
                    const isSelected = category === cat.value;
                    return (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => setCategory(cat.value)}
                        className={`py-1.5 px-3 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? 'bg-cozy-accent/30 border-cozy-accent text-cozy-text-primary-light font-bold dark:bg-cozy-text-secondary-dark/30 dark:border-cozy-text-secondary-dark dark:text-cozy-text-primary-dark scale-102'
                            : 'bg-cozy-bg-light dark:bg-cozy-bg-dark text-cozy-text-secondary-light dark:text-cozy-text-secondary-dark border-cozy-accent/10 dark:border-cozy-text-secondary-dark/10 hover:border-cozy-accent/40'
                        }`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Buttons Section */}
              <div className="flex justify-end gap-3 mt-2 border-t border-dashed border-cozy-text-secondary-light/10 pt-4">
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-cozy-text-secondary-light dark:text-cozy-text-secondary-dark hover:bg-cozy-bg-light dark:hover:bg-cozy-bg-dark transition-colors duration-200 cursor-pointer"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-cozy-text-primary-light dark:text-cozy-bg-dark bg-gradient-to-r from-cozy-accent to-cozy-pink hover:from-cozy-accent-hover hover:to-cozy-pink-dark border border-cozy-accent/20 cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-cozy-accent font-sans"
                >
                  Add Task ✨
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
