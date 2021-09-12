"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
let Address = class Address extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({
        allowNull: false,
        comment: 'generated username',
        unique: true,
        type: sequelize_typescript_1.DataType.STRING
    })
], Address.prototype, "username", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.STRING, unique: true })
], Address.prototype, "firebaseUID", void 0);
__decorate([
    sequelize_typescript_1.Length({ min: 13, max: 13, msg: 'Invalid number from sequelize' }),
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(13),
        allowNull: true,
        unique: true,
        comment: 'phone number'
    })
], Address.prototype, "number", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING
    })
], Address.prototype, "deviceId", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING
    })
], Address.prototype, "deviceOS", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.TEXT
    })
], Address.prototype, "authToken", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt
], Address.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt
], Address.prototype, "updatedAt", void 0);
Address = __decorate([
    sequelize_typescript_1.Table
], Address);
exports.default = Address;
