import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { NavComponent } from '../nav/nav.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , HeaderComponent, FooterComponent, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'owi-front';
}
