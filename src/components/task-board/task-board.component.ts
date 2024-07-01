import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FetcherService } from '../../services/fetcher.service';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { Task } from '../models/task.model';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { DragDropModule, transferArrayItem } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TaskFormComponent } from '../task-form/task-form.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Listing } from '../models/listing.model';

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [CommonModule, CreateTaskComponent, DragDropModule, TaskFormComponent, RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.scss'
})
export class TaskBoardComponent implements OnInit {
  @Input() tasks: Task[] = [];
  @Input() listingId!: number;
  @Input() connectedTo: string[] = [];
  @Input() showCardTask: boolean = false;
  @Input() showTaskForm: boolean = false;
  @Input() projectId!: number;
  @Output() loadTasks = new EventEmitter<void>();

  editingTask: Task | null = null;
  isOpen: boolean = false;
  moveTaskForm!: FormGroup;
  listings!: any;
  selectedListingId!: number;
  comments: any[]= [];

  constructor(private api: FetcherService, public dialog: MatDialog, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadTasksByListing(this.listingId);
  }

  loadTasksByListing(listingId: number): void {
    if (this.api.prj.listings) {
      const listing = this.api.prj.listings.find(l => l.id === listingId);
      if (listing) {
        this.tasks = listing.tasks;
       this.tasks.forEach(task => {
        if(task.comments) {
          this.comments = task.comments
        }
       });
        
      } else {
        console.error(`Listing with ID ${listingId} not found`);
      }
    } else {
      console.error('Listings not loaded');
    }
  }

  drop(event: CdkDragDrop<any>, id: number) {
    // console.log(1000, this.connectedTo)
    // console.log("event.previousContainer.data :", event.previousContainer);
    // console.log("event.container :", event.container);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log('ok')
    } else {
      const taskId = event.previousContainer.data[event.previousIndex].id;
      this.listingId = id;
      // console.log(1500, this.connectedTo)
      // console.log("event.previousContainer.data :", event.previousContainer.data);
      // console.log("event.container.data :", event.container.data);
      // console.log("event.previousIndex :", event.previousIndex);
      // console.log("event.currentIndex :", event.currentIndex);
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.api.updateTask(taskId, { listingId: id }, this.projectId).subscribe(
        () => {
          console.log('Task column updated successfully');
        },
        error => {
          console.error('Error updating task column', error);
        }
      );
    }
  }

  toggleDropdown(task: Task) {
    task.showDropdown = !task.showDropdown;
  }

  editTask(task: Task) {
    this.editingTask = { ...task };
    this.showTaskForm = true;
  }

  updateTask(updatedTask: Task) {
    if (updatedTask.id !== undefined) {
      this.api.updateTask(updatedTask.id, updatedTask, this.projectId).subscribe(
        () => {
          this.loadTasksByListing(this.listingId);
          this.editingTask = null;
          this.showTaskForm = false;
        },
        error => {
          console.error('Error updating task', error);
        }
      );
    } else {
      console.error('Cannot update task: id is undefined');
    }
  }

  deleteTask(taskId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '350px';
    dialogConfig.height = '200px';
    dialogConfig.disableClose = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.autoFocus = false;
    dialogConfig.position = { top: '10px', left: '50%', bottom: '150px' };
    dialogConfig.panelClass = 'dialog-centered';
    dialogConfig.data = { itemToDelete: 'tâche' };

    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.api.deleteTask(taskId, this.projectId).subscribe(
          () => {
            this.loadTasksByListing(this.listingId);
          },
          error => {
            console.error('Error deleting task', error);
          }
        );
      }
    });
  }

  cancelEdit() {
    this.editingTask = null;
    this.showTaskForm = false;
  }

openSelectListing() {
  this.isOpen = true;
}
  moveTask(task: Task) {
  if (this.selectedListingId && task.listingId !== this.selectedListingId) {
    const updatedTask: Task = {
      ...task,
      listingId: this.selectedListingId
    };
    const updateTaskId: any =updatedTask.id;
  if(updatedTask) {
    this.api.updateTask(updateTaskId, updatedTask, this.projectId).subscribe(
      () => {
        console.log('Task moved successfully');
        // Mettez à jour la liste des tâches après le déplacement si nécessaire
        // this.loadTasks(); // Assurez-vous que cette fonction existe pour recharger les tâches
      },
      error => {
        console.error('Error moving task', error);
      }
    );
  }
  }
}

}
