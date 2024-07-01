import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoardComponent } from '../board/board.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { NavComponent } from '../nav/nav.component';
import { TaskComponent } from '../task/task.component';
import { CommentComponent } from '../comments/comments.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent,
    NavComponent, TaskComponent, BoardComponent, CommentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'owi-front';
}
