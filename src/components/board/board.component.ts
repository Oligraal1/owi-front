import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnBoardComponent } from '../column-board/column-board.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient, HttpClientModule, } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  standalone: true,
  imports: [CommonModule, ColumnBoardComponent, DragDropModule, FormsModule, HttpClientModule,]
})
export class BoardComponent {
  listings: any[] = []; // Array pour stocker les colonnes existantes
  newListingName: string = ''; // Variable pour stocker le nom de la nouvelle colonne
  isCreateListingModalOpen: boolean = false; // Variable pour gérer l'état de la modal

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Charge les colonnes existantes depuis l'API 
    this.loadListings();
  }

  loadListings() {
    // Chargement des colonnes depuis une API
    this.http.get<any[]>('/api/listings').subscribe(
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
    // Exemple d'envoi des données de création de colonne à une API (vous devez implémenter votre propre logique d'API)
    const newListing = { name: this.newListingName };

    this.http.post('votre/api/create-listing', newListing).subscribe(
      () => {
        console.log('Nouvelle colonne créée avec succès');
        // Rechargez les colonnes après la création
        this.loadListings();
        // Fermez la modal après la création
        this.closeCreateListingModal();
      },
      (error) => {
        console.error('Erreur lors de la création de la colonne', error);
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
