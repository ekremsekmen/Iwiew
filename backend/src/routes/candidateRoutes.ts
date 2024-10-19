// src/routes/candidateRoutes.ts
import { Router } from 'express';
import { submitCandidateForm } from '../controllers/candidateController';  // Yeni oluşturduğun controller'ı ekliyoruz

const router = Router();

// Aday formunu submit etme rotası
router.post('/:interviewId', submitCandidateForm);

export default router;