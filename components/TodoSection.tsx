'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { TodoSection as TodoSectionType } from '@/types/todo';
import TaskItem from './TaskItem';

interface TodoSectionProps {
  section: TodoSectionType;
  onUpdateSection: (section: TodoSectionType) => void;
}

export default function TodoSection({ section, onUpdateSection }: TodoSectionProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const addNewTask = () => {
    const newTask = {
      id: Date.now().toString(),
      text: '',
      completed: false,
      subtasks: []
    };
    
    onUpdateSection({
      ...section,
      tasks: [...section.tasks, newTask]
    });
  };

  const updateTask = (taskIndex: number, updatedTask: any) => {
    const updatedTasks = [...section.tasks];
    updatedTasks[taskIndex] = updatedTask;
    onUpdateSection({
      ...section,
      tasks: updatedTasks
    });
  };

  const deleteTask = (taskIndex: number) => {
    const updatedTasks = section.tasks.filter((_, index) => index !== taskIndex);
    onUpdateSection({
      ...section,
      tasks: updatedTasks
    });
  };

  const completedTasks = section.tasks.filter(task => task.completed).length;
  const totalTasks = section.tasks.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden"
    >
      {/* Section Header */}
      <div 
        className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4 text-blue-600" />
              ) : (
                <ChevronDown className="w-4 h-4 text-blue-600" />
              )}
              <span className="text-2xl">{section.emoji}</span>
              <h3 className="text-lg font-bold text-gray-800">{section.title}</h3>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {totalTasks > 0 && (
              <div className="flex items-center gap-2">
                <div className="w-16 h-2 bg-blue-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-400 to-indigo-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${(completedTasks / totalTasks) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className="text-sm text-blue-600 font-medium">
                  {completedTasks}/{totalTasks}
                </span>
              </div>
            )}
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                addNewTask();
              }}
              className="p-1.5 rounded-lg bg-blue-100 hover:bg-blue-200 transition-colors"
            >
              <Plus className="w-4 h-4 text-blue-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 space-y-2">
              {section.tasks.length === 0 ? (
                <p className="text-gray-400 text-center py-8">
                  새로운 할 일을 추가해보세요
                </p>
              ) : (
                section.tasks.map((task, index) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onUpdate={(updatedTask) => updateTask(index, updatedTask)}
                    onDelete={() => deleteTask(index)}
                  />
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
