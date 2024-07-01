"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NavComponent = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var board_component_1 = require("../board/board.component");
var home_component_1 = require("../home/home.component");
var NavComponent = /** @class */ (function () {
    function NavComponent(api, router) {
        this.api = api;
        this.router = router;
        this.projects = [];
        this.currentProjectId = 0;
        this.newProjectName = '';
        this.isOpen = false;
    }
    NavComponent.prototype.ngOnInit = function () {
        this.loadProjects();
    };
    NavComponent.prototype.loadProjects = function () {
        var _this = this;
        this.api.getProjects().subscribe(function (data) {
            _this.projects = data;
        });
    };
    NavComponent.prototype.getid = function (id) {
        console.log(id);
        // this.currentProjectId = id;
        this.router.navigate(['/Board', id]);
    };
    NavComponent.prototype.openModalCreation = function () {
        this.isOpen = true;
    };
    NavComponent.prototype.toCreateProject = function () {
        var _this = this;
        var newProject = { name: this.newProjectName };
        this.api.createProject(newProject).subscribe(function () {
            console.log('Nouveau projet créé avec succès');
            _this.loadProjects();
            _this.isOpen = false;
            _this.router.navigate(['Home']);
        }, function (error) {
            console.error('Erreur lors de la création du projet', error);
        });
    };
    NavComponent = __decorate([
        core_1.Component({
            selector: 'app-nav',
            standalone: true,
            imports: [common_1.CommonModule, forms_1.FormsModule, board_component_1.BoardComponent, home_component_1.HomeComponent],
            templateUrl: './nav.component.html',
            styleUrl: './nav.component.scss'
        })
    ], NavComponent);
    return NavComponent;
}());
exports.NavComponent = NavComponent;
