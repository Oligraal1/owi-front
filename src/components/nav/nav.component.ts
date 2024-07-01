import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FetcherService } from '../../services/fetcher.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, FormsModule, BoardComponent, HomeComponent],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  projects: any = [];
  currentProjectId: number | null = null;
  newProjectName: string = '';
  showForm: boolean = false;
  showButton:  number | null  = null;
  selectedProject: any = { name: '', description: '', updatedat: '', deadline: '' };

  constructor(public api: FetcherService, private router: Router, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.api.getProjects().subscribe((data: any) => {
      this.projects = data;
    });
  }

  public getid(id: number): void {
    this.currentProjectId = id;
    console.log(this.currentProjectId);
    this.router.navigate(['/Board', id]);
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  toCreateProject(): void {
    const newProject = { name: this.newProjectName };
    this.api.createProject(newProject).subscribe(
      () => {
        console.log('Nouveau projet créé avec succès');
        this.refreshProjects();
        this.newProjectName = '';
      },
      (error) => {
        console.error('Erreur lors de la création du projet', error);
      }
    );
  }

  toggleButtons(projectId: number, event: MouseEvent): void {
   // event.stopPropagation();
    this.currentProjectId = projectId;
    if (this.showButton === projectId) {
      this.showButton = null;
      return;
    }
    this.showButton = projectId;
  }

  deleteProject(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer le projet ?')) {
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

  openEditModal(content: any, project: any): void {
    this.selectedProject = { ...project };
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  closeEditModal(): void {
    this.modalService.dismissAll();
  }

  editProject(form: any): void {
    this.selectedProject.updatedat = new Date();
    this.api.updateProject(this.selectedProject.id, this.selectedProject).subscribe(
      () => {
        console.log('Projet mis à jour avec succès');
        this.refreshProjects();
        this.closeEditModal();
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du projet', error);
      }
    );
  }

  private refreshProjects(): void {
    this.api.getProjects().subscribe((data: any) => {
      this.projects = data;
    });
  }
}
