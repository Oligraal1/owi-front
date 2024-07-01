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

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [CommonModule, CreateTaskComponent, DragDropModule, TaskFormComponent, RouterLink],
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.scss'
})
export class TaskBoardComponent implements OnInit {
  @Input() tasks: Task[] = [];
  @Input() listingId!: number;
  @Input() connectedTo: string[] = [];
  @Input() showCardTask: boolean = false;
  @Input() showTaskForm: boolean = false;
  @Output() loadTasks = new EventEmitter<void>();

  editingTask: Task | null = null;

  constructor(private api: FetcherService, public dialog: MatDialog) { }

  ngOnInit(): void {
    // Chargez les tâches pour le listingId spécifié
    this.loadTasksByListing(this.listingId);
  }

  loadTasksByListing(id: number) {
    this.api.getTasksByIdListing(id).subscribe(data => {
      this.tasks = data.map((task: Task) => ({ ...task, showDropdown: false }));
    });
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
      this.api.updateTask(taskId, { listingId: id }).subscribe(
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
      this.api.updateTask(updatedTask.id, updatedTask).subscribe(
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
        this.api.deleteTask(taskId).subscribe(
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
}
