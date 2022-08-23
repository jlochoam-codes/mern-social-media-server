import express from 'express';
import { uploadImage } from '../Controllers/ImageController.js';

const router = express.Router();

router.post('/image', uploadImage);

export default router;
