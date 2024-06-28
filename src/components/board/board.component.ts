import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnBoardComponent } from '../column-board/column-board.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient, HttpClientModule, } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FetcherService } from '../../services/fetcher.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  standalone: true,
  imports: [CommonModule, ColumnBoardComponent, DragDropModule, FormsModule, HttpClientModule]
})
export class BoardComponent {
  listings: any[] = []; // Array pour stocker les colonnes existantes
  newListingName: string = ''; // Variable pour stocker le nom de la nouvelle colonne
  isCreateListingModalOpen: boolean = false; // Variable pour gérer l'état de la modal
  projectId = 0;
  constructor(private api: FetcherService,private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log("id récup de la route " + id);
    });
    // Charge les colonnes existantes depuis l'API
    // this.loadListings();
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
    const newListing = { name: this.newListingName, projetcId: this.projectId };

    this.api.createListing(newListing).subscribe(
      () => {
        console.log('Nouvelle liste créée avec succès');
        // Rechargez les colonnes après la création
        this.loadListings();
        // Fermez la modal après la création
        this.closeCreateListingModal();
      },
      (error) => {
        console.error('Erreur lors de la création de la liste', error);
      }
    );
  }
   drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}
