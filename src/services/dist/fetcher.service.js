"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FetcherService = void 0;
var core_1 = require("@angular/core");
var FetcherService = /** @class */ (function () {
    function FetcherService(http) {
        this.http = http;
        /*
        private apiUrl = "https://owi-back.azurewebsites.net"}
        */
        this.apiUrl = "http://localhost:5291/api";
    }
    //PROJECTS
    FetcherService.prototype.getProjects = function () {
        return this.http.get(this.apiUrl + "/projects");
    };
    FetcherService.prototype.getProjectById = function (id) {
        return this.http.get(this.apiUrl + "/projects/" + id);
    };
    FetcherService.prototype.createProject = function (project) {
        return this.http.post(this.apiUrl + "/projects", project);
    };
    FetcherService.prototype.updateProject = function (id, project) {
        return this.http.put(this.apiUrl + "/projects/" + id, project);
    };
    FetcherService.prototype.deleteProject = function (id) {
        return this.http["delete"](this.apiUrl + "/projects/" + id);
    };
    //LISTING
    FetcherService.prototype.getListingsByProjectId = function (projectId) {
        return this.http.get(this.apiUrl + "/listing/" + projectId);
    };
    FetcherService.prototype.createListing = function (listing) {
        return this.http.post(this.apiUrl + "/listing", listing);
    };
    FetcherService.prototype.updateListing = function (id, listing) {
        return this.http.put(this.apiUrl + "/listing/" + id, listing);
    };
    FetcherService.prototype.deleteListing = function (id) {
        return this.http["delete"](this.apiUrl + "/listing/" + id);
    };
    //TASKS
    FetcherService.prototype.getTasksByIdListing = function (listingId) {
        return this.http.get(this.apiUrl + "/task/listing/" + listingId);
    };
    FetcherService.prototype.createTask = function (task) {
        return this.http.post(this.apiUrl + "/task", task);
    };
    FetcherService.prototype.updateTask = function (id, task) {
        return this.http.put(this.apiUrl + "/task/" + id, task);
    };
    FetcherService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], FetcherService);
    return FetcherService;
}());
exports.FetcherService = FetcherService;
