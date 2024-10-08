import express from 'express';
import {
  createQuestionPackage,
  getAllQuestionPackages,
  updateQuestionPackage,
  deleteQuestionPackage
} from '../controllers/questionController';

const router = express.Router();

// Soru paketlerini yönetmek için CRUD işlemleri
router.post('/packages', createQuestionPackage);  // Paket oluşturma
router.get('/packages', getAllQuestionPackages);  // Tüm paketleri listeleme
router.put('/packages/:id', updateQuestionPackage);  // Paket güncelleme
router.delete('/packages/:id', deleteQuestionPackage);  // Paket silme

export default router;
