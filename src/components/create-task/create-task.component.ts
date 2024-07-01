import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FetcherService } from '../../services/fetcher.service';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap';
import { Task } from '../models/task.model';


@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})
export class CreateTaskComponent implements OnInit {
  taskForm!: FormGroup;
  @Input() listingId!: number;
  @Input() showTaskCreate: boolean = false;
  @Input() projectId!: number;
  @Output() loadTasks: EventEmitter<string> = new EventEmitter<string>();
  @Output() cancelEdit = new EventEmitter<void>();
  isFormVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private api: FetcherService
  ) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      tag: [''],
      deadline: ['']
    });
    console.log("listingId from CreateTask",this.listingId)
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
    const newTask: Task = {
      name: this.taskForm.value.name,
      description: this.taskForm.value.description,
      tag: this.taskForm.value.tag,
      listingId: this.listingId,
      deadline: this.taskForm.value.deadline,
      comments: [],
  
    };
    console.log("newTask", newTask)
      this.api.createTask(newTask, this.projectId).subscribe(
        () => {
          console.log('Task created successfully');
          this.taskForm.reset();
        },
        error => {
          console.error('Error creating task', error);
        }
      );
    }
  }

  closeModal(): void {
    const modalElement = document.getElementById('createTaskModal');
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      }
    }
  }
  onCancel() {
    this.cancelEdit.emit();
  }

  closeForm(): void {
    // Logic to close the form or reset the form state
    this.isFormVisible = false;
    this.taskForm.reset(); // Resets the form
    console.log('Form closed');
  }
}
