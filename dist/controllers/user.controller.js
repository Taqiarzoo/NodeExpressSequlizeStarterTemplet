"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserController {
    static getInstance() {
        if (UserController.selfInstance) {
            return UserController.selfInstance;
        }
        this.selfInstance = new UserController();
        return this.selfInstance;
    }
}
UserController.selfInstance = null;
exports.default = UserController.getInstance();
