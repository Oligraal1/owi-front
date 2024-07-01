"use strict";
exports.__esModule = true;
exports.routes = void 0;
var home_component_1 = require("./components/home/home.component");
var board_component_1 = require("./components/board/board.component");
exports.routes = [
    { path: '', redirectTo: 'Home', pathMatch: 'full' },
    { path: 'Home', component: home_component_1.HomeComponent },
    { path: 'Board/:id', component: board_component_1.BoardComponent }
];
