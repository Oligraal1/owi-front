"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var board_component_1 = require("../board/board.component");
var header_component_1 = require("../header/header.component");
var footer_component_1 = require("../footer/footer.component");
var nav_component_1 = require("../nav/nav.component");
var task_component_1 = require("../task/task.component");
var home_component_1 = require("../home/home.component");
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'owi-front';
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            standalone: true,
            imports: [router_1.RouterOutlet, header_component_1.HeaderComponent, footer_component_1.FooterComponent, nav_component_1.NavComponent, task_component_1.TaskComponent, board_component_1.BoardComponent, home_component_1.HomeComponent],
            templateUrl: './app.component.html',
            styleUrl: './app.component.scss'
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
