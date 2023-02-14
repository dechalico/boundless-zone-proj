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
exports.getAll = exports.getByUsername = exports.create = void 0;
const database_1 = __importDefault(require("./database"));
const account_1 = __importDefault(require("../models/repository/account"));
const result_1 = __importDefault(require("../models/result"));
function create(account) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const connection = yield (0, database_1.default)();
            let query = `insert user_accounts (firstname,lastname,username,password) values (?,?,?,?)`;
            const result = yield connection.query(query, [
                account.firstName,
                account.lastName,
                account.username,
                account.password,
            ]);
            // update the created id
            account.Id = result.insertId;
            return new result_1.default(account, true, "account successfully created");
        }
        catch (err) {
            return new result_1.default(undefined, false, "An error occured when creating user account", err);
        }
    });
}
exports.create = create;
function getByUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const connection = yield (0, database_1.default)();
            let query = "select * from user_accounts where username = ?";
            const results = yield connection.query(query, [username]);
            if (results.length === 0) {
                return new result_1.default(undefined, false, "Can't find user account by username");
            }
            const data = results[0];
            return new result_1.default(new account_1.default(data.id, data.firstname, data.lastname, data.username, data.password), true, "Successfully get user account by username");
        }
        catch (err) {
            return new result_1.default(undefined, false, "An error occured when getting account by username", err);
        }
    });
}
exports.getByUsername = getByUsername;
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const connection = yield (0, database_1.default)();
            let query = "select * from user_accounts";
            const results = yield connection.query(query);
            const mappedResults = results.map((data) => {
                return new account_1.default(data.id, data.firstname, data.lastname, data.username, data.password);
            });
            return new result_1.default(mappedResults, true, "Successfully get all user accounts");
        }
        catch (err) {
            return new result_1.default(undefined, false, "An error occured when getting all user account", err);
        }
    });
}
exports.getAll = getAll;
