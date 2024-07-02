import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { Listing } from "../components/models/listing.model";
import { Project } from "../components/models/project.model";
import { Task } from "../components/models/task.model";

@Injectable({
    providedIn: 'root'
})
export class FetcherService {
    constructor(public http: HttpClient) {
    }

    private apiUrl = "https://owi-back.azurewebsites.net/api"

  //  private apiUrl = "http://localhost:5291/api";



  public prj : Project = {
    id: 1,
    name: "",
    description: "",
    listings: []
  }


   //PROJECTS
  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/projects`);
  }

  refresh(id : number) {
    this.http.get<any>(`${this.apiUrl}/projects/${id}`).subscribe(
      (response) => {
        this.prj = response;
        console.log("yolo", this.prj);
        this.http.get<Listing[]>(`${this.apiUrl}/listing/${id}`).subscribe(
          (listings) => {
            this.prj.listings = listings;
            listings.forEach((listing, index) => {
              this.http.get<Task[]>(`${this.apiUrl}/task/listing/${id}`).subscribe(
                (tasks) => {
                  this.prj.listings[index].tasks = tasks; // Assurez-vous que 'tasks' est bien une propriété de Listing
                },
                (error) => {
                  console.error(`Erreur lors du chargement des tâches pour la liste ${listing.id}`, error);
                }
              );
            });
          },
          (error) => {
            console.error('Erreur lors du chargement des listes', error);
          }
        );
      },
      (error) => {
        console.error('Erreur lors du chargement du projet', error);
      }
    );
  }


  getProjectById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/projects/${id}`).pipe(
      tap(()=>this.refresh(id))
    )
  }

  createProject(project: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/projects`, project).pipe(
      tap(()=>this.refresh(project.id)))
  }

  updateProject(id: number, project:any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/projects/${id}`, project).pipe(
      tap(()=>this.refresh(id)))
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/projects/${id}`).pipe(
      tap(()=>this.refresh(id)));
  }

   //LISTING
   getListingsByProjectId(projectId: number): Observable<any[]> {
    return this.http.get<Listing[]>(`${this.apiUrl}/listing/${projectId}`).pipe(
      tap(()=>this.refresh(projectId))
    )
  }

    getListingById(id: number): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/listing/${id}`);
    }

  createListing(listing: any, projectId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/listing`, listing).pipe(
      tap(()=>this.refresh(projectId)))
  }

  updateListing(id: number, listing: Listing, projectId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/listing/${id}`, listing).pipe(
      tap(()=>this.refresh(projectId)));
  }

  deleteListing(id: number, projectId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/listing/${id}`).pipe(
      tap(()=>this.refresh(projectId)));
  }

  //TASKS
  getTasksByIdListing(listingId: number): Observable<any> {
    return this.http.get<Task[]>(`${this.apiUrl}/task/listing/${listingId}`)
  }

  createTask(task: any, projectId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/task`, task).pipe(
      tap(()=>this.refresh(projectId)));
  }

  updateTask(id: number, task: any, projectId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/task/${id}`, task).pipe(
      tap(()=>this.refresh(projectId)));
  }

  deleteTask(id: number, projectId: number) {
    return this.http.delete<any>(`${this.apiUrl}/task/${id}`).pipe(
      tap(()=>this.refresh(projectId)));;
  }

  //COMMENTS
}
