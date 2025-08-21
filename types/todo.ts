export interface Subtask {
  id: string;
  text: string;
  completed: boolean;
  link?: string;
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  subtasks: Subtask[];
  link?: string;
}

export interface TodoSection {
  id: string;
  title: string;
  emoji: string;
  tasks: Task[];
  color: string;
}

export interface DailyTodo {
  id: string;
  date: string;
  sections: TodoSection[];
}
