"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const staff_route_1 = __importDefault(require("./routes/staff.route"));
// connect database
require("./database/conDB");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
dotenv_1.default.config();
app.use('/api/v1', staff_route_1.default);
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
