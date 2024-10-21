// src/controllers/videoController.ts
import { Request, Response } from 'express';
import { uploadVideoToS3 } from '../services/awsS3Service';
import Candidate from '../models/candidate';
import fs from 'fs';

export const uploadCandidateVideo = async (req: Request, res: Response) => {
  const { candidateId } = req.params;

  try {
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ message: 'Aday bulunamadı' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Video dosyası bulunamadı' });
    }

    // Video dosyası AWS S3'e yükleniyor
    const videoUrl = await uploadVideoToS3(req.file.path, candidateId);

    // Adayın video URL'si kaydediliyor
    candidate.videoUrl = videoUrl;
    await candidate.save();

    // Geçici dosyayı sil (isteğe bağlı)
    fs.unlinkSync(req.file.path);

    res.status(200).json({ message: 'Video başarıyla yüklendi', videoUrl });
  } catch (error) {
    res.status(500).json({ message: 'Video yükleme sırasında hata oluştu', error });
  }
};
