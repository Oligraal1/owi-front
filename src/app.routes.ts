import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: 'Home', pathMatch:'full'},
    { path:'Home', component: HomeComponent},
];
