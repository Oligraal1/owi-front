import { Component, OnInit } from '@angular/core';
import { CommentsComponent } from '../comments/comments.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommentsComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit {
  task: TaskComponent | undefined; // Define the task property with the Task type

  constructor() {
    // Initialize the task property (example with dummy data)
    this.task = {
      Name: 'Sample Task',
      CreatedAt: new Date(),
      ModifiedAt: new Date(),
      Description: 'This is a sample task description'
    };
  }

  ngOnInit(): void {
    // You can fetch and assign the task data here
  }
}


//task: any[] | undefined

  
  /*afficherElement(tasktocomment: any) {
    console.log(tasktocomment);
    //this.comment = comment;

  }*/


