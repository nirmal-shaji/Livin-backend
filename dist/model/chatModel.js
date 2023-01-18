"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const ChatSchema = new mongoose_1.default.Schema({
    messages: {
        type: [],
    },
}, {
    timestamps: true,
});
const ChatModel = mongoose_1.default.model("Chat", ChatSchema);
module.exports = ChatModel;
