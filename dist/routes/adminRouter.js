"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const adminController_1 = __importDefault(require("../controller/adminController"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = (0, express_1.Router)();
router.get('/users', authMiddleware_1.default, adminController_1.default.getAllUsers);
router.get('/posts', authMiddleware_1.default, adminController_1.default.getAllPost);
router.get('/block/:id', authMiddleware_1.default, adminController_1.default.blockUser);
router.patch('/block/:id', authMiddleware_1.default, adminController_1.default.unBlockUser);
router.get('/dashboard', authMiddleware_1.default, adminController_1.default.dashboard);
router.get('/notification', authMiddleware_1.default, adminController_1.default.notification);
router.get('/notification/delete', authMiddleware_1.default, adminController_1.default.deleteNotification);
module.exports = router;
