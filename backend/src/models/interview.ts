// src/models/interview.ts
import mongoose, { Schema, Document } from 'mongoose';

interface Interview extends Document {
  questionPackageId: Schema.Types.ObjectId;
  totalDuration: number;
  link: string;
  status: string;
  canSkip: boolean;
  showAtOnce: boolean;
  expireDate: Date;
  title: string;          // Yeni alan: Title
  createdAt: Date;
  updatedAt: Date;
}

const InterviewSchema = new Schema<Interview>({
  questionPackageId: { type: Schema.Types.ObjectId, ref: 'QuestionPackage', required: true },
  totalDuration: { type: Number, required: true },
  link: { type: String, required: true },
  status: { type: String, default: 'pending' },
  canSkip: { type: Boolean, default: false },
  showAtOnce: { type: Boolean, default: false },
  expireDate: { type: Date, required: true },
  title: { type: String, required: true },  // Yeni alan: Title
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Interview = mongoose.model<Interview>('Interview', InterviewSchema);
export default Interview;
