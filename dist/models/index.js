"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Models = void 0;
const fs = require('fs');
const path = require('path');
const sequelize_typescript_1 = require("sequelize-typescript");
/**
 *  All models must be imported from this file or else they will not be registered with Sequelize
 */
class Models {
    constructor(config) {
        console.log(config);
        this.sequelize = new sequelize_typescript_1.Sequelize(config);
    }
    initModels() {
        console.log("done Database MOdel");
        this.sequelize.addModels(this.getModels());
        return this.sequelize
            .sync({
            force: false,
            alter: true,
            logging: true
        }).catch((err) => {
            console.log(err);
            return;
        });
    }
    getModels() {
        const models = [];
        fs.readdirSync(__dirname)
            .forEach((file) => {
            if (file !== path.basename(__filename) && file.endsWith('model.js')) {
                let schemaPath = path.join(__dirname, '/', file.replace(/\.js$/, ''));
                let model = require(schemaPath);
                models.push(model.default);
            }
        });
        console.log(models);
        return models;
    }
}
exports.Models = Models;
