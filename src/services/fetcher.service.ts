import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FetcherService {
    constructor(public http: HttpClient) {}
    /*
    private apiUrl = "https://owi-back.azurewebsites.net"

    getProjects(){
    return this.http.get(apiUrl + '/Projects');
    }
    */
   private apiUrl = "http://localhost:5291/api";

   //PROJECTS
   getProjects() {
    return this.http.get(this.apiUrl+"/projects");
   }

   //LISTING
   getListingsByProjectId(projectId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/listing/${projectId}`);
  }

  createListing(listing: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, listing);
  }

  updateListing(id: number, listing: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, listing);
  }

  deleteListing(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  //TASKS

  //COMMENTS
}
