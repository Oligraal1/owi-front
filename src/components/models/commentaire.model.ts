export interface Commentaire {
  id?: number;
  content: string;
  createdAt?: Date;
  user?: string;
  taskId: number;
};
