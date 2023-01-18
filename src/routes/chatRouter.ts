import { Router } from 'express'
import chatController from '../controller/chatController';
import authMiddleWare from '../middleware/authMiddleware';

const router = Router();



router.post('/',authMiddleWare,chatController.createChat);
router.get('/:userId',authMiddleWare, chatController.userChats);
router.get('/find/:firstId/:secondId',authMiddleWare, chatController.findChat);





export=router