import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {
  Observable,
  catchError,
  forkJoin,
  map,
  switchMap,
  tap,
  throwError
} from "rxjs";
import {Listing} from "../components/models/listing.model";
import {Project} from "../components/models/project.model";
import {Task} from "../components/models/task.model";
import { Commentaire } from "../components/models/commentaire.model";

@Injectable({
  providedIn: "root"
})
export class FetcherService {
<<<<<<< HEAD
    constructor(public http: HttpClient) {
    }

    private apiUrl = "https://owi-back.azurewebsites.net/api"

  //  private apiUrl = "http://localhost:5291/api";
=======
  constructor(public http: HttpClient) {}
  /*
    private apiUrl = "https://owi-back.azurewebsites.net"}
    */
  private apiUrl = "http://localhost:5291/api";
  private idProject!: number;
>>>>>>> boardPage

  public prj: Project = {
    id: 1,
    name: "",
    description: "",
    listings: []
  };

  //PROJECTS
  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/projects`);
  }

  // refresh(projectId: number) {
  //   return this.http.get<any>(`${this.apiUrl}/projects/${projectId}`).pipe(
  //     tap((response: any) => {
  //       this.prj = response;
  //       console.log("Loaded project:", this.prj);
  //     }),
  //     switchMap(() => this.loadListings(projectId)),
  //     catchError(error => {
  //       console.error("Error loading project:", error);
  //       return throwError(error);
  //     })
  //   );
  // }

  // private loadListings(projectId: number) {
  //   return this.http.get<Listing[]>(`${this.apiUrl}/listing/${projectId}`).pipe(
  //     tap((listings: Listing[]) => {
  //       this.prj.listings = listings;
  //       console.log("Loaded listings:", listings);
  //     }),
  //     switchMap((listings: Listing[]) => this.loadTasksForListings(listings)),
  //     catchError(error => {
  //       console.error("Error loading listings:", error);
  //       return throwError(error);
  //     })
  //   );
  // }

  // private loadTasksForListings(listings: Listing[]) {
  //   const tasksRequests = listings.map(listing =>
  //     this.http.get<Task[]>(`${this.apiUrl}/task/listing/${listing.id}`).pipe(
  //       map((tasks: Task[]) => {
  //         listing.tasks = tasks;
  //         console.log(`Loaded tasks for listing ${listing.id}:`, tasks);
  //         return tasks;
  //       }),
  //       switchMap((tasks: Task[]) => this.loadCommentairesForTasks(listing, tasks)),
  //       catchError(error => {
  //         console.error(
  //           `Error loading tasks for listing ${listing.id}:`,
  //           error
  //         );
  //         return throwError(error);
  //       })
  //     )
  //   );

  //   return tasksRequests.length > 0
  //     ? tasksRequests.reduce((prev, curr) => prev.pipe(switchMap(() => curr)))
  //     : [];
  // }

  // private loadCommentairesForTasks(listing: Listing, tasks: Task[]) {
  //   const commentsRequests = tasks.map((task, index) =>
  //     this.http.get<Commentaire[]>(`${this.apiUrl}/comment/task/${task.id}`).pipe(
  //       map((commentsData: any[]) => {
  //         const comments: Commentaire[] = commentsData.map(comment => ({
  //           id: comment.id,
  //           content: comment.content,
  //           taskId: comment.taskId
  //           // Ajouter d'autres champs si nécessaire
  //         }));

  //         console.log(`Loaded comments for task ${task.id}:`, comments);
  //         listing.tasks[index] = task; // Update task in listing with comments
  //         return comments;
  //       }),
  //       catchError(error => {
  //         console.error(`Error loading comments for task ${task.id}:`, error);
  //         return throwError(error);
  //       })
  //     )
  //   );

  //   return commentsRequests.length > 0
  //     ? commentsRequests.reduce((prev, curr) =>
  //         prev.pipe(switchMap(() => curr))
  //       )
  //     : [];
  // }
  refresh(projectId: number) {
  this.http.get<any>(`${this.apiUrl}/projects/${projectId}`).subscribe(
    (response) => {
      this.prj = response;
      this.idProject = response.id;
      console.log("this.prj", this.prj);
      this.http.get<Listing[]>(`${this.apiUrl}/listing/${projectId}`).subscribe(
        (listings) => {
          this.prj.listings = listings;
          console.log("ok Listes", listings)
          listings.forEach((listing, index) => {
            this.http.get<Task[]>(`${this.apiUrl}/task/listing/${listing.id}`).subscribe(
              (tasks) => {
                if(this.prj.listings[index].tasks) {
                  console.log("ok", tasks)
                this.prj.listings[index].tasks = tasks;
                // tasks.forEach((task, i) => {
                //   this.http.get<Commentaire[]>(`${this.apiUrl}/comment/task/${task.id}/${listing.id}`).subscribe(
                //     (comments) => {
                //       console.log('comment', this.prj.listings[index].tasks[i].comments)
                //       if(this.prj.listings[index].tasks[i].comments) {
                //       this.prj.listings[index].tasks[i].comments = comments;
                //       }
                //     },
                //     (error) => {
                //       console.error(`Erreur lors du chargement des commentaires pour la tâche ${task.id}`, error);
                //     }
                //   );
                // });
                }
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
    return this.http
      .get<any>(`${this.apiUrl}/projects/${id}`)
      .pipe(tap(() => this.refresh(id)));
  }

  createProject(project: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/projects`, project)
      .pipe(tap(() => this.refresh(project.id)));
  }

  updateProject(id: number, project: any): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/projects/${id}`, project)
      .pipe(tap(() => this.refresh(id)));
  }

  deleteProject(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/projects/${id}`)
      .pipe(tap(() => this.refresh(id)));
  }

  //LISTING
  getListingsByProjectId(projectId: number): Observable<any[]> {
    return this.http
      .get<Listing[]>(`${this.apiUrl}/listing/${projectId}`)
      .pipe(tap(() => this.refresh(projectId)));
  }

  getListingById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/listing/${id}`);
  }

  createListing(listing: any, projectId: number): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/listing`, listing)
      .pipe(tap(() => this.refresh(projectId)));
  }

  updateListing(
    id: number,
    listing: Listing,
    projectId: number
  ): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/listing/${id}`, listing)
      .pipe(tap(() => this.refresh(projectId)));
  }

  deleteListing(id: number, projectId: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/listing/${id}`)
      .pipe(tap(() => this.refresh(projectId)));
  }

  //TASKS
  getTasksByIdListing(listingId: number): Observable<any> {
    return this.http.get<Task[]>(`${this.apiUrl}/task/listing/${listingId}`);
  }

  getTask(id : number): Observable<any> {
    return this.http.get<Task>(`${this.apiUrl}/task/${id}`).pipe(
      tap(
        (value)=>console.log(value)
      )
    )
  }

  createTask(task: any, projectId: number): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/task`, task)
      .pipe(tap(() => this.refresh(projectId)));
  }

  updateTask(id: number, task: any, projectId: number): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/task/${id}`, task)
      .pipe(tap(() => this.refresh(projectId)));
  }

  deleteTask(id: number, projectId: number) {
    return this.http
      .delete<any>(`${this.apiUrl}/task/${id}`)
      .pipe(tap(() => this.refresh(projectId)));
  }

  //COMMENTS
  getCommentairesByTaskId(taskId: number): Observable<Commentaire[]> {
    return this.http.get<Commentaire[]>(`${this.apiUrl}/comment/task/${taskId}`);
  }

  createCommentaire(comment: Commentaire): Observable<Commentaire> {
  return this.http.post<Commentaire>(`${this.apiUrl}/comment`, comment).pipe(
    tap(() => this.refresh(this.idProject))
  );
}

  updateCommentaire(
    id: number,
    comment: Commentaire,
    projectId: number
  ): Observable<Commentaire> {
    return this.http
      .put<Commentaire>(`${this.apiUrl}/comment/${id}`, comment)
      .pipe(tap(() => this.refresh(projectId)));
  }

  deleteCommentaire(id: number, projectId: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/comment/${id}`)
      .pipe(tap(() => this.refresh(projectId)));
  }
}
