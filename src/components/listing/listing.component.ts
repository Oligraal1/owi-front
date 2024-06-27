import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss'
})
export class ListingComponent implements OnInit{
  ngOnInit(): void {
      console.log("OK")
  }
}
