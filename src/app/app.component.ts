import { Component } from "@angular/core";
import { TaskComponent } from "../components/task/task.component";
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskComponent, NgClass],
  template: `<app-task></app-task>`,
  //tyleUrls: ['./app.component.css']
})
export class AppComponent {}
