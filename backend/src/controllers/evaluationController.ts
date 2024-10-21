import { Request, Response } from 'express';
import Candidate from '../models/candidate';

export const evaluateCandidate = async (req: Request, res: Response) => {
  const { candidateId } = req.params;
  const { evaluation } = req.body;

  try {
    const candidate = await Candidate.findByIdAndUpdate(
      candidateId,
      { evaluation },
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