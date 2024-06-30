import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnBoardComponent } from '../column-board/column-board.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { FetcherService } from '../../services/fetcher.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  standalone: true,
  imports: [CommonModule, ColumnBoardComponent, DragDropModule, FormsModule]
})
export class BoardComponent {
  listings: any[] = [];
  newListingName: string = ''; 
  isCreateListingModalOpen: boolean = false;
  projectId:any = 0;
  projectName!:string;
  listingId!:number;
  connectedTo: string[] = [];

  constructor(private api: FetcherService,private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.projectId = params.get('id');
    });

    this.loadProjectName(this.projectId)
    // Charge les colonnes existantes depuis l'API
    this.loadListings();
    console.log(2000,this.listings)
    console.log("this.listingId",this.listingId)
  }

  loadProjectName(id: number) {
    this.api.getProjectById(id).subscribe(data => this.projectName = data.name)
  }
  loadListings() {
    // Chargement des colonnes depuis une API
    this.api.getListingsByProjectId(this.projectId).subscribe(
      (data) => {
        this.listings = data;
        
      },
      (error) => {
        console.error('Erreur lors du chargement des listings', error);
      }
    );
  }

  openCreateListingModal() {
    this.isCreateListingModalOpen = true;
  }

  closeCreateListingModal() {
    this.isCreateListingModalOpen = false;
  }

  createListing() {
    const newListing = { name: this.newListingName, projectId: this.projectId };

    this.api.createListing(newListing).subscribe(
      () => {
        console.log('Nouvelle liste créée avec succès');
        this.loadListings();
        this.closeCreateListingModal();
      },
      (error) => {
        console.error('Erreur lors de la création de la liste', error);
      }
    );
  }

  getConnectedToList(currentListingId: number): string[] {
    return this.listings
      .filter(l => l.id != currentListingId)
      .map(l => l.id.toString());
  }

   drop(event: CdkDragDrop<any[]>, listingId: number) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const taskId = event.previousContainer.data[event.previousIndex].id;
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      this.api.updateTask(taskId, { listingId }).subscribe(
        () => {
          console.log('Task column updated successfully');
        },
        error => {
          console.error('Error updating task column', error);
        }
      );
    }
  }
}
