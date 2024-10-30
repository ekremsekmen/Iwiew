import { Request, Response } from 'express';
import Candidate from '../models/candidate';

export const evaluateCandidate = async (req: Request, res: Response) => {
  const { candidateId } = req.params;
  const { evaluation ,note} = req.body;

  try {
    const candidate = await Candidate.findByIdAndUpdate(
      candidateId,
      { evaluation, note },
      { new: true }
    );

    if (!candidate) {
      return res.status(404).json({ message: 'Aday bulunamadı' });
    }

    res.status(200).json({ message: 'Aday başarıyla değerlendirildi', candidate });
  } catch (error) {
    res.status(500).json({ message: 'Değerlendirme sırasında hata oluştu', error });
  }
};

export const getSelectedCandidates = async (req: Request, res: Response) => {
  try {
    const selectedCandidates = await Candidate.find({ evaluation: 'selected' })
      .populate({
        path: 'interviewId',
        select: 'title',  // Mülakat adını çekiyoruz
        strictPopulate: false
      })
      .select('name surname email phone');

    // Eğer seçilen aday yoksa yalnızca bilgilendirici bir mesaj döndür
    if (!selectedCandidates.length) {
      return res.status(200).json({ message: 'Henüz kimse yok' });
    }

    // Seçilen adaylar bulunduysa listeyi gönder
    res.status(200).json(selectedCandidates);
  } catch (error) {
    res.status(500).json({ message: 'Aday bilgileri alınırken hata oluştu', error });
  } 
};
