import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { Listing } from "../components/models/listing.model";
import { Project } from "../components/models/project.model";

@Injectable({
    providedIn: 'root'
})
export class FetcherService {
    constructor(public http: HttpClient) {}
    /*
    private apiUrl = "https://owi-back.azurewebsites.net"}
    */
   private apiUrl = "http://localhost:5291/api";



  public prj : Project = {
    Id: 0,
    Name: "",
    Description: "",
    Listings: []
  }

   //PROJECTS
  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/projects`);
  }

  getProjectById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/projects/${id}`).pipe(
      tap(
        (responnse)=>{
          console.log("res ----->", responnse);
          this.prj = responnse;
          console.log("prj ----->", this.prj);
          this.getListingsByProjectId(id).subscribe();
          console.log("prj ----->", this.prj);
        }
    )
    )
  }

  createProject(project: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/projects`, project);
  }

  updateProject(id: number, project:any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/projects/${id}`, project);
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/projects/${id}`);
  }

   //LISTING
   getListingsByProjectId(projectId: number): Observable<any[]> {
    return this.http.get<Listing[]>(`${this.apiUrl}/listing/${projectId}`).pipe(
      tap(
        (listes)=>{
          if (this.prj)
          {
            this.prj.Listings = listes;
          }
        }
      )
    )
  }

    getListingById(id: number): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/listing/${id}`);
    }

  createListing(listing: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/listing`, listing);
  }

  updateListing(id: number, listing: Listing): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/listing/${id}`, listing);
  }

  deleteListing(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/listing/${id}`);
  }

  //TASKS
  getTasksByIdListing(listingId: number): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/task/listing/${listingId}`);
  }

  createTask(task: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/task`, task);
  }

  updateTask(id: number, task: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/task/${id}`, task);
  }

  deleteTask(id: number) {
    return this.http.delete<any>(`${this.apiUrl}/task/${id}`);
  }

  //COMMENTS
}
