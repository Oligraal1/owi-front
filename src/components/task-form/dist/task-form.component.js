"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TaskFormComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var TaskFormComponent = /** @class */ (function () {
    function TaskFormComponent(api) {
        this.api = api;
        this.task = null;
        this.taskUpdated = new core_1.EventEmitter();
        this.cancelEdit = new core_1.EventEmitter();
    }
    TaskFormComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.task) {
            this.api.updateTask(this.task.id, this.task).subscribe(function (updatedTask) {
                _this.taskUpdated.emit(updatedTask);
            }, function (error) {
                console.error('Error updating task', error);
            });
        }
    };
    TaskFormComponent.prototype.onCancel = function () {
        this.cancelEdit.emit();
    };
    __decorate([
        core_1.Input()
    ], TaskFormComponent.prototype, "task");
    __decorate([
        core_1.Output()
    ], TaskFormComponent.prototype, "taskUpdated");
    __decorate([
        core_1.Output()
    ], TaskFormComponent.prototype, "cancelEdit");
    TaskFormComponent = __decorate([
        core_1.Component({
            selector: 'app-task-form',
            standalone: true,
            imports: [forms_1.FormsModule, forms_1.ReactiveFormsModule, common_1.CommonModule],
            templateUrl: './task-form.component.html',
            styleUrl: './task-form.component.scss'
        })
    ], TaskFormComponent);
    return TaskFormComponent;
}());
exports.TaskFormComponent = TaskFormComponent;
