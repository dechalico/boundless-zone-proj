"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = exports.createValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createValidation = joi_1.default.object({
    firstname: joi_1.default.string().required().description("firstname for the account"),
    lastname: joi_1.default.string().required().description("lastname for the account"),
    username: joi_1.default.string().required().description("username for the account"),
    password: joi_1.default.string().required().description("password for the account"),
});
exports.loginValidation = joi_1.default.object({
    username: joi_1.default.string().required().description("username to login"),
    password: joi_1.default.string().required().description("password to login"),
});
