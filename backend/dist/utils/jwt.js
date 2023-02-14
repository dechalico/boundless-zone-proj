"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const result_1 = __importDefault(require("../models/result"));
const expired = process.env.TOKEN_EXPIRE;
const tokenSecret = process.env.TOKEN_SECRET || "this is the default secret";
const createToken = (payload) => {
    const token = jsonwebtoken_1.default.sign(payload, tokenSecret, {
        expiresIn: expired,
    });
    return token;
};
exports.createToken = createToken;
const verifyToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, tokenSecret);
        return new result_1.default(decoded, true, "successfully decoded jwt payload");
    }
    catch (err) {
        return new result_1.default(undefined, false, "Invalid or expired token", err);
    }
};
exports.verifyToken = verifyToken;
