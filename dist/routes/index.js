"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const config_routes_1 = require("./config.routes");
class Router {
    static initializeRoutes(app) {
        app.use('/config', config_routes_1.ConfigRoutes);
    }
}
exports.Router = Router;
