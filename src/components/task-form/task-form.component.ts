import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FetcherService } from '../../services/fetcher.service';
import {Task} from '../models/task.model';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
  @Input() task: Task | null = null;
  @Input() projectId!: number;
  @Output() taskUpdated = new EventEmitter<Task>();
  @Output() cancelEdit = new EventEmitter<void>();
  isFormVisible: boolean = false;

  constructor(private api: FetcherService) {}

  onSubmit() {
    if (this.task && this.task?.id) {
      this.api.updateTask(this.task.id, this.task, this.projectId).subscribe(
        updatedTask => {
          this.taskUpdated.emit(updatedTask);
        },
        error => {
          console.error('Error updating task', error);
        }
      );
    }
  }

  onCancel() {
    this.cancelEdit.emit();
  }

  closeForm(): void {
    // Logic to close the form or reset the form state
    this.isFormVisible = false;
    console.log('Form closed');
  }
}
