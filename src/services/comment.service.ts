import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commentaire } from '../models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = 'http://localhost:5291/api/comment';

  constructor(private http: HttpClient) {}

  getCommentsByTask(taskId: number): Observable<Commentaire[]> {
    return this.http.get<Commentaire[]>(`${this.apiUrl}?taskId=${taskId}`);
  }

  addComment(comment: Commentaire): Observable<Commentaire> {
    return this.http.post<Commentaire>(this.apiUrl, comment);
  }

  updateComment(id: number, comment: Commentaire): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, comment);
  }

  deleteComment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
