"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config_1 = require("../config");
const dbConnection = () => {
    mongoose_1.default.set('strictQuery', false);
    mongoose_1.default.connect(config_1.DB_URL);
    console.log('Db connected');
};
exports.dbConnection = dbConnection;
