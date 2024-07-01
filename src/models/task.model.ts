import { Commentaire } from "./comment.model";

export interface Task {
    id: number;
    name: string;
    tag: string;
    comments: Commentaire[];
  }
  