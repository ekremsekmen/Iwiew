import { Router } from 'express';
import { createInterview, deleteInterview, getAllInterviews, getCandidatesByInterviewId, getInterviewById, getInterviewByLink, getInterviewCandidateStats, updateInterviewStatus } from '../controllers/interviewController';

const router = Router();

router.post('/', createInterview);  // Yeni mülakat oluşturma
router.get('/', getAllInterviews);  // Tüm mülakatları listeleme
router.delete('/:id', deleteInterview);  // Mülakat silme
router.get('/:id', getInterviewById);  // Seçilen mülakatın içeriğini görüntüleme (sorular ve süreler)
router.patch('/:id/status', updateInterviewStatus);  // Mülakat yayına alma veya yayından kaldırma
router.get('/link/:link', getInterviewByLink)  //Mülakat linkinden mülakat içeriği almak.
router.get('/:interviewId/candidates', getCandidatesByInterviewId); //interviewa giren adayların bilgileri.
router.get('/:interviewId/candidate-stats', getInterviewCandidateStats);  // İnterviewa giren adayların istatistikleri.


export default router;
