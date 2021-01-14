import { Router } from 'express';
import * as UserController from './controller';
import { isAuth } from './../../middlewares/isAuth';

const router: Router = Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/logout', UserController.logout);
router.get('/me', isAuth, UserController.getUserProfile);
router.get('/users', UserController.getAllUsers);

export default router;
