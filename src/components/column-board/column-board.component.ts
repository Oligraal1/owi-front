import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FetcherService } from '../../services/fetcher.service';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { TaskFormComponent } from '../task-form/task-form.component';
import {Task} from '../models/task.model';

@Component({
  selector: 'app-column-board',
  templateUrl: './column-board.component.html',
  styleUrls: ['./column-board.component.css'],
  standalone: true,
  imports: [CommonModule, DragDropModule, CreateTaskComponent, TaskFormComponent]
})
export class ColumnBoardComponent implements OnInit {
  @Input() title: string = '';
  @Input() connectedTo: string[] = [];
  @Input() listingId!: number;
  tasks: Task[] = [];
  editingTask: Task | null = null;


  constructor(private api: FetcherService) {}

  ngOnInit(): void {
      this.loadTasksByListing(this.listingId);
      console.log(5000,this.listingId)
      console.log(2500,this.connectedTo)
  }

  loadTasksByListing(id: number) {
    this.api.getTasksByIdListing(id).subscribe(data => {
      this.tasks = data.map((task: Task) => ({ ...task, showDropdown: false }));
    });
  }

  drop(event: CdkDragDrop<any[]>, id: number) {
   
    console.log(1000,this.connectedTo)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log('ok')
    } else {
      const taskId = event.previousContainer.data[event.previousIndex].id;
      this.listingId = id;
      console.log(1500,this.connectedTo)
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      this.api.updateTask(taskId, {listingId: id}).subscribe(
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
  }

  updateTask(updatedTask: Task) {
    this.api.updateTask(updatedTask.id, updatedTask).subscribe(
      () => {
        this.loadTasksByListing(this.listingId);
        this.editingTask = null;
      },
      error => {
        console.error('Error updating task', error);
      }
    );
  }

  deleteTask(taskId: number) {
    this.api.deleteTask(taskId).subscribe(
      () => {
        this.loadTasksByListing(this.listingId);
      },
      error => {
        console.error('Error deleting task', error);
      }
    );
  }

  cancelEdit() {
    this.editingTask = null;
  }
}
