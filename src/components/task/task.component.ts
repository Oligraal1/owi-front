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
  task!: Task;
  listingId!: number;
  taskId!: number;
  projectId: any = 0;
  comments: Commentaire[] = [];
  newComment: string = '';
  user: string = '';
  comment!: Commentaire;
  commentForm!: FormGroup;

  constructor(private route: ActivatedRoute, private api: FetcherService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.listingId = Number(params.get('listingId'));
      this.taskId = Number(params.get('id'));
      this.loadTask();
       this.createCommentForm();
    });
  }
loadTask() {
    console.log('listings:', this.api.prj.listings);
    if(this.api.prj) {
      this.projectId = this.api.prj.id;
    }

    const listing = this.api.prj.listings.find(l => l.id === this.listingId);
    if (listing) {
      console.log('tasks:', listing.tasks);
      const task = listing.tasks.find(t => t.id === this.taskId);
      if (task) {
        this.task = task;
        if(task.comments) {
        this.comments = task.comments;
        }
      } else {
        console.error('Task not found');
      }
    } else {
      console.error('Listing not found');
    }
  }

createCommentForm() {
    this.commentForm = this.fb.group({
      content: ['', Validators.required]
    });
  }

  addComment() {
    if (this.commentForm.valid) {
      const commentData: Commentaire = {
        content: this.commentForm.get('content')?.value,
        createdAt: new Date(),
        taskId: this.taskId,
        user:this.commentForm.get('user')?.value
      };

      this.api.createCommentaire(commentData).subscribe(
        (newComment) => {
          this.task.comments.push(newComment); // Ajouter le nouveau commentaire à la liste des commentaires
          this.commentForm.reset(); // Réinitialiser le formulaire après l'ajout du commentaire
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
    this.api.deleteCommentaire(commentId, this.projectId).subscribe(
      () => {
        this.comments = this.comments.filter(comment => comment.id !== commentId);
      },
      (error) => {
        console.error('Error deleting comment', error);
      }
    );
  }
}
