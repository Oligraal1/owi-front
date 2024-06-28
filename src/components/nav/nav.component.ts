import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FetcherService } from '../../services/fetcher.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {
  @Input() projects: any = [];
  constructor(public api: FetcherService) {}

  ngOnInit(): void {
    this.api.getProjects().subscribe((data:any) => {
      console.log(data);
      this.projects = data;
    })
  
  }

}
