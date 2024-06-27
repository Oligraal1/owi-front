import { Routes } from '@angular/router';
import { ListingComponent } from './components/listing/listing.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch:'full'},
  {path: 'home', component: ListingComponent},];
