'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Plus, Trash2, ExternalLink, ChevronDown, ChevronRight } from 'lucide-react';
import { Task, Subtask } from '@/types/todo';

interface TaskItemProps {
  task: Task;
  onUpdate: (task: Task) => void;
  onDelete: () => void;
}

export default function TaskItem({ task, onUpdate, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(task.text === '');
  const [showSubtasks, setShowSubtasks] = useState(true);
  const [editingSubtask, setEditingSubtask] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(task.text.length, task.text.length);
    }
  }, [isEditing, task.text]);

  const handleTextChange = (newText: string) => {
    onUpdate({ ...task, text: newText });
  };

  const handleCheckChange = () => {
    onUpdate({ ...task, completed: !task.completed });
  };

  const addSubtask = () => {
    const newSubtask: Subtask = {
      id: Date.now().toString(),
      text: '',
      completed: false
    };
    
    onUpdate({
      ...task,
      subtasks: [...task.subtasks, newSubtask]
    });
    setEditingSubtask(newSubtask.id);
  };

  const updateSubtask = (subtaskIndex: number, updatedSubtask: Subtask) => {
    const updatedSubtasks = [...task.subtasks];
    updatedSubtasks[subtaskIndex] = updatedSubtask;
    onUpdate({ ...task, subtasks: updatedSubtasks });
  };

  const deleteSubtask = (subtaskIndex: number) => {
    const updatedSubtasks = task.subtasks.filter((_, index) => index !== subtaskIndex);
    onUpdate({ ...task, subtasks: updatedSubtasks });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      setIsEditing(false);
    }
    if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group"
    >
      <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-25 hover:bg-blue-50 border border-transparent hover:border-blue-100 transition-all">
        {/* Checkbox */}
        <button
          onClick={handleCheckChange}
          className={`relative w-5 h-5 rounded border-2 flex items-center justify-center transition-all mt-0.5 ${
            task.completed
              ? 'bg-blue-500 border-blue-500'
              : 'border-blue-300 hover:border-blue-400'
          }`}
        >
          <AnimatePresence>
            {task.completed && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Check className="w-3 h-3 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        <div className="flex-1 min-w-0">
          {/* Main Task */}
          <div className="flex items-start gap-2">
            <div className="flex-1">
              {isEditing ? (
                <textarea
                  ref={textareaRef}
                  value={task.text}
                  onChange={(e) => handleTextChange(e.target.value)}
                  onBlur={() => setIsEditing(false)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent resize-none outline-none text-gray-700 placeholder-gray-400"
                  placeholder="할 일을 입력하세요..."
                  rows={1}
                  style={{ minHeight: '24px' }}
                />
              ) : (
                <div
                  onClick={() => setIsEditing(true)}
                  className={`cursor-pointer text-gray-700 leading-relaxed ${
                    task.completed ? 'line-through opacity-60' : ''
                  }`}
                >
                  {task.text || '할 일을 입력하세요...'}
                  {task.link && (
                    <a
                      href={task.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 ml-2 text-blue-500 hover:text-blue-600"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Task Actions */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {task.subtasks.length > 0 && (
                <button
                  onClick={() => setShowSubtasks(!showSubtasks)}
                  className="p-1 rounded hover:bg-blue-100"
                >
                  {showSubtasks ? (
                    <ChevronDown className="w-3 h-3 text-blue-600" />
                  ) : (
                    <ChevronRight className="w-3 h-3 text-blue-600" />
                  )}
                </button>
              )}
              
              <button
                onClick={addSubtask}
                className="p-1 rounded hover:bg-blue-100"
                title="서브태스크 추가"
              >
                <Plus className="w-3 h-3 text-blue-600" />
              </button>
              
              <button
                onClick={onDelete}
                className="p-1 rounded hover:bg-red-100"
                title="삭제"
              >
                <Trash2 className="w-3 h-3 text-red-500" />
              </button>
            </div>
          </div>

          {/* Subtasks */}
          <AnimatePresence>
            {showSubtasks && task.subtasks.length > 0 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="ml-2 mt-2 space-y-1 border-l-2 border-blue-200 pl-4"
              >
                {task.subtasks.map((subtask, index) => (
                  <SubtaskItem
                    key={subtask.id}
                    subtask={subtask}
                    isEditing={editingSubtask === subtask.id}
                    onUpdate={(updatedSubtask) => updateSubtask(index, updatedSubtask)}
                    onDelete={() => deleteSubtask(index)}
                    onEditStart={() => setEditingSubtask(subtask.id)}
                    onEditEnd={() => setEditingSubtask(null)}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// Subtask Component
interface SubtaskItemProps {
  subtask: Subtask;
  isEditing: boolean;
  onUpdate: (subtask: Subtask) => void;
  onDelete: () => void;
  onEditStart: () => void;
  onEditEnd: () => void;
}

function SubtaskItem({ subtask, isEditing, onUpdate, onDelete, onEditStart, onEditEnd }: SubtaskItemProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(subtask.text.length, subtask.text.length);
    }
  }, [isEditing, subtask.text]);

  const handleTextChange = (newText: string) => {
    onUpdate({ ...subtask, text: newText });
  };

  const handleCheckChange = () => {
    onUpdate({ ...subtask, completed: !subtask.completed });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onEditEnd();
    }
    if (e.key === 'Escape') {
      onEditEnd();
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      className="flex items-center gap-2 group"
    >
      <button
        onClick={handleCheckChange}
        className={`relative w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
          subtask.completed
            ? 'bg-blue-400 border-blue-400'
            : 'border-blue-300 hover:border-blue-400'
        }`}
      >
        <AnimatePresence>
          {subtask.completed && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <Check className="w-2.5 h-2.5 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      <div className="flex-1 flex items-center gap-2">
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={subtask.text}
            onChange={(e) => handleTextChange(e.target.value)}
            onBlur={onEditEnd}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
            placeholder="서브태스크를 입력하세요..."
          />
        ) : (
          <span
            onClick={onEditStart}
            className={`flex-1 text-sm cursor-pointer text-gray-600 ${
              subtask.completed ? 'line-through opacity-60' : ''
            }`}
          >
            {subtask.text || '서브태스크를 입력하세요...'}
            {subtask.link && (
              <a
                href={subtask.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 ml-1 text-blue-500 hover:text-blue-600"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            )}
          </span>
        )}

        <button
          onClick={onDelete}
          className="p-0.5 rounded opacity-0 group-hover:opacity-100 hover:bg-red-100 transition-opacity"
          title="삭제"
        >
          <Trash2 className="w-2.5 h-2.5 text-red-500" />
        </button>
      </div>
    </motion.div>
  );
}
