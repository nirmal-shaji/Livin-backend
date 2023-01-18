"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const messageSchema = new mongoose_1.default.Schema({
    chatId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Chat",
    },
    senderId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
    },
    text: String,
}, { timestamps: true });
const messageModel = mongoose_1.default.model("Message", messageSchema);
module.exports = messageModel;
