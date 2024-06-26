import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css'],
  standalone: true,
  imports: [CommonModule, DragDropModule]
})
export class TaskBoardComponent {
  @Input() task: any;
}
