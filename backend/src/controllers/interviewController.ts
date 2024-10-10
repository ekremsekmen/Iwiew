// src/controllers/interviewController.ts
import { Request, Response } from 'express';
import Interview from '../models/interview';
import QuestionPackage from '../models/questionPackage';
import { v4 as uuidv4 } from 'uuid';  // Benzersiz link oluşturmak için

// Mülakat oluşturma
export const createInterview = async (req: Request, res: Response) => {
  const { questionPackageId } = req.body;

  try {
    const questionPackage = await QuestionPackage.findById(questionPackageId);
    if (!questionPackage) {
      return res.status(404).json({ message: 'Soru paketi bulunamadı' });
    }

    // Toplam süreyi hesapla
    const totalDuration = questionPackage.questions.reduce((total, question) => total + question.duration, 0);
    const link = uuidv4(); // Mülakat için benzersiz link

    const newInterview = new Interview({
      questionPackageId,
      totalDuration,
      link,
    });

    await newInterview.save();
    res.status(201).json(newInterview);
  } catch (error) {
    res.status(500).json({ message: 'Mülakat oluşturulurken hata oluştu', error });
  }
};

// Tüm mülakatları listeleme
export const getAllInterviews = async (req: Request, res: Response) => {
  try {
    const interviews = await Interview.find().populate('questionPackageId');
    res.status(200).json(interviews);
  } catch (error) {
    res.status(500).json({ message: 'Mülakatlar getirilirken hata oluştu', error });
  }
};

// Link ile mülakat getirme fonksiyonu
export const getInterviewByLink = async (req: Request, res: Response) => {
  const { link } = req.params;  // URL'den gelen link parametresini al

  try {
    // Veritabanında link ile mülakatı bul
    const interview = await Interview.findOne({ link }).populate('questionPackageId');
    
    // Eğer mülakat bulunamadıysa hata mesajı gönder
    if (!interview) {
      return res.status(404).json({ message: 'Mülakat bulunamadı' });
    }

    // Mülakat bulunduysa veriyi geri döndür
    res.status(200).json(interview);
  } catch (error) {
    // Hata durumunda mesaj döndür
    res.status(500).json({ message: 'Mülakat getirilirken hata oluştu', error });
  }
};

export const deleteInterview = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const interview = await Interview.findByIdAndDelete(id);
  
      if (!interview) {
        return res.status(404).json({ message: 'Mülakat bulunamadı' });
      }
  
      res.status(200).json({ message: 'Mülakat başarıyla silindi' });
    } catch (error) {
      res.status(500).json({ message: 'Mülakat silinirken hata oluştu', error });
    }
  };

  // Mülakatın yayın durumu güncelleme
export const updateInterviewStatus = async (req: Request, res: Response) => {
    const { id } = req.params; // URL'den gelen mülakat ID'si
    const { status } = req.body; // Body'den gelen yeni durum ('published', 'unpublished')
  
    // Geçerli status değerlerini kontrol et
    if (!['published', 'unpublished'].includes(status)) {
      return res.status(400).json({ message: 'Geçersiz durum değeri' });
    }
  
    try {
      const interview = await Interview.findByIdAndUpdate(
        id,
        { status, updatedAt: Date.now() },  // status ve updatedAt alanını güncelle
        { new: true }  // Güncellenen dokümanı geri döndür
      );
  
      if (!interview) {
        return res.status(404).json({ message: 'Mülakat bulunamadı' });
      }
  
      res.status(200).json(interview);  // Güncellenen mülakatı geri döndür
    } catch (error) {
      res.status(500).json({ message: 'Mülakat durumu güncellenirken hata oluştu', error });
    }
  };
  