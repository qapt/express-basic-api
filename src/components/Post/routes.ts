import { Router } from 'express';
import * as PostController from './controller';
import { isAuth } from './../../middleware/isAuth';

const router = Router();

router.get('/', PostController.getAllPosts);
router.get('/:id', PostController.getPostById);
router.post('/', isAuth, PostController.createPost);
router.patch('/:id', isAuth, PostController.updatePost);
router.delete('/:id', isAuth, PostController.deletePost);

export default router;
