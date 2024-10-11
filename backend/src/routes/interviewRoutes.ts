import { Router } from 'express';
import { createInterview, deleteInterview, getAllInterviews, getInterviewByLink, updateInterviewStatus } from '../controllers/interviewController';

const router = Router();

router.post('/', createInterview);  // Yeni mülakat oluşturma
router.get('/', getAllInterviews);  // Tüm mülakatları listeleme
router.delete('/:id', deleteInterview);  // Mülakat silme
router.get('/:link', getInterviewByLink);  // Link ile mülakat getirme
router.patch('/:id/status', updateInterviewStatus);  // Mülakat yayına alma veya yayından kaldırma

export default router;