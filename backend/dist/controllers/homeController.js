"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const accountValidation_1 = require("../validations/accountValidation");
const user_account_1 = require("../repository/user_account");
const account_1 = __importDefault(require("../models/repository/account"));
const hashedPassword_1 = __importDefault(require("../utils/hashedPassword"));
const jwt_1 = require("../utils/jwt");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = accountValidation_1.createValidation.validate(req.body);
    if (error) {
        return res.json({
            success: false,
            data: undefined,
            message: error.message,
        });
    }
    const result = yield (0, user_account_1.create)(new account_1.default(0, value.firstname, value.lastname, value.username, (0, hashedPassword_1.default)(value.password)));
    if (!result.success || result.result === undefined) {
        return res.json({
            success: false,
            data: undefined,
            message: result.message,
        });
    }
    res.json({
        success: true,
        data: {
            firstname: result.result.firstName,
            lastname: result.result.lastName,
            username: result.result.username,
        },
        message: "successfully register user account",
    });
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = accountValidation_1.loginValidation.validate(req.body);
    if (error) {
        return res.json({
            success: false,
            data: undefined,
            message: error.message,
        });
    }
    var result = yield (0, user_account_1.getByUsername)(value.username);
    if (!result.success || result.result === undefined) {
        return res.json({
            success: false,
            data: undefined,
            message: "Invalid username or password",
        });
    }
    // validate password
    const password = (0, hashedPassword_1.default)(value.password);
    if (password !== result.result.password) {
        return res.json({
            success: false,
            data: undefined,
            message: "Invalid username or password",
        });
    }
    // generate token
    var token = (0, jwt_1.createToken)({ username: result.result.username });
    res.json({
        success: true,
        data: token,
        message: "Account successfully signin",
    });
});
const account = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.json({ success: false, message: "Unable to authenticate" });
    }
    const verify = (0, jwt_1.verifyToken)(token);
    if (!verify.success || verify.result === undefined) {
        return res.json({ success: false, message: "Unable to authenticate" });
    }
    const obj = JSON.parse(JSON.stringify(verify.result));
    const result = yield (0, user_account_1.getByUsername)(obj.username);
    if (!result.success || result.result === undefined) {
        return res.json({
            success: false,
            data: undefined,
            message: "Unable to determine the account",
        });
    }
    const allAccounts = yield (0, user_account_1.getAll)();
    if (!allAccounts.success) {
        return res.json({
            success: false,
            data: undefined,
            message: "An error occured. Please try again later",
        });
    }
    res.json({
        success: true,
        data: {
            profile: {
                firstName: result.result.firstName,
                lastName: result.result.lastName,
                username: result.result.username,
            },
            accounts: allAccounts.result,
        },
        message: "Successfully get account details",
    });
});
exports.default = {
    register,
    login,
    account,
};
