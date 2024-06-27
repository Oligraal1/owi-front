import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

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
}