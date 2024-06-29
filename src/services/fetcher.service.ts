import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FetcherService {
    constructor(public http: HttpClient) {}
    /*
    private apiUrl = "https://owi-back.azurewebsites.net"}
    */
   private apiUrl = "http://localhost:5291/api";

   //PROJECTS
  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/projects`);
  }
 
  getProjectById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/projects/${id}`);
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
    return this.http.get<any[]>(`${this.apiUrl}/listing/${projectId}`);
  }

  createListing(listing: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/listing`, listing);
  }

  updateListing(id: number, listing: any): Observable<any> {
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

  //COMMENTS
}
