import mongoose, { Schema, Document, Types } from 'mongoose';

interface Question {
  _id: Types.ObjectId;  // MongoDB ObjectId'si
  content: string;
  duration: number;  // Soru için belirlenen süre (saniye cinsinden)
}

interface QuestionPackage extends Document {
  packageName: string;
  questions: Question[];
  createdAt: Date;
  updatedAt: Date;
}

const QuestionSchema = new Schema<Question>({
  _id: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },  // ObjectId tanımlaması
  content: { type: String, required: true },
  duration: { type: Number, required: true },
});

const QuestionPackageSchema = new Schema<QuestionPackage>({
  packageName: { type: String, required: true },
  questions: [QuestionSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const QuestionPackage = mongoose.model<QuestionPackage>('QuestionPackage', QuestionPackageSchema);

export default QuestionPackage;
