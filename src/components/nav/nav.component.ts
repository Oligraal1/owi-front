import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FetcherService } from '../../services/fetcher.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {
  @Input() projects: any = [];
  newProjectName: string = '';
  constructor(public api: FetcherService) {}

  ngOnInit(): void {
    this.api.getProjects().subscribe((data:any) => {
      console.log(data);
      this.projects = data;
    })
  }

  toCreateProject(){
    const newProject = {name: this.newProjectName};
    
    this.api.createProject(newProject).subscribe(
      () => {
        console.log('Nouveau projet créé avec succès');
      },
      (error) => {
        console.error('Erreur lors de la création du projet', error);
      }
    );
  }

}
