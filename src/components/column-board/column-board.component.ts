import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FetcherService } from '../../services/fetcher.service';
import { CreateTaskComponent } from '../create-task/create-task.component';

@Component({
  selector: 'app-column-board',
  templateUrl: './column-board.component.html',
  styleUrls: ['./column-board.component.css'],
  standalone: true,
  imports: [CommonModule, DragDropModule, CreateTaskComponent]
})
export class ColumnBoardComponent implements OnInit {
  @Input() title: string = '';
  @Input() connectedTo: string[] = [];
  @Input() listingId!: number;
  tasks: any[] = [];



  constructor(private api: FetcherService) {}

  ngOnInit(): void {
      this.loadTasksByListing(this.listingId);
      console.log(5000,this.listingId)
  }

  loadTasksByListing(id: number) {
    this.api.getTasksByIdListing(id).subscribe(data => this.tasks = data)
  }

  drop(event: CdkDragDrop<any[]>, id: number) {
    console.log(event.previousContainer)
    console.log(event.container)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log('ok')
    } else {
      const taskId = event.previousContainer.data[event.previousIndex].id;
      this.listingId = id;
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
}
