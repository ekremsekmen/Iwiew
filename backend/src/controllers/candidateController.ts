// src/controllers/interviewController.ts
import { Request, Response } from 'express';
import Interview from '../models/interview';
import Candidate from '../models/candidate';  // Candidate modelini kullanıyoruz

export const submitCandidateForm = async (req: Request, res: Response) => {
    const { interviewId } = req.params;  // Mülakat ID'si alınıyor
    const { name, surname, email, phone, kvkk } = req.body;  // Formdan gelen bilgiler

    try {
      // Mülakatı ID ile bul
      const interview = await Interview.findById(interviewId);
      if (!interview) {
        return res.status(404).json({ message: 'Mülakat bulunamadı' });
      }

      // KVKK onayı kontrolü
      if (!kvkk) {
        return res.status(400).json({ message: 'KVKK onayı gereklidir.' });
      }

      // Yeni bir aday oluştur ve bu mülakatla ilişkilendir
      const candidate = new Candidate({
        name,
        surname,
        email,
        phone,
        interviewId: interview._id,  // Adayı bu mülakatla eşleştir
        kvkk,  // KVKK onayını kaydet
      });

      await candidate.save();

      // Adayı mülakat sayfasına yönlendir
      res.status(200).json({ 
        message: 'Bilgiler başarıyla kaydedildi. Mülakata yönlendiriliyorsunuz.', 
        interviewLink: interview.link,
        candidateId: candidate._id,  // candidateId'yi geri döndür
        interviewId: interview._id   // Mülakat ID'sini döndür
    });
    } catch (error) {
      res.status(500).json({ message: 'Aday bilgileri kaydedilirken hata oluştu', error });
    }
};