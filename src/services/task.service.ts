import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:5291/api/task';

  constructor(private http: HttpClient) {}

  getTasks(listingId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}?listingId=${listingId}`);
  }

  getTaskById(id: number, listingId: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}/${listingId}`);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(id: number, task: Task): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
