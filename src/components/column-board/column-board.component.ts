import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FetcherService } from '../../services/fetcher.service';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { TaskFormComponent } from '../task-form/task-form.component';
import { Task } from '../models/task.model';
import { TaskComponent } from '../task/task.component';
import { MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ListingFormComponent } from '../listing-form/listing-form.component';
import { TaskBoardComponent } from '../task-board/task-board.component';

@Component({
  selector: 'app-column-board',
  templateUrl: './column-board.component.html',
  styleUrls: ['./column-board.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    CreateTaskComponent,
    TaskFormComponent,
    TaskComponent,
    MatDialogModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    ListingFormComponent,
    TaskBoardComponent
  ]
})
export class ColumnBoardComponent implements OnInit {
  @Input() title: string = '';
  @Input() connectedTo: string[] = [];
  @Input() listingId!: number;
  @Input() projectId!: number;
  tasks: Task[] = [];
  editingTask: Task | null = null;
  showCardTask: boolean = false;
  showTaskForm: boolean = false;
  showListingForm: boolean = false;
  showTaskCreate: boolean = false;
  @Output() loadListings = new EventEmitter<void>();
  @Output() loadTasks = new EventEmitter<void>;

  constructor(private api: FetcherService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadTasksByListing(this.listingId);
    console.log("listingId", this.listingId)
    // console.log(2500,this.connectedTo)
  }

  loadTasksByListing(id: number) {
    this.api.getTaskByListingId(id).subscribe((data: Task[]) => {
      this.tasks = data.map((task: Task) => ({ ...task, showDropdown: false }));
    });
  }

  // drop(event: CdkDragDrop<any[]>, id: number) {
  //   console.log(1000, this.connectedTo)
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //     console.log('ok')
  //   } else {
  //     const taskId = event.previousContainer.data[event.previousIndex].id;
  //     this.listingId = id;
  //     console.log(1500, this.connectedTo)
  //     transferArrayItem(event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex);
  //     this.api.updateTask(taskId, { listingId: id }).subscribe(
  //       () => {
  //         console.log('Task column updated successfully');
  //       },
  //       error => {
  //         console.error('Error updating task column', error);
  //       }
  //     );
  //   }
  // }

  createTask() {
    this.showTaskCreate = true;
  }

  editListing() {
    this.showListingForm = true;
  }

  deleteListing(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '350px';
    dialogConfig.height = '200px';
    dialogConfig.disableClose = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.autoFocus = false;
    dialogConfig.position = { top: '10px', left: '50%', bottom: '150px' };
    dialogConfig.panelClass = 'dialog-centered';
    dialogConfig.data = { itemToDelete: 'liste' };

    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.api.deleteListing(this.listingId).subscribe(
          () => {
            this.loadListings.emit();
          },
          error => {
            console.error('Error deleting listing', error);
          }
        );
      }
    });
  }

  onListingUpdated() {
    this.loadListings;
  }


  editTask(task: Task) {
    this.editingTask = { ...task };
    this.showTaskForm = true;
    this.showTaskCreate = true;
  }

  cancelEdit() {
    this.editingTask = null;
    this.showTaskForm = false;
    this.showTaskCreate = false;
  }
}
