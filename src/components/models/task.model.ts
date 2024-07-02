import { Commentaire } from './commentaire.model';

export interface Task {
  id?: number;
  name: string;
  createdAt?: Date;
  description?: string;
  tag?: string;
  listingId: number;
  deadline?: Date;
  showDropdown?: boolean;
  comments: Commentaire[];
}
