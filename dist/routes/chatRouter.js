"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const chatController_1 = __importDefault(require("../controller/chatController"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = (0, express_1.Router)();
router.post('/', authMiddleware_1.default, chatController_1.default.createChat);
router.get('/:userId', authMiddleware_1.default, chatController_1.default.userChats);
router.get('/find/:firstId/:secondId', authMiddleware_1.default, chatController_1.default.findChat);
module.exports = router;
