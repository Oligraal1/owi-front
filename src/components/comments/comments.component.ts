import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent {
  @Input()
  tasktocomment: any;
  
  // monter l'info(evenement) de enfant à parent
  /*@Output()
  ring = new EventEmitter<any>();*/

  //constructor(public router: Router, public http: HttpClient) { }


}
