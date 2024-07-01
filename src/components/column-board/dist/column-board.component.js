"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var task_form_component_1 = require("../task-form/task-form.component");
var task_component_1 = require("../task/task.component");
var dialog_1 = require("@angular/material/dialog");
var button_1 = require("@angular/material/button");
var confirm_delete_dialog_component_1 = require("../confirm-delete-dialog/confirm-delete-dialog.component");
var ColumnBoardComponent = /** @class */ (function () {
    function ColumnBoardComponent(api, dialog) {
        this.api = api;
        this.dialog = dialog;
        this.title = '';
        this.connectedTo = [];
        this.tasks = [];
        this.editingTask = null;
        this.showCardTask = false;
        this.showTaskForm = false;
    }
    ColumnBoardComponent.prototype.ngOnInit = function () {
        this.loadTasksByListing(this.listingId);
        console.log("listingId", this.listingId);
        // console.log(2500,this.connectedTo)
    };
    ColumnBoardComponent.prototype.loadTasksByListing = function (id) {
        var _this = this;
        this.api.getTasksByIdListing(id).subscribe(function (data) {
            _this.tasks = data.map(function (task) { return (__assign(__assign({}, task), { showDropdown: false })); });
        });
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
        this.editingTask = __assign({}, task);
        this.showTaskForm = true;
    };
    ColumnBoardComponent.prototype.updateTask = function (updatedTask) {
        var _this = this;
        if (updatedTask.id !== undefined) {
            this.api.updateTask(updatedTask.id, updatedTask).subscribe(function () {
                _this.loadTasksByListing(_this.listingId);
                _this.editingTask = null;
                _this.showTaskForm = false;
            }, function (error) {
                console.error('Error updating task', error);
            });
        }
        else {
            console.error('Cannot update task: id is undefined');
        }
    };
    ColumnBoardComponent.prototype.deleteTask = function (taskId) {
        var _this = this;
        var dialogConfig = new dialog_1.MatDialogConfig();
        dialogConfig.width = '600px';
        dialogConfig.disableClose = true;
        dialogConfig.hasBackdrop = true;
        dialogConfig.autoFocus = false;
        dialogConfig.position = { top: '0', left: '50%' };
        dialogConfig.panelClass = 'dialog-centered';
        var dialogRef = this.dialog.open(confirm_delete_dialog_component_1.ConfirmDeleteDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.api.deleteTask(taskId).subscribe(function () {
                    _this.loadTasksByListing(_this.listingId);
                }, function (error) {
                    console.error('Error deleting task', error);
                });
            }
        });
    };
    ColumnBoardComponent.prototype.cancelEdit = function () {
        this.editingTask = null;
        this.showTaskForm = false;
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
            imports: [common_1.CommonModule, drag_drop_1.DragDropModule, create_task_component_1.CreateTaskComponent, task_form_component_1.TaskFormComponent, task_component_1.TaskComponent, dialog_1.MatDialogModule, button_1.MatButtonModule]
        })
    ], ColumnBoardComponent);
    return ColumnBoardComponent;
}());
exports.ColumnBoardComponent = ColumnBoardComponent;
