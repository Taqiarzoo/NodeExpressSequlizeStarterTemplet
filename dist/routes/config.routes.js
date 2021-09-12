"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigRoutes = void 0;
const express_1 = require("express");
const config_controller_1 = __importDefault(require("../controllers/config.controller"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
// import authJwt from '../middleware/authJwt';
const limiter = express_rate_limit_1.default({
    max: 30,
    windowMs: 30 * 60 * 100,
    message: 'Too many restarts. Please wait for a while and try again.'
});
exports.ConfigRoutes = express_1.Router();
// ConfigRoutes.get('/get-stakes', limiter, configController.GetStakes);
exports.ConfigRoutes.use((req, res, next) => {
    console.log("Requst Arrived At");
    next();
});
exports.ConfigRoutes.get('/', limiter, config_controller_1.default.GetConfiguration);
exports.ConfigRoutes.patch('/', config_controller_1.default.UpdateConfig);
