import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FetcherService } from '../../services/fetcher.service';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})
export class CreateTaskComponent implements OnInit {
  taskForm!: FormGroup;
  @Input() listingId!: number;
  @Output() loadTasks: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder,
    private api: FetcherService
  ) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      tag: [''],
      listingId: [this.listingId],
      deadline: ['']
    });
    console.log(this.taskForm)
    console.log(1000,this.listingId)
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const newTask: any = this.taskForm.value;
      this.api.createTask(newTask).subscribe(
        () => {
          console.log('Task created successfully');
          this.taskForm.reset(); // Réinitialiser le formulaire après la soumission
          this.loadTasks.emit(); // Émettre l'événement vers le parent pour charger les tâches
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
}
