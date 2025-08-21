'use client';

import { useState, useEffect } from 'react';
import { DailyTodo, TodoSection } from '@/types/todo';

const STORAGE_KEY = 'daily-todo-data';

const defaultSections: TodoSection[] = [
  {
    id: 'meeting',
    title: 'Meeting',
    emoji: '🤝',
    color: 'blue',
    tasks: [
      {
        id: '1',
        text: '2시 홈페이지 콘텐츠 디자인 논의',
        completed: false,
        subtasks: [
          {
            id: '1-1',
            text: '케이스스터디 썸네일',
            completed: false
          }
        ]
      }
    ]
  },
  {
    id: 'working',
    title: 'Working',
    emoji: '👩‍💻',
    color: 'indigo',
    tasks: [
      {
        id: '2',
        text: '블로그 작성 (~목 오후 발행)',
        completed: false,
        subtasks: [
          {
            id: '2-1',
            text: '[AI gateway 1부 기획]',
            completed: false
          },
          {
            id: '2-2',
            text: '[인블로그 작성중]',
            completed: false
          },
          {
            id: '2-3',
            text: '[인블로그 이미지 제작]',
            completed: true
          },
          {
            id: '2-4',
            text: '이미지 티켓 (~목 오전까지)',
            completed: true
          }
        ]
      },
      {
        id: '3',
        text: '뉴스레터 기획 (~내일, 수)',
        completed: false,
        subtasks: [
          {
            id: '3-1',
            text: '크롤링 활용하여 어떤식으로 콘텐츠 노출할지 구상',
            completed: false
          },
          {
            id: '3-2',
            text: '와이어프레임(디자인)',
            completed: false
          }
        ]
      },
      {
        id: '4',
        text: '구글 스테이엑스 404 인덱스 색인 삭제',
        completed: true,
        subtasks: []
      },
      {
        id: '5',
        text: '에이블 캠퍼스 부산 세미나 광고 세팅',
        completed: false,
        subtasks: [
          {
            id: '5-1',
            text: '혜린님 Session 소개글(5시까지)',
            completed: false
          },
          {
            id: '5-2',
            text: '양식 마무리 (오늘, 화)',
            completed: false
          },
          {
            id: '5-3',
            text: '광고 세팅',
            completed: false
          }
        ]
      }
    ]
  },
  {
    id: 'holding',
    title: 'Holding',
    emoji: '⛔',
    color: 'red',
    tasks: [
      {
        id: '6',
        text: '팀쿠키 채용 공고 관련',
        completed: true,
        subtasks: [
          {
            id: '6-1',
            text: '태희님 컨펌 대기',
            completed: true
          }
        ]
      },
      {
        id: '7',
        text: '에이블 캠퍼스 PR 자료 요청',
        completed: false,
        subtasks: [],
        link: 'https://www.notion.so/PR_AI-Agent-254a9fe64efd8058801ecf20f1df3720'
      }
    ]
  },
  {
    id: 'agenda',
    title: 'Agenda',
    emoji: '🆕',
    color: 'green',
    tasks: [
      {
        id: '8',
        text: '마케팅팀 티켓 시스템화',
        completed: false,
        subtasks: []
      }
    ]
  },
  {
    id: 'etc',
    title: 'ETC',
    emoji: '🪴',
    color: 'purple',
    tasks: [
      {
        id: '9',
        text: '커피챗 방 만들기- 현규님, 세영님',
        completed: true,
        subtasks: [
          {
            id: '9-1',
            text: '일정 픽스',
            completed: false
          }
        ]
      },
      {
        id: '10',
        text: '26일 피알 주간미팅 조정 요청 (반차)',
        completed: true,
        subtasks: []
      }
    ]
  }
];

export function useTodoStore() {
  const [dailyTodo, setDailyTodo] = useState<DailyTodo>({
    id: 'today',
    date: new Date().toISOString().split('T')[0],
    sections: defaultSections
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setDailyTodo(parsed);
      } catch (error) {
        console.error('Failed to parse saved todo data:', error);
      }
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dailyTodo));
  }, [dailyTodo]);

  const updateSection = (sectionId: string, updatedSection: TodoSection) => {
    setDailyTodo(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId ? updatedSection : section
      )
    }));
  };

  const addSection = (newSection: TodoSection) => {
    setDailyTodo(prev => ({
      ...prev,
      sections: [...prev.sections, newSection]
    }));
  };

  const deleteSection = (sectionId: string) => {
    setDailyTodo(prev => ({
      ...prev,
      sections: prev.sections.filter(section => section.id !== sectionId)
    }));
  };

  const getTotalProgress = () => {
    const allTasks = dailyTodo.sections.flatMap(section => section.tasks);
    const completedTasks = allTasks.filter(task => task.completed);
    return {
      completed: completedTasks.length,
      total: allTasks.length,
      percentage: allTasks.length > 0 ? Math.round((completedTasks.length / allTasks.length) * 100) : 0
    };
  };

  return {
    dailyTodo,
    updateSection,
    addSection,
    deleteSection,
    getTotalProgress
  };
}
