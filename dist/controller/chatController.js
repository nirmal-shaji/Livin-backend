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
const chatModel_1 = __importDefault(require("../model/chatModel"));
module.exports = {
    createChat: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const chatExist = yield chatModel_1.default.findOne({ messages: { $all: [req.body.senderId, req.body.receiverId] } }).lean();
            if (chatExist) {
                return res.status(200).json("userAlreadyExist");
            }
            const newChat = new chatModel_1.default({
                messages: [req.body.senderId, req.body.receiverId],
            });
            const result = yield newChat.save();
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }),
    userChats: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const chat = yield chatModel_1.default.find({
                messages: { $in: [req.params.userId] },
            });
            res.status(200).json(chat);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }),
    findChat: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const chat = yield chatModel_1.default.findOne({
                messages: { $all: [req.params.firstId, req.params.secondId] },
            });
            res.status(200).json(chat);
        }
        catch (error) {
            res.status(500).json(error);
        }
    })
};
