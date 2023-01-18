"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messageController_js_1 = __importDefault(require("../controller/messageController.js"));
const authMiddleware_js_1 = __importDefault(require("../middleware/authMiddleware.js"));
const router = express_1.default.Router();
// router.use(authenticate);
router.post("/", authMiddleware_js_1.default, messageController_js_1.default.addMessage);
router.get("/:chatId", authMiddleware_js_1.default, messageController_js_1.default.getMessages);
exports.default = router;
