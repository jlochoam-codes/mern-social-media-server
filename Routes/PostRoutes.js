import express from 'express';
import {
  createPost,
  deletePost,
  getTimelinePosts,
  getPost,
  likePost,
  unlikePost
} from '../Controllers/PostController.js';

const router = express.Router();

router.post('/post/create', createPost);
router.get('/post/:id', getPost);
router.get('/:id', getTimelinePosts);
router.delete('/post/:id', deletePost);
router.put('/post/like/:id', likePost);
router.put('/post/unlike/:id', unlikePost);

export default router;
