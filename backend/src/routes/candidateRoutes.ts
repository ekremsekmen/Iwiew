// src/routes/candidateRoutes.ts
import { Router } from 'express';
import { deleteCandidate, submitCandidateForm } from '../controllers/candidateController';  // Yeni oluşturduğun controller'ı ekliyoruz

const router = Router();

// Aday formunu submit etme rotası
router.post('/:interviewId', submitCandidateForm);
router.delete('/:candidateId', deleteCandidate);

export default router;