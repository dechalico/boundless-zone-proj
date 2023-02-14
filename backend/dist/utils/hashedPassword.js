"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { createHmac } = require("crypto");
const hashedPasswordSecretKey = process.env.PASSWORD_SECRET_KEY;
function default_1(password) {
    const hash = createHmac("sha256", hashedPasswordSecretKey)
        .update(password)
        .digest("hex");
    return hash;
}
exports.default = default_1;
