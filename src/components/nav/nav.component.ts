import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FetcherService } from '../../services/fetcher.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {
  projects: any = [];
  currentProjectId = 0;
  newProjectName: string = '';
  constructor(public api: FetcherService, private router: Router) {}

  ngOnInit(): void {
    this.api.getProjects().subscribe((data:any) => {
      console.log(data);
      this.projects = data;
    })
  }

  public getid (id:number){

    this.currentProjectId = id;
   console.log(this.currentProjectId);
   this.router.navigate(['/Board', id]);
  }

  toCreateProject() {
    const newProject = { name: this.newProjectName };
    
    this.api.createProject(newProject).subscribe(
      () => {
        console.log('Nouveau projet créé avec succès');
        this.refreshProjects(); 
      },
      (error) => {
        console.error('Erreur lors de la création du projet', error);
      }
    );
  }

  deleteProject(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      this.api.deleteProject(id).subscribe(
        () => {
          console.log('Projet supprimé avec succès');
          this.refreshProjects();
        },
        (error) => {
          console.error('Erreur lors de la suppression du projet', error);
        }
      );
    }
  }

  private refreshProjects() {
    this.api.getProjects().subscribe((data: any) => {
      this.projects = data;
    });
  }
}
