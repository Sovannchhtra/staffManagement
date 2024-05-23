"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const staff_controller_1 = require("../controllers/staff.controller");
const route = (0, express_1.default)();
route.get('/', staff_controller_1.getStaff);
route.post('/create', staff_controller_1.createStaff);
route.get('/edit/:id', staff_controller_1.editStaff);
route.post('/update/:id', staff_controller_1.updateStaff);
route.delete('/delete/:id', staff_controller_1.deleteStaff);
exports.default = route;
