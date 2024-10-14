// src/models/interview.ts
import mongoose, { Schema, Document } from 'mongoose';

interface Interview extends Document {
  questionPackageId: Schema.Types.ObjectId;
  totalDuration: number;
  link: string;
  status: string;
  canSkip: boolean;          // Soruları atlama hakkı
  showAtOnce: boolean;       // Soruların hepsini bir anda mı gösterelim?
  expireDate: Date;          // Mülakatın geçerlilik süresi
  createdAt: Date;
  updatedAt: Date;
}

const InterviewSchema = new Schema<Interview>({
  questionPackageId: { type: Schema.Types.ObjectId, ref: 'QuestionPackage', required: true },
  totalDuration: { type: Number, required: true },
  link: { type: String, required: true },
  status: { type: String, default: 'pending' },
  canSkip: { type: Boolean, default: false },        // Varsayılan: Geçme hakkı yok
  showAtOnce: { type: Boolean, default: false },     // Varsayılan: Sıralı göster
  expireDate: { type: Date, required: true },        // Bitiş tarihi zorunlu
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Interview = mongoose.model<Interview>('Interview', InterviewSchema);
export default Interview;