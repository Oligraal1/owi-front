export interface Comment {
  id?: number;
  content: string;
  createdAt?: Date;
  user?: string;
  taskId: number;
};