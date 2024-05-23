"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const typeorm_1 = require("typeorm");
const staff_entity_1 = require("../entity/staff.entity");
exports.db = (0, typeorm_1.createConnection)({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'staffmanage',
    entities: [staff_entity_1.staff],
    synchronize: true
}).then(() => {
    console.log('Connection database successsfull');
}).catch(error => console.log(error));
