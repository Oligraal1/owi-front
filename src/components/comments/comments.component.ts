import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Commentaire } from '../../models/comment.model';


@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentComponent {
  @Input() tasktocomment: any;
  @Output() commentChange = new EventEmitter<Commentaire>();

  isEditing: boolean = false;

  editComment(): void {
    this.isEditing = true;
  }

  saveComment(): void {
    this.isEditing = false;
    this.commentChange.emit(this.tasktocomment);
  }
}