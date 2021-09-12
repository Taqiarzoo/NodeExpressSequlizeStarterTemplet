import * as express from "express";
import { ConfigRoutes } from "./config.routes";

export class Router {

    public static initializeRoutes(app: express.Express) {
        app.use('/config', ConfigRoutes);
    }
}
