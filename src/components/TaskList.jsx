import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TaskItem from './TaskItem';
import EmptyState from './EmptyState';

export default function TaskList({ tasks, activeFilter, onToggleComplete, onDeleteTask, onUpdateTask }) {
  // 1. Filter the tasks
  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === 'completed') return task.completed;
    if (activeFilter === 'pending') return !task.completed;
    return true; // 'all'
  });

  // 2. Sort tasks: pending first, then sort by due date (tasks without due date go last)
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1; // pending first
    }
    if (!a.dueDate && b.dueDate) return 1;
    if (a.dueDate && !b.dueDate) return -1;
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    return new Date(b.createdAt) - new Date(a.createdAt); // newest first if no due dates
  });

  if (sortedTasks.length === 0) {
    return (
      <AnimatePresence mode="wait">
        <EmptyState activeFilter={activeFilter} />
      </AnimatePresence>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <motion.div layout className="flex flex-col gap-3">
        <AnimatePresence initial={false}>
          {sortedTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onDeleteTask={onDeleteTask}
              onUpdateTask={onUpdateTask}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
