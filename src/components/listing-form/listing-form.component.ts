import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FetcherService } from '../../services/fetcher.service';
import { CommonModule } from '@angular/common';
import { Listing } from '../models/listing.model';


@Component({
  selector: 'app-listing-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './listing-form.component.html',
  styleUrl: './listing-form.component.scss'
})
export class ListingFormComponent implements OnInit {
  @Input() listingId!: number;
  @Input() projectId!: number;
  @Output() listingUpdated = new EventEmitter<void>();

  listing!: Listing;
  listingForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: FetcherService
  ) {}

  ngOnInit(): void {
    if (this.listingId) {
      this.loadListing(this.listingId);
    }
    this.listingForm = this.fb.group({
      name: ['', Validators.required],
      projectId: [this.projectId, Validators.required]
    });
    console.log(1000,this.listingForm.value)
    console.log('listing',this.listing)
  }

  loadListing(id: number): void {
    this.api.getListingById(id).subscribe(listing => {
      this.listing = listing; // Mettre à jour l'objet Listing avec les données reçues
      this.listingForm.patchValue(listing); // Pré-remplir le formulaire avec les données du listing
    });
  }

  updateListing(): void {
    if (this.listingForm.valid && this.listingId !== undefined) {
    const updatedListing = { ...this.listingForm.value, id: this.listingId };
    console.log('Updated Listing:', updatedListing);
    this.api.updateListing(this.listingId, updatedListing).subscribe(() => {
      this.listingUpdated.emit();
    }, error => {
      console.error('Error updating listing', error);
    });
  }
  }
}
