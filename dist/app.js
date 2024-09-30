"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = require("./app/middlewares/globalErrorHandler");
const notFroundRoute_1 = __importDefault(require("./app/middlewares/notFroundRoute"));
const app = (0, express_1.default)();
// parsers
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
}));
// app routes
app.use('/api', routes_1.default);
// global error handle zod, mongoose, custom error, error, cast error etc..
app.use(globalErrorHandler_1.globalErrorHandler);
app.get('/', (req, res) => {
    res.json({
        message: 'Bike Rental Server Running...',
    });
});
// not found route
app.use(notFroundRoute_1.default);
exports.default = app;
