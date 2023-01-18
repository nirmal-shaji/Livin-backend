import { Router } from 'express'
import adminController from '../controller/adminController';
import authMiddleWare from '../middleware/authMiddleware';

const router = Router();


router.get('/users',authMiddleWare,adminController.getAllUsers)
router.get('/posts', authMiddleWare,adminController.getAllPost)
router.get('/block/:id'  , authMiddleWare, adminController.blockUser);
router.patch('/block/:id', authMiddleWare, adminController.unBlockUser);
router.get('/dashboard', authMiddleWare, adminController.dashboard);
router.get('/notification', authMiddleWare, adminController.notification)
router.get('/notification/delete', authMiddleWare, adminController.deleteNotification);






export=router