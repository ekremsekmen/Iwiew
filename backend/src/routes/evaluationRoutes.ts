import { Router } from 'express';
import { evaluateCandidate, getSelectedCandidates } from '../controllers/evaluationController';

const router = Router();

router.patch('/:candidateId/evaluate', evaluateCandidate);
router.get('/selected-candidates', getSelectedCandidates);

export default router;