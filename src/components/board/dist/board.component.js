"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BoardComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var column_board_component_1 = require("../column-board/column-board.component");
var drag_drop_1 = require("@angular/cdk/drag-drop");
var drag_drop_2 = require("@angular/cdk/drag-drop");
var forms_1 = require("@angular/forms");
var BoardComponent = /** @class */ (function () {
    function BoardComponent(api, route) {
        this.api = api;
        this.route = route;
        this.listings = [];
        this.newListingName = '';
        this.isCreateListingModalOpen = false;
        this.projectId = 0;
        this.connectedTo = [];
    }
    BoardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (params) {
            _this.projectId = params.get('id');
        });
        this.loadProjectName(this.projectId);
        // Charge les colonnes existantes depuis l'API
        this.loadListings();
        console.log(2000, this.listings);
        console.log(this.listingId);
    };
    BoardComponent.prototype.loadProjectName = function (id) {
        var _this = this;
        this.api.getProjectById(id).subscribe(function (data) { return _this.projectName = data.name; });
    };
    BoardComponent.prototype.loadListings = function () {
        var _this = this;
        // Chargement des colonnes depuis une API
        this.api.getListingsByProjectId(this.projectId).subscribe(function (data) {
            _this.listings = data;
        }, function (error) {
            console.error('Erreur lors du chargement des listings', error);
        });
    };
    BoardComponent.prototype.openCreateListingModal = function () {
        this.isCreateListingModalOpen = true;
    };
    BoardComponent.prototype.closeCreateListingModal = function () {
        this.isCreateListingModalOpen = false;
    };
    BoardComponent.prototype.createListing = function () {
        var _this = this;
        var newListing = { name: this.newListingName, projectId: this.projectId };
        this.api.createListing(newListing).subscribe(function () {
            console.log('Nouvelle liste créée avec succès');
            _this.loadListings();
            _this.closeCreateListingModal();
        }, function (error) {
            console.error('Erreur lors de la création de la liste', error);
        });
    };
    BoardComponent.prototype.getConnectedToList = function (currentListingId) {
        return this.listings
            .filter(function (l) { return l.id != currentListingId; })
            .map(function (l) { return l.id.toString(); });
    };
    BoardComponent.prototype.drop = function (event, listingId) {
        if (event.previousContainer === event.container) {
            drag_drop_2.moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        }
        else {
            var taskId = event.previousContainer.data[event.previousIndex].id;
            drag_drop_2.transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
            this.api.updateTask(taskId, { listingId: listingId }).subscribe(function () {
                console.log('Task column updated successfully');
            }, function (error) {
                console.error('Error updating task column', error);
            });
        }
    };
    BoardComponent = __decorate([
        core_1.Component({
            selector: 'app-board',
            templateUrl: './board.component.html',
            styleUrls: ['./board.component.css'],
            standalone: true,
            imports: [common_1.CommonModule, column_board_component_1.ColumnBoardComponent, drag_drop_1.DragDropModule, forms_1.FormsModule]
        })
    ], BoardComponent);
    return BoardComponent;
}());
exports.BoardComponent = BoardComponent;
