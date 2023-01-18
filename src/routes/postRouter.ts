import { Router } from 'express'
import postController from '../controller/postController';
import authMiddleWare from '../middleware/authMiddleware';
const router = Router();



// router.get('/admin/allpost',postController.getAllPost)
router.get('/:id',authMiddleWare, postController.getPost);
router.post('/',authMiddleWare, postController.createPost);
router.put('/:id/like',authMiddleWare, postController.likePost);
router.post('/comment/:id',authMiddleWare, postController.addComment);
router.get('/allComment/:id',authMiddleWare, postController.allComment);
router.get('/save/post',authMiddleWare, postController.savePost)
router.get("/save/allPost/:id",authMiddleWare, postController.allSavedPost);
router.post('/report/:id',authMiddleWare, postController.reportPost);
router.post('/edit/post',authMiddleWare,postController.editPost)




export=router