"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const server_1 = __importDefault(require("./server"));
const database_1 = require("./repository/database");
let app = undefined;
(0, database_1.initDatabase)()
    .then(() => {
    const port = process.env.PORT;
    app = server_1.default.listen(port, () => console.log(`Server running at port ${port}`));
})
    .catch((err) => console.log("an error occured", err));
const exitHandler = () => {
    if (app !== undefined) {
        app.close(() => {
            console.log("server closed");
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
};
const unexpectedErrorHandler = (error) => {
    console.error("An unexpected error occured", error);
    exitHandler();
};
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
