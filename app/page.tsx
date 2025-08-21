'use client';

import { useTodoStore } from '@/hooks/useTodoStore';
import TodoSection from '@/components/TodoSection';
import { Calendar, CheckCircle2, Circle, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const { dailyTodo, updateSection, getTotalProgress } = useTodoStore();
  const progress = getTotalProgress();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-blue-100">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Daily Todo</h1>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(dailyTodo.date)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Summary */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-blue-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress.percentage}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {progress.percentage}%
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  {progress.completed}/{progress.total} 완료
                </div>
              </div>

              <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                <Plus className="w-4 h-4" />
                <span>섹션 추가</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {dailyTodo.sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <TodoSection
                section={section}
                onUpdateSection={(updatedSection) => updateSection(section.id, updatedSection)}
              />
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {dailyTodo.sections.length === 0 && (
          <div className="text-center py-20">
            <Circle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">
              아직 할 일이 없습니다
            </h3>
            <p className="text-gray-500 mb-6">
              새로운 섹션을 추가해서 일정을 관리해보세요
            </p>
            <button className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors mx-auto">
              <Plus className="w-5 h-5" />
              <span>첫 번째 섹션 만들기</span>
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-blue-100 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-4">
              <span>💡 Tip: Enter로 빠른 저장, Escape로 취소</span>
            </div>
            <div className="flex items-center gap-4">
              <span>마지막 저장: 방금 전</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>자동 저장됨</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
