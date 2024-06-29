"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateTaskComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var bootstrap = require("bootstrap");
var CreateTaskComponent = /** @class */ (function () {
    function CreateTaskComponent(fb, api) {
        this.fb = fb;
        this.api = api;
        this.loadTasks = new core_1.EventEmitter();
    }
    CreateTaskComponent.prototype.ngOnInit = function () {
        this.taskForm = this.fb.group({
            name: ['', forms_1.Validators.required],
            description: [''],
            tag: [''],
            listingId: [this.listingId],
            deadline: ['']
        });
        console.log(this.taskForm);
        console.log(1000, this.listingId);
    };
    CreateTaskComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.taskForm.valid) {
            var newTask = this.taskForm.value;
            this.api.createTask(newTask).subscribe(function () {
                console.log('Task created successfully');
                _this.taskForm.reset(); // Réinitialiser le formulaire après la soumission
                _this.loadTasks.emit(); // Émettre l'événement vers le parent pour charger les tâches
            }, function (error) {
                console.error('Error creating task', error);
            });
        }
    };
    CreateTaskComponent.prototype.closeModal = function () {
        var modalElement = document.getElementById('createTaskModal');
        if (modalElement) {
            var modalInstance = bootstrap.Modal.getInstance(modalElement);
            if (modalInstance) {
                modalInstance.hide();
            }
        }
    };
    __decorate([
        core_1.Input()
    ], CreateTaskComponent.prototype, "listingId");
    __decorate([
        core_1.Output()
    ], CreateTaskComponent.prototype, "loadTasks");
    CreateTaskComponent = __decorate([
        core_1.Component({
            selector: 'app-create-task',
            standalone: true,
            imports: [common_1.CommonModule, forms_1.ReactiveFormsModule],
            templateUrl: './create-task.component.html',
            styleUrl: './create-task.component.scss'
        })
    ], CreateTaskComponent);
    return CreateTaskComponent;
}());
exports.CreateTaskComponent = CreateTaskComponent;
