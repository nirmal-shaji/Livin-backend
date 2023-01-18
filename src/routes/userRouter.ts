import { Router } from 'express'
import userController from '../controller/userController';
import authMiddleWare from '../middleware/authMiddleware';
const router = Router();




router.get('/',authMiddleWare, userController.getAllUsers);
router.get('/:id',authMiddleWare,userController.getUserData)
router.patch('/:id',authMiddleWare, userController.updateUser);
router.patch('/follow/:id',authMiddleWare, userController.follow);
router.patch('/unfollow/:id',authMiddleWare, userController.unFollow);
router.post('/comment/:id',authMiddleWare, userController.addComment);
router.get('/following/:id',authMiddleWare, userController.getFollowing);
router.get('/deletePost/:id',authMiddleWare, userController.deletePost);



export=router