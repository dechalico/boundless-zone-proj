"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TResult {
    constructor(result, success, message, error) {
        this.success = success;
        this.message = message;
        this.result = result;
        this.error = error;
    }
}
exports.default = TResult;
