const fs = require('fs');
const path = require('path');

import {Sequelize} from 'sequelize-typescript';








/**
 *  All models must be imported from this file or else they will not be registered with Sequelize
 */

export class Models {
    
    public sequelize: Sequelize;
    
    constructor( config: any) {
        console.log(config)
        this.sequelize = new Sequelize(config);
    }

    public initModels() {
        console.log("done Database MOdel")
        this.sequelize.addModels(this.getModels());
        return this.sequelize
        .sync
        (
            {
                force: false,
                alter:true,
                logging:true
            }
        ).catch((err:any)=>{
            console.log(err)
            return
        });
    }
    private getModels() {
       const models:any[]=[]
        fs.readdirSync(__dirname)
            .forEach((file:any) => {
            if (file !== path.basename(__filename) && file.endsWith('model.js')) {
            
                let schemaPath= path.join(__dirname, '/', file.replace(/\.js$/, ''))
                let model=require(schemaPath);
                models.push(model.default)
            }
            });
            console.log(models)
                return models
            }

}

