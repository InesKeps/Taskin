export type Priority = 'high' | 'medium' | 'low';
export type FilterStatus = 'all' | 'active' | 'completed';
export type PriorityFilter = 'all' | Priority;

export interface Task {
  objectId: string;
  title: string;
  completed: boolean;
  priority: Priority;
  category: string;
  createdAt: string;
}

export interface CurrentUser {
  objectId: string;
  username: string;
  email: string;
  sessionToken: string;
}
