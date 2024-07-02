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
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Listing } from '../models/listing.model';

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [CommonModule, CreateTaskComponent, DragDropModule, TaskFormComponent, RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.scss'
})
export class TaskBoardComponent implements OnInit {
  @Input() listingId!: number;
  @Input() connectedTo: string[] = [];
  @Input() showCardTask: boolean = false;
  @Input() showTaskForm: boolean = false;
  @Output() loadTasks = new EventEmitter<void>();
  @Input() tasks! : Task[];


  editingTask: Task | null = null;
  isOpen: boolean = false;
  moveTaskForm!: FormGroup;
  listings!: any;
  selectedListingId!: number;

  constructor(public api: FetcherService, public dialog: MatDialog, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.moveTaskForm = this.fb.group({
      selectListing: ['', Validators.required]
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
      this.api.updateTask(taskId, { listingId: id }, this.api.prj.id!).subscribe(
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
      this.api.updateTask(updatedTask.id, updatedTask, this.api.prj.id!).subscribe(
        () => {
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
        this.api.deleteTask(taskId, this.api.prj.id!).subscribe(
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


  moveTask(task: any): void {
    if (this.moveTaskForm.valid) {
      const selectedListingId = this.moveTaskForm.get('selectListing')!.value;
      task.listingId = selectedListingId;
      // Appel à l'API pour déplacer la tâche
      this.api.updateTask(task.id, task, this.api.prj.id!).subscribe(
        () => {
          console.log('Task moved successfully');
          // Mettez à jour la liste des tâches après le déplacement si nécessaire
          // this.loadTasks(); // Assurez-vous que cette fonction existe pour recharger les tâches
        }
      );      // Logique après le déplacement de la tâche
      console.log('Tâche déplacée avec succès');
    }
  }

}
