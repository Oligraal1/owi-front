import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskBoardComponent } from '../task-board/task-board.component';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-column-board',
  templateUrl: './column-board.component.html',
  styleUrls: ['./column-board.component.css'],
  standalone: true,
  imports: [CommonModule, TaskBoardComponent, DragDropModule]
})
export class ColumnBoardComponent {
  @Input() title: string = '';
  @Input() tasks: any[] = [];
   @Input() connectedTo: string[] = [];

   drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}
