import { Router } from 'express';
import {
  createQuestionPackage,
  getAllQuestionPackages,
  updateQuestionPackage,
  deleteQuestionPackage,
  deleteQuestionFromPackage,
} from '../controllers/questionController';

const router = Router();

router.post('/', createQuestionPackage);  // Yeni paket oluşturma
router.get('/', getAllQuestionPackages);  // Tüm paketleri listeleme
router.put('/:id', updateQuestionPackage);  // Paket güncelleme
router.delete('/:id', deleteQuestionPackage);  // Paket silme
router.delete('/:packageId/questions/:questionId', deleteQuestionFromPackage);  // Belirli bir soruyu bir paketten silme

export default router;
