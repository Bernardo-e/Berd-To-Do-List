import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Header';
import StatsCard from './components/StatsCard';
import TaskForm from './components/TaskForm';
import TaskFilters from './components/TaskFilters';
import TaskList from './components/TaskList';
import { Heart, Sparkles } from 'lucide-react';

export default function App() {
  const [tasks, setTasks] = useLocalStorage('cozy-tasks-v1', [
    {
      id: 'task-1',
      title: 'Water my succulent plants 🪴',
      description: 'Give them a small sip of room-temp water.',
      dueDate: new Date().toISOString().split('T')[0],
      priority: 'mild',
      category: 'Personal 🧸',
      completed: false,
      createdAt: new Date().toISOString()
    },
    {
      id: 'task-2',
      title: 'Read 5 pages of my cozy novel 📖',
      description: 'Find a warm spot near the window.',
      dueDate: new Date().toISOString().split('T')[0],
      priority: 'medium',
      category: 'Study 📚',
      completed: false,
      createdAt: new Date().toISOString()
    },
    {
      id: 'task-3',
      title: 'Design a cute Berd To-Do List app UI 🎨',
      description: 'Use soft pastel colors and springy bounce dynamics.',
      dueDate: new Date().toISOString().split('T')[0],
      priority: 'spicy',
      category: 'Work 💼',
      completed: true,
      createdAt: new Date().toISOString()
    }
  ]);
  
  const [theme, setTheme] = useLocalStorage('cozy-theme-v1', 'light');
  const [activeFilter, setActiveFilter] = useState('all');

  // Synchronize HTML element class for Tailwind dark selector
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleAddTask = (newTaskData) => {
    const newTask = {
      ...newTaskData,
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const handleToggleComplete = (id) => {
    setTasks(prev => prev.map(task => {
      if (task.id === id) {
        const nextCompleted = !task.completed;
        if (nextCompleted) {
          // Trigger cute pastel confetti burst!
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.75 },
            colors: ['#B8C0FF', '#FFD6FF', '#CAFFBF', '#FDFFB6', '#E8AEFF']
          });
        }
        return { ...task, completed: nextCompleted };
      }
      return task;
    }));
  };

  const handleDeleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const handleUpdateTask = (id, updatedFields) => {
    setTasks(prev => prev.map(task => {
      if (task.id === id) {
        return { ...task, ...updatedFields };
      }
      return task;
    }));
  };

  // Stats calculation
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="min-h-screen w-full py-6 px-4 md:py-12 bg-cozy-bg-light dark:bg-cozy-bg-dark flex flex-col justify-between transition-colors duration-300">
      
      {/* Content wrapper */}
      <main className="w-full max-w-5xl mx-auto flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">
          
          {/* Left panel: Header, Stats and Form */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Header theme={theme} toggleTheme={toggleTheme} />
            
            <TaskForm onAddTask={handleAddTask} />
            
            <StatsCard 
              totalTasks={totalTasks} 
              completedTasks={completedTasks} 
              pendingTasks={pendingTasks} 
            />
          </div>

          {/* Right panel: Filters and Task List */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            
            {/* Action Bar with Filter Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs font-bold text-cozy-text-secondary-light dark:text-cozy-text-secondary-dark uppercase tracking-widest pl-1">
                Your Lovely Tasks ✨
              </span>
              
              <div className="w-full sm:w-auto">
                <TaskFilters 
                  activeFilter={activeFilter} 
                  setActiveFilter={setActiveFilter} 
                />
              </div>
            </div>

            {/* Main Task List panel */}
            <div className="flex flex-col gap-3 min-h-[380px]">
              <TaskList 
                tasks={tasks}
                activeFilter={activeFilter}
                onToggleComplete={handleToggleComplete}
                onDeleteTask={handleDeleteTask}
                onUpdateTask={handleUpdateTask}
              />
            </div>
            
          </div>
          
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-6 mt-8 border-t border-dashed border-cozy-text-secondary-light/10 dark:border-cozy-text-secondary-dark/10">
        <motion.p 
          className="text-xs font-semibold text-cozy-text-secondary-light/75 dark:text-cozy-text-secondary-dark/70 flex items-center justify-center gap-1"
          whileHover={{ scale: 1.02 }}
        >
          <span>Made with</span>
          <Heart className="w-3.5 h-3.5 text-cozy-coral fill-cozy-coral" />
          <span>by Berd</span>
          <Sparkles className="w-3.5 h-3.5 text-cozy-yellow fill-cozy-yellow" />
        </motion.p>
      </footer>
      
    </div>
  );
}
