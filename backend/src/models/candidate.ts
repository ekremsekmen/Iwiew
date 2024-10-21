// src/models/candidate.ts
import mongoose from 'mongoose';

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  interviewId: { type: mongoose.Schema.Types.ObjectId, ref: 'Interview', required: true },
  kvkk: { type: Boolean, required: true },
  videoUrl: { type: String },  // Yeni alan: Adayın video URL'si
  evaluation: { 
    type: String, 
    enum: ['selected', 'eliminated', 'pending'], 
    default: 'pending'  // İK biriminin değerlendirmesi
  },
}, {
  timestamps: true,
});

const Candidate = mongoose.model('Candidate', candidateSchema);

export default Candidate;