import express from "express";
import messageController from "../controller/messageController.js";
import authMiddleWare from "../middleware/authMiddleware.js";
const router = express.Router();

// router.use(authenticate);
router.post("/",authMiddleWare, messageController.addMessage);
router.get("/:chatId",authMiddleWare, messageController.getMessages);

export default router;
