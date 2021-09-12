"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    dialect: "mysql",
    database: process.env.db || "frm",
    port: parseInt(process.env.dbPort) || 3306,
    host: process.env.dbHost,
    logging: false,
    username: process.env.dbUser || 'root',
    password: process.env.dbPass || '',
};
