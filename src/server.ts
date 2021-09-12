import express from "express";

import * as bodyParser from "body-parser";
import * as passport from "passport";
import * as sequelizeConfig from './sequelize';
import {Models} from "./models/index";
import * as http from "http";
import { Router } from "./routes";
import morgan = require("morgan");
import { InternalServerError } from "./errors/InternalServerError";



console.log("Start This File")
console.log(Models)
export class Server {

    public static app: express.Express;

    constructor() {
        

    }

    public static async initializeApp(): Promise<http.Server> {
        try {
            
            console.log("env Done")
            Server.app = express();
            console.log("express Done")
            // Configure application
            Server.configureApp();
            console.log("config Done")
            Server.initializeDatabase();
            console.log("db Done")
            Server.initializeAuth();

            Server.initializeRoles();

            // Initialize Routes
            Router.initializeRoutes(Server.app);


            return Server.app.listen(Server.app.get("port"));
            
        } catch(error) {
           console.log("Error In Server new")
           console.log("Error")
           throw new InternalServerError("Error in Running The Server");
        }

    }

    private static initializeDatabase() {
        console.log("Database config")
        const models = new Models(sequelizeConfig.default);
        return models.initModels();
    }

    private static initializeAuth() {
        console.log("Auth")
        // Server.app.use(passport.initialize());
        // Auth.serializeUser();
        // Auth.useBasicStrategy();
        // Auth.useBearerStrategy();
        // Auth.useLocalStrategy();
    }



    private static initializeRoles() {
        // Roles.buildRoles();
        // Server.app.use(Roles.middleware());
    }

    private static configureApp() {
        console.log("Database config")
        // all environments
        Server.app.set("port", process.env.PORT || 3000);
        Server.app.use(bodyParser.urlencoded({ extended: true }));
        Server.app.use(bodyParser.json());
        Server.app.use(morgan('dev', {
            skip: function (req, res) {
                return res.statusCode < 400;
            }, stream: process.stderr
        }));

        Server.app.use(morgan('dev', {
            skip: function (req, res) {
                return res.statusCode >= 400;
            }, stream: process.stdout
        }));
    }
}
