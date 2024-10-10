import { Request, Response } from 'express';
import QuestionPackage from '../models/questionPackage';

// Soru paketi oluşturma
export const createQuestionPackage = async (req: Request, res: Response) => {
  const { packageName, questions } = req.body;

  try {
    const newPackage = new QuestionPackage({ packageName, questions });
    await newPackage.save();
    res.status(201).json(newPackage);
  } catch (error) {
    res.status(500).json({ message: 'Error creating question package', error });
  }
};

// Soru paketi listeleme
export const getAllQuestionPackages = async (req: Request, res: Response) => {
  try {
    const packages = await QuestionPackage.find();
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching question packages', error });
  }
};

// Soru paketi güncelleme
export const updateQuestionPackage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { packageName, questions } = req.body;

  try {
    const updatedPackage = await QuestionPackage.findByIdAndUpdate(
      id,
      { packageName, questions },
      { new: true }
    );
    res.status(200).json(updatedPackage);
  } catch (error) {
    res.status(500).json({ message: 'Error updating question package', error });
  }
};

// Soru paketi silme
export const deleteQuestionPackage = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await QuestionPackage.findByIdAndDelete(id);
    res.status(200).json({ message: 'Question package deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting question package', error });
  }
};
// Belirli bir soruyu bir paketten silme
export const deleteQuestionFromPackage = async (req: Request, res: Response) => {
  const { packageId, questionId } = req.params;

  try {
    const updatedPackage = await QuestionPackage.findByIdAndUpdate(
      packageId,
      { $pull: { questions: { _id: questionId } } },  // _id ile soruyu silme
      { new: true }
    );
    
    if (!updatedPackage) {
      return res.status(404).json({ message: 'Package or Question not found' });
    }

    res.status(200).json(updatedPackage);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting question from package', error });
  }
};