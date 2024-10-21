import { Router } from 'express';
import { evaluateCandidate } from '../controllers/evaluationController';

const router = Router();

router.patch('/:candidateId/evaluate', evaluateCandidate);

export default router;