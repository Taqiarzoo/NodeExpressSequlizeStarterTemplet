import * as express from "express";
import { FamilyRouts } from "./family.routes";

import { MasterRouts } from "./masters.routes";
import { MemberRouts } from "./member.routes";


export class Router {

    public static initializeRoutes(app: express.Express) {
        
        app.use('/api/masters',MasterRouts)
        app.use('/api/member',MemberRouts)
        app.use('/api/family',FamilyRouts)
    }
}
