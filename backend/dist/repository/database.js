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
exports.initDatabase = void 0;
const mariadb_1 = __importDefault(require("mariadb"));
let database = undefined;
const hostname = process.env.DB_HOST;
const dbname = process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
function getPool() {
    return __awaiter(this, void 0, void 0, function* () {
        if (database !== undefined)
            return database;
        database = yield mariadb_1.default.createConnection({
            host: hostname,
            database: dbname,
            user: username,
            password: password,
        });
        return database;
    });
}
exports.default = getPool;
function initDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const connection = yield getPool();
            const query = `
        create table if not exists user_accounts
        (
            id int auto_increment not null,
            firstname varchar(100) not null,
            lastname varchar(100) not null,
            username varchar(50) not null,
            password varchar(500) not null,
            primary key ua_key_id (id),
            unique key ua_unique_code (username) 
        );
    `;
            yield connection.query(query);
        }
        catch (err) {
            throw err;
        }
    });
}
exports.initDatabase = initDatabase;
