// src/models/candidate.ts
import mongoose from 'mongoose';

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  interviewId: { type: mongoose.Schema.Types.ObjectId, ref: 'Interview', required: true },  // Mülakat ile ilişki
  kvkk: { type: Boolean, required: true },  // KVKK onayı
}, {
  timestamps: true,  // createdAt ve updatedAt alanlarını otomatik oluştur
});

const Candidate = mongoose.model('Candidate', candidateSchema);

export default Candidate;