"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ColumnBoardComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var drag_drop_1 = require("@angular/cdk/drag-drop");
var create_task_component_1 = require("../create-task/create-task.component");
var ColumnBoardComponent = /** @class */ (function () {
    function ColumnBoardComponent(api) {
        this.api = api;
        this.title = '';
        this.connectedTo = [];
        this.tasks = [];
    }
    ColumnBoardComponent.prototype.ngOnInit = function () {
        this.loadTasksByListing(this.listingId);
        console.log(5000, this.listingId);
        console.log(2500, this.connectedTo);
    };
    ColumnBoardComponent.prototype.loadTasksByListing = function (id) {
        var _this = this;
        this.api.getTasksByIdListing(id).subscribe(function (data) { return _this.tasks = data; });
    };
    ColumnBoardComponent.prototype.drop = function (event, id) {
        console.log(1000, this.connectedTo);
        if (event.previousContainer === event.container) {
            drag_drop_1.moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
            console.log('ok');
        }
        else {
            var taskId = event.previousContainer.data[event.previousIndex].id;
            this.listingId = id;
            console.log(1500, this.connectedTo);
            drag_drop_1.transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
            this.api.updateTask(taskId, { listingId: id }).subscribe(function () {
                console.log('Task column updated successfully');
            }, function (error) {
                console.error('Error updating task column', error);
            });
        }
    };
    ColumnBoardComponent.prototype.toggleDropdown = function (task) {
        task.showDropdown = !task.showDropdown;
    };
    ColumnBoardComponent.prototype.editTask = function (task) {
        // Logique pour l'édition de la tâche
        console.log('Editing task:', task);
    };
    ColumnBoardComponent.prototype.deleteTask = function (task) {
        // Logique pour la suppression de la tâche
        console.log('Deleting task:', task);
    };
    __decorate([
        core_1.Input()
    ], ColumnBoardComponent.prototype, "title");
    __decorate([
        core_1.Input()
    ], ColumnBoardComponent.prototype, "connectedTo");
    __decorate([
        core_1.Input()
    ], ColumnBoardComponent.prototype, "listingId");
    ColumnBoardComponent = __decorate([
        core_1.Component({
            selector: 'app-column-board',
            templateUrl: './column-board.component.html',
            styleUrls: ['./column-board.component.css'],
            standalone: true,
            imports: [common_1.CommonModule, drag_drop_1.DragDropModule, create_task_component_1.CreateTaskComponent]
        })
    ], ColumnBoardComponent);
    return ColumnBoardComponent;
}());
exports.ColumnBoardComponent = ColumnBoardComponent;
