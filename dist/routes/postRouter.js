"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const postController_1 = __importDefault(require("../controller/postController"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = (0, express_1.Router)();
// router.get('/admin/allpost',postController.getAllPost)
router.get('/:id', authMiddleware_1.default, postController_1.default.getPost);
router.post('/', authMiddleware_1.default, postController_1.default.createPost);
router.put('/:id/like', authMiddleware_1.default, postController_1.default.likePost);
router.post('/comment/:id', authMiddleware_1.default, postController_1.default.addComment);
router.get('/allComment/:id', authMiddleware_1.default, postController_1.default.allComment);
router.get('/save/post', authMiddleware_1.default, postController_1.default.savePost);
router.get("/save/allPost/:id", authMiddleware_1.default, postController_1.default.allSavedPost);
router.post('/report/:id', authMiddleware_1.default, postController_1.default.reportPost);
router.post('/edit/post', authMiddleware_1.default, postController_1.default.editPost);
module.exports = router;
