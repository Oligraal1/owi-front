export interface Task {
  showDropdown?: boolean;
  id?: number;
  name: string;
  description?: string;
  createdAt?: Date;
  modifiedAt?: Date;
  tag?: string;
  listingId: number;
  deadline?: Date;
}