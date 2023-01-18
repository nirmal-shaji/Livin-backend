import { Router } from 'express'
import userController from '../controller/userController';
import authController from '../controller/authController';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/adminLogin', authController.adminLogin);

export=router