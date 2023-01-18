"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const authController_1 = __importDefault(require("../controller/authController"));
const router = (0, express_1.Router)();
router.post('/register', authController_1.default.register);
router.post('/login', authController_1.default.login);
router.post('/adminLogin', authController_1.default.adminLogin);
module.exports = router;
