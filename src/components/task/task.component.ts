import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { CommentService } from '../../services/comment.service';
import { Task } from '../../models/task.model';
import { Commentaire } from '../../models/comment.model';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  providers: [TaskService, CommentService]
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  selectedTask: Task | null = null;
  newTask: Task = { id: 0, name: '', tag: '', comments: [] };
  newComment: Commentaire = { id: 0, content: '', user: '', taskId: 0 };

  constructor(private taskService: TaskService, private commentService: CommentService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    const listingId = 1; // Assurez-vous d'utiliser le listingId approprié
    this.taskService.getTasks(listingId).subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  selectTask(task: Task): void {
    this.selectedTask = task;
    this.loadComments(task.id);
  }

  addTask(): void {
    this.taskService.addTask(this.newTask).subscribe(() => {
      this.loadTasks();
      this.newTask = { id: 0, name: '', tag: '', comments: [] };
    });
  }

  updateTask(): void {
    if (this.selectedTask) {
      this.taskService.updateTask(this.selectedTask.id, this.selectedTask).subscribe(() => {
        this.loadTasks();
        this.selectedTask = null;
      });
    }
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.loadTasks();
    });
  }

  addComment(): void {
    if (this.selectedTask) {
      this.newComment.taskId = this.selectedTask.id;
      this.commentService.addComment(this.newComment).subscribe(() => {
        this.loadComments(this.selectedTask!.id); // Recharge les commentaires
        this.newComment = { id: 0, content: '', user: '', taskId: 0 };
      });
    }
  }

  deleteComment(commentId: number): void {
    this.commentService.deleteComment(commentId).subscribe(() => {
      if (this.selectedTask) {
        this.loadComments(this.selectedTask.id); // Recharge les commentaires
      }
    });
  }

  private loadComments(taskId: number): void {
    this.commentService.getCommentsByTask(taskId).subscribe(comments => {
      if (this.selectedTask && this.selectedTask.id === taskId) {
        this.selectedTask.comments = comments;
      }
    });
  }
}