"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongooseConnect = process.env.MONGO_CONNECTION_ID;
mongoose_1.default.set('strictQuery', true);
if (mongooseConnect)
    mongoose_1.default.connect(mongooseConnect, (err) => {
        if (err)
            return console.log('err connection', err);
        console.log('database connected');
    });
exports.default = mongoose_1.default;
