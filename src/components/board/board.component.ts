import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnBoardComponent } from '../column-board/column-board.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { FetcherService } from '../../services/fetcher.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  standalone: true,
  imports: [CommonModule, ColumnBoardComponent, DragDropModule, FormsModule, RouterLink]
})
export class BoardComponent {
  newListingName: string = '';
  isCreateListingModalOpen: boolean = false;
  projectId:any = 0;
  connectedTo: string[] = [];
  id: string | null = "0";

  constructor(public api: FetcherService, private route: ActivatedRoute) {}

  openCreateListingModal() {
    this.isCreateListingModalOpen = true;
  }

  closeCreateListingModal() {
    this.isCreateListingModalOpen = false;
  }

  ngOnInit() {
    console.log('route', this.id)
    this.route.paramMap.subscribe(params => {
      this.projectId = params.get('id');
      this.id = params.get('id');
    });

    // Charge les colonnes existantes depuis l'API
    // this.loadListings(this.projectId);
    console.log(2000,this.api.prj)
    // console.log("this.listingId",this.loadListings(this.projectId))
  }


  // loadListings(id: number) {
  //   // Chargement des colonnes depuis une API
  //   this.api.getListingsByProjectId(id).subscribe(
  //     (data) => {
  //       this.listings = data;
  //       console.log('DATA',data)
  //     },
  //     (error) => {
  //       console.error('Erreur lors du chargement des listings', error);
  //     }
  //   );
  // }


  createListing() {
    const newListing = { name: this.newListingName, projectId: this.projectId };

    this.api.createListing(newListing, this.projectId).subscribe(
      () => {
        console.log('Nouvelle liste créée avec succès');
        this.closeCreateListingModal();
      },
      (error) => {
        console.error('Erreur lors de la création de la liste', error);
      }
    );
  }

  getConnectedToList(currentListingId: number): string[] {
    return this.api.prj.listings
      .filter(l => l.id != currentListingId)
      .map(l => l.id.toString());
  }

   drop(event: CdkDragDrop<any[]>, listingId: number) {
    console.log("bonjour");
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const taskId = event.previousContainer.data[event.previousIndex].id;
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      this.api.updateTask(taskId, { listingId }, this.projectId).subscribe(
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
