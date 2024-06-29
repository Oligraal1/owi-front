import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FetcherService } from '../../services/fetcher.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BoardComponent } from '../board/board.component';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, FormsModule, BoardComponent, HomeComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {
  projects: any = [];
  projectName!: string;
  currentProjectId = 0;
  newProjectName: string = '';
  isOpen: boolean = false;

  constructor(public api: FetcherService, private router: Router) { }

  ngOnInit(): void {
    this.loadProjects()
  }
  public loadProjects() {
    this.api.getProjects().subscribe((data: any) => {
      this.projects = data;
    })
  }
  public getid(id: number) {
    console.log(id);
    // this.currentProjectId = id;
     this.router.navigate(['/Board', id]);
  }

  public openModalCreation() {
    this.isOpen = true;
  }

  toCreateProject() {
    const newProject = { name: this.newProjectName };

    this.api.createProject(newProject).subscribe(
      () => {
        console.log('Nouveau projet créé avec succès');
        this.loadProjects();
        this.isOpen = false;
        this.router.navigate(['Home']);
      },
      (error) => {
        console.error('Erreur lors de la création du projet', error);
      }
    );
  }

}
