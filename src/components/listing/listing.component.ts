import { Component, OnInit } from '@angular/core';
import { FetcherService } from '../../services/fetcher.service';

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss'
})
export class ListingComponent implements OnInit{

  /*liste:any[]
  constructor(private ListeServices: FetcherService) {
    this.ListeServices.getListingsByProjectId
  }*/
  ngOnInit(): void {
      console.log("OK")
  }
}
