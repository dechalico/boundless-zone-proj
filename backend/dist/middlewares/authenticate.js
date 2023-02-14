"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../utils/jwt");
function authenticate(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return next({ success: false, message: "Unable to authenticate" });
    }
    const verify = (0, jwt_1.verifyToken)(token);
    if (!verify.success) {
        return next({ success: false, message: "Unable to authenticate" });
    }
    req.username = verify.toString();
    next();
}
exports.default = authenticate;
