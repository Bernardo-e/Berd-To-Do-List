import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Trash2, Edit3, Save, X, Calendar, AlertCircle } from 'lucide-react';

export default function TaskItem({ task, onToggleComplete, onDeleteTask, onUpdateTask }) {
  const { id, title, description, dueDate, priority, category, completed } = task;
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description || '');
  const [editDueDate, setEditDueDate] = useState(dueDate || '');
  const [editPriority, setEditPriority] = useState(priority);
  const [editCategory, setEditCategory] = useState(category);

  // Category tags options
  const categories = ['Personal 🧸', 'Study 📚', 'Work 💼', 'Health 🍎', 'Chores 🧹'];

  // Smart due date analyzer
  const getDueBadge = () => {
    if (!dueDate) return null;
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const due = new Date(dueDate + 'T00:00:00');
    const diffTime = due - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { text: 'Overdue ⚠️', style: 'bg-red-50 text-cozy-coral-dark border-cozy-coral/40 dark:bg-red-950/20 dark:text-red-300 dark:border-red-800/30' };
    } else if (diffDays === 0) {
      return { text: 'Due today ⏰', style: 'bg-amber-50 text-amber-600 border-amber-300/40 dark:bg-amber-950/20 dark:text-amber-300 dark:border-amber-700/30' };
    } else if (diffDays === 1) {
      return { text: 'Due tomorrow 🗓️', style: 'bg-cozy-accent/10 text-cozy-text-primary-light border-cozy-accent/30 dark:bg-cozy-text-secondary-dark/10 dark:text-cozy-text-primary-dark dark:border-cozy-text-secondary-dark/20' };
    } else {
      const formattedDate = new Date(dueDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      return { text: `Due ${formattedDate} 📅`, style: 'bg-cozy-bg-light text-cozy-text-secondary-light border-cozy-accent/20 dark:bg-cozy-bg-dark dark:text-cozy-text-secondary-dark dark:border-cozy-text-secondary-dark/10' };
    }
  };

  const dueBadge = getDueBadge();

  // Priority Styles mapping
  const priorityBadges = {
    mild: { label: 'Mild 🌸', style: 'bg-cozy-mint text-cozy-mint-dark border-cozy-mint-accent/20 dark:bg-emerald-950/20 dark:text-emerald-300 dark:border-emerald-700/20' },
    medium: { label: 'Medium ☀️', style: 'bg-cozy-yellow/50 text-amber-800 border-amber-300/20 dark:bg-amber-950/20 dark:text-amber-300 dark:border-amber-700/20' },
    spicy: { label: 'Spicy 🔥', style: 'bg-cozy-coral/20 text-cozy-coral-dark border-cozy-coral/20 dark:bg-rose-950/20 dark:text-rose-300 dark:border-rose-800/20' }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!editTitle.trim()) return;

    onUpdateTask(id, {
      title: editTitle.trim(),
      description: editDescription.trim(),
      dueDate: editDueDate,
      priority: editPriority,
      category: editCategory
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(title);
    setEditDescription(description || '');
    setEditDueDate(dueDate || '');
    setEditPriority(priority);
    setEditCategory(category);
    setIsEditing(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: -15 }}
      transition={{ type: 'spring', damping: 22, stiffness: 220 }}
      onDoubleClick={() => !isEditing && setIsEditing(true)}
      className={`cozy-transition group relative p-4 rounded-2xl border shadow-sm hover:shadow-md ${
        completed 
          ? 'bg-cozy-bg-light/60 dark:bg-cozy-bg-dark/40 border-cozy-mint-accent/30 dark:border-emerald-950/30 opacity-75' 
          : 'bg-cozy-card-light dark:bg-cozy-card-dark border-cozy-accent/15 dark:border-cozy-text-secondary-dark/10 hover:border-cozy-accent/40 dark:hover:border-cozy-text-secondary-dark/30'
      }`}
    >
      {!isEditing ? (
        /* Standard View Mode */
        <div className="flex items-start gap-3">
          
          {/* Custom Bouncy Checkbox */}
          <motion.button
            onClick={() => onToggleComplete(id)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.85 }}
            className="mt-1 cursor-pointer focus:outline-none flex-shrink-0"
            aria-label={completed ? "Mark task pending" : "Mark task completed"}
          >
            <motion.div
              animate={{ 
                scale: completed ? [1, 1.25, 1] : 1,
                borderColor: completed ? 'var(--color-cozy-mint-accent)' : 'rgba(120, 120, 150, 0.4)'
              }}
              transition={{ duration: 0.3 }}
              className={`w-5.5 h-5.5 rounded-lg border-2 flex items-center justify-center transition-colors ${
                completed 
                  ? 'bg-cozy-mint-accent text-white dark:text-cozy-bg-dark border-cozy-mint-accent' 
                  : 'bg-transparent hover:border-cozy-accent text-transparent'
              }`}
            >
              {completed && <Check className="w-4 h-4 stroke-[3]" />}
            </motion.div>
          </motion.button>

          {/* Task Info Body */}
          <div className="flex-1 min-w-0 pr-8">
            <div className="flex flex-col gap-1">
              
              {/* Category & Badges line */}
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold tracking-wide uppercase">
                {category && (
                  <span className="px-2 py-0.5 rounded-full bg-cozy-bg-light dark:bg-cozy-bg-dark text-cozy-text-secondary-light dark:text-cozy-text-secondary-dark border border-cozy-accent/10 dark:border-cozy-text-secondary-dark/10">
                    {category}
                  </span>
                )}
                {priority && (
                  <span className={`px-2 py-0.5 rounded-full border ${priorityBadges[priority].style}`}>
                    {priorityBadges[priority].label}
                  </span>
                )}
                {dueBadge && (
                  <span className={`px-2 py-0.5 rounded-full border ${dueBadge.style}`}>
                    {dueBadge.text}
                  </span>
                )}
              </div>

              {/* Task Title */}
              <h4 className={`text-sm font-semibold tracking-tight leading-snug break-words ${
                completed 
                  ? 'text-cozy-text-secondary-light/60 dark:text-cozy-text-secondary-dark/40 line-through' 
                  : 'text-cozy-text-primary-light dark:text-cozy-text-primary-dark'
              }`}>
                {title}
              </h4>

              {/* Task Description */}
              {description && (
                <p className={`text-xs leading-normal break-words ${
                  completed 
                    ? 'text-cozy-text-secondary-light/40 dark:text-cozy-text-secondary-dark/30 line-through' 
                    : 'text-cozy-text-secondary-light/80 dark:text-cozy-text-secondary-dark/85'
                }`}>
                  {description}
                </p>
              )}
            </div>
          </div>

          {/* Action Hover Buttons */}
          <div className="absolute right-3 top-3.5 flex items-center gap-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
            {/* Inline Edit Icon */}
            <button
              onClick={() => setIsEditing(true)}
              className="p-1.5 rounded-lg hover:bg-cozy-bg-light dark:hover:bg-cozy-bg-dark text-cozy-text-secondary-light dark:text-cozy-text-secondary-dark hover:text-cozy-text-primary-light cursor-pointer transition-colors"
              title="Edit Task"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>

            {/* Trash Delete Icon */}
            <motion.button
              whileHover={{ 
                rotate: [0, -10, 10, -10, 0],
                scale: 1.1 
              }}
              transition={{ duration: 0.3 }}
              onClick={() => onDeleteTask(id)}
              className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 text-cozy-text-secondary-light dark:text-cozy-text-secondary-dark hover:text-cozy-coral-dark cursor-pointer transition-colors"
              title="Delete Task"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </motion.button>
          </div>

        </div>
      ) : (
        /* Edit Form Mode */
        <form onSubmit={handleSave} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-cozy-text-secondary-light dark:text-cozy-text-secondary-dark uppercase tracking-wider">
              Edit Title
            </label>
            <input
              type="text"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-3 py-1.5 rounded-xl bg-cozy-bg-light dark:bg-cozy-bg-dark border border-cozy-accent/40 dark:border-cozy-text-secondary-dark/30 text-xs text-cozy-text-primary-light dark:text-cozy-text-primary-dark font-medium focus:outline-none focus:ring-2 focus:ring-cozy-accent"
              autoFocus
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-cozy-text-secondary-light dark:text-cozy-text-secondary-dark uppercase tracking-wider">
              Edit Details
            </label>
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              rows="1"
              className="w-full px-3 py-1.5 rounded-xl bg-cozy-bg-light dark:bg-cozy-bg-dark border border-cozy-accent/40 dark:border-cozy-text-secondary-dark/30 text-xs text-cozy-text-primary-light dark:text-cozy-text-primary-dark font-medium focus:outline-none focus:ring-2 focus:ring-cozy-accent resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-cozy-text-secondary-light dark:text-cozy-text-secondary-dark uppercase tracking-wider flex items-center gap-0.5">
                <Calendar className="w-3 h-3" /> Due Date
              </label>
              <input
                type="date"
                value={editDueDate}
                onClick={(e) => {
                  try {
                    e.target.showPicker();
                  } catch (err) {
                    console.warn(err);
                  }
                }}
                onChange={(e) => setEditDueDate(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-cozy-bg-light dark:bg-cozy-bg-dark border border-cozy-accent/40 dark:border-cozy-text-secondary-dark/30 text-xs text-cozy-text-primary-light dark:text-cozy-text-primary-dark font-medium focus:outline-none focus:ring-2 focus:ring-cozy-accent cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-cozy-text-secondary-light dark:text-cozy-text-secondary-dark uppercase tracking-wider">
                Priority
              </label>
              <select
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-cozy-bg-light dark:bg-cozy-bg-dark border border-cozy-accent/40 dark:border-cozy-text-secondary-dark/30 text-xs text-cozy-text-primary-light dark:text-cozy-text-primary-dark font-medium focus:outline-none focus:ring-2 focus:ring-cozy-accent cursor-pointer"
              >
                <option value="mild">Mild 🌸</option>
                <option value="medium">Medium ☀️</option>
                <option value="spicy">Spicy 🔥</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-cozy-text-secondary-light dark:text-cozy-text-secondary-dark uppercase tracking-wider">
              Category
            </label>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => {
                const isSelected = editCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setEditCategory(cat)}
                    className={`py-1 px-2.5 rounded-full text-[10px] font-semibold border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-cozy-accent/40 border-cozy-accent text-cozy-text-primary-light font-bold dark:bg-cozy-text-secondary-dark/30 dark:border-cozy-text-secondary-dark dark:text-cozy-text-primary-dark'
                        : 'bg-cozy-bg-light dark:bg-cozy-bg-dark text-cozy-text-secondary-light dark:text-cozy-text-secondary-dark border-cozy-accent/10 dark:border-cozy-text-secondary-dark/10 hover:border-cozy-accent/40'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Save/Cancel Buttons */}
          <div className="flex justify-end gap-2 mt-1">
            <button
              type="button"
              onClick={handleCancel}
              className="p-1.5 rounded-lg hover:bg-cozy-bg-light dark:hover:bg-cozy-bg-dark text-cozy-text-secondary-light dark:text-cozy-text-secondary-dark cursor-pointer text-xs font-semibold flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              Cancel
            </button>
            <button
              type="submit"
              className="p-1.5 px-3 rounded-lg bg-cozy-accent/40 hover:bg-cozy-accent/60 border border-cozy-accent text-cozy-text-primary-light dark:bg-cozy-text-secondary-dark/25 dark:text-cozy-text-primary-dark dark:border-cozy-text-secondary-dark/50 cursor-pointer text-xs font-bold flex items-center gap-1"
            >
              <Save className="w-3.5 h-3.5" />
              Save Changes
            </button>
          </div>
        </form>
      )}
    </motion.div>
  );
}
