"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_1 = require("./app");
const connection_1 = require("./database/connection");
const config_1 = require("./config");
const Server = async () => {
    const app = (0, express_1.default)();
    // const PORT = 4001
    (0, connection_1.dbConnection)();
    await (0, app_1.expressApp)(app);
    app.listen(config_1.PORT, () => {
        console.log(`Server running on port ${config_1.PORT}`);
    }).on('error', (err) => {
        console.log(err);
        process.exit(1);
    });
};
Server();
