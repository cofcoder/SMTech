export interface GalleryItem {
  id: number;
  category: string;
  title: string;
  desc: string;
  src: string;
  info: string;
  bytes: string;
}

export interface ProjectItem {
  id: number;
  title: string;
  desc: string;
  tags: string[];
  metrics: string;
  status: 'active' | 'completed' | 'queued';
  date: string;
  demoUrl?: string;
  githubUrl?: string;
}

export interface KanbanCard {
  id: number;
  text: string;
  tag: string;
}

export interface KanbanBoard {
  backlog: KanbanCard[];
  inProgress: KanbanCard[];
  done: KanbanCard[];
}

export type KanbanColumn = 'backlog' | 'inProgress' | 'done';
