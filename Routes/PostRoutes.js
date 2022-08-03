import express from 'express';
import {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  likePost,
  unlikePost
} from '../Controllers/PostController.js';

const router = express.Router();

router.post('/post/create', createPost);
router.get('/post/:id', getPost);
router.get('/', getAllPosts);
router.delete('/post/:id', deletePost);
router.put('/post/like/:id', likePost);
router.put('/post/unlike/:id', unlikePost);

export default router;
