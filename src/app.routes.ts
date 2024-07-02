import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BoardComponent } from './components/board/board.component';
import { NavComponent } from './components/nav/nav.component';
import { TaskComponent } from './components/task/task.component';


export const routes: Routes = [
    { path: '', redirectTo: 'Home', pathMatch:'full'},
    { path:'Home', component: HomeComponent},
    { path: 'Board/:id', component: BoardComponent },
    { path: 'Task/:id', component: TaskComponent }
];
