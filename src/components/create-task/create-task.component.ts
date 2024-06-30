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
  @Output() loadTasks: EventEmitter<string> = new EventEmitter<string>();
  @Output() cancelEdit = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private api: FetcherService
  ) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      tag: [''],
      listingId: [this.listingId, Validators.required],
      deadline: ['']
    });
    console.log("listingId from CreateTask",this.listingId)
  }

  onSubmit(): void {
    console.log('ok', this.taskForm.valid)
    if (this.taskForm.valid) {
    const newTask: Task = {
      name: this.taskForm.value.name,
      description: this.taskForm.value.description,
      tag: this.taskForm.value.tag,
      listingId: this.listingId,
      deadline: this.taskForm.value.deadline,
    };
    console.log("newTask", newTask)
      this.api.createTask(newTask).subscribe(
        () => {
          console.log('Task created successfully');
          this.taskForm.reset();
          this.loadTasks.emit();
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
}
