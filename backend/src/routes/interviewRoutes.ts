import { Router } from 'express';
import { createInterview, deleteInterview, getAllInterviews, getInterviewById, getInterviewByLink, updateInterviewStatus } from '../controllers/interviewController';

const router = Router();

router.post('/', createInterview);  // Yeni mülakat oluşturma
router.get('/', getAllInterviews);  // Tüm mülakatları listeleme
router.delete('/:id', deleteInterview);  // Mülakat silme
router.get('/:id', getInterviewById);  // Seçilen mülakatın içeriğini görüntüleme (sorular ve süreler)
router.patch('/:id/status', updateInterviewStatus);  // Mülakat yayına alma veya yayından kaldırma
router.get('/link/:link', getInterviewByLink)  //Mülakat linkinden mülakat içeriği almak.

export default router;
