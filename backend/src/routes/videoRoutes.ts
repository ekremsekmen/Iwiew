// src/routes/videoRoutes.ts
import { Router } from 'express';
import { uploadCandidateVideo } from '../controllers/videoController';
import upload from '../middlewares/multerMiddleware';

const router = Router();

router.post('/:candidateId/video', upload.single('video'), uploadCandidateVideo);

export default router;
