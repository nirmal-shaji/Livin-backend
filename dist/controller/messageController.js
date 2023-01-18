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
const messageModal_1 = __importDefault(require("../model/messageModal"));
module.exports = {
    addMessage: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { text, chatId, senderId } = req.body;
        // const { userId } = req.body.user;
        if (!(text && chatId)) {
            return res.status(401).json({ message: "all felids are required" });
        }
        try {
            const message = new messageModal_1.default({
                senderId: senderId,
                chatId,
                text,
            });
            yield message.save();
            res.status(201).json(message);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "something went wrong" });
        }
    }),
    getMessages: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { chatId } = req.params;
        try {
            const result = yield messageModal_1.default.find({ chatId });
            res.status(200).json(result);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "something went wrong" });
        }
    })
};
