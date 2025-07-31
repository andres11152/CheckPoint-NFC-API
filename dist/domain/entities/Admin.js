"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
class Admin {
    constructor(id, username, passwordHash) {
        this.id = id;
        this.username = username;
        this.password = passwordHash;
    }
}
exports.Admin = Admin;
