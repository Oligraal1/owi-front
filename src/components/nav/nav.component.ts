import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FetcherService } from '../../services/fetcher.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {
  projects: any = [];
  constructor(public fetcher: FetcherService) {}

  ngOnInit(): void {
    /*this.fetcher.getProjects().subscribe((data:any) => {
      console.log(data);
      this.projects = data;
    })*/
   this.projects = ["projet1","projet2","projet3"]; //ligne à supprimer après lien avec API
  }

}
