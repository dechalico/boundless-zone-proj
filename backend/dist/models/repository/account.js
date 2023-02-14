"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Account {
    constructor(id, firstName, lastName, username, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.Id = id;
        this.password = password;
    }
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}
exports.default = Account;
