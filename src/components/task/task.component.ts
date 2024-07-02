import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../models/task.model';
import { FetcherService } from '../../services/fetcher.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Commentaire } from '../models/commentaire.model';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit{
  task!: Task | undefined;
  taskId!: number;
  commentForm!: FormGroup;

  constructor(private route: ActivatedRoute, private api: FetcherService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.taskId = Number(params.get('id'));
      this.api.getTask(this.taskId).subscribe((tache) => {

        this.task = tache;
        this.api.getCommentairesByTaskId(this.taskId).subscribe(
          (coms)=> this.task!.comments! = coms
        )
        console.log('Matache', tache);
      });
      this.createCommentForm();
    });
  }

  createCommentForm() {
    this.commentForm = this.fb.group({
      user: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  addComment() {
    if (this.commentForm.valid) {
      const commentData: Commentaire = {
        content: this.commentForm.get('content')?.value,
        createdAt: new Date(),
        taskId: this.taskId,
        user: this.commentForm.get('user')?.value
      };

      this.api.createCommentaire(commentData).subscribe(
        (newComment) => {
          console.log('TASK2', this.task)
          if (this.task) {
            this.task.comments.push(newComment);
            console.log('Comments', this.task.comments);
            this.commentForm.reset();
          }
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du commentaire :', error);
          // Gérer l'erreur de manière appropriée
        }
      );
    } else {
      // Marquer les champs comme touchés pour afficher les erreurs de validation
      this.commentForm.markAllAsTouched();
    }
  }

  deleteComment(commentId: number) {
    if (this.api.prj && this.api.prj.id) {
      this.api.deleteCommentaire(commentId, this.api.prj.id).subscribe(
        () => {
          if (this.task) {
            this.task.comments = this.task.comments.filter(comment => comment.id !== commentId);
          }
        },
        (error) => {
          console.error('Error deleting comment', error);
        }
      );
    }
  }
}
