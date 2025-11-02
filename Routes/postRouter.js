import { Router } from 'express';
import {
    addPost,
    addComment,
    getAllComment,
    getAllPosts,
    getPost,
} from '../Controllers/postControllers.js'
import { validateCommentInput, validateIdParam, validatePostInput } from '../Middleware/validationMiddleware.js';
import { authorizePermissions, authenticateUser} from '../Middleware/authMiddleware.js';
import upload from '../Middleware/multerMiddleware.js';
import { checkPostImageUpload } from '../Middleware/multerMiddleware.js';


const router = Router()

router.get('/allposts', getAllPosts);
router.get('/allComment', getAllComment);
router.get('/:id', validateIdParam, getPost);

router.post(
  '/addpost',
  authenticateUser,
  upload.single('image'),
  validatePostInput,
  checkPostImageUpload,
  addPost
);
router.post('/addcomment', validateCommentInput, authenticateUser, addComment);

export default router
