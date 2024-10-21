import dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import questionRoutes from './routes/questionRoutes';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import interviewRoutes from './routes/interviewRoutes';
import candidateRoutes from './routes/candidateRoutes';
import videoRoutes from './routes/videoRoutes';
import evaluationRoutes from './routes/evaluationRoutes';



// Diğer rotaların yanında ekleyelim


const app: Application = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE' , 'PATCH'],
}));

app.use(bodyParser.json());

// Authentication işlemleri için rotalar
app.use('/api/auth', authRoutes);

// Soru paketleri yönetimi için rotalar
app.use('/api/packages', questionRoutes);

// Mülakat için rota 
app.use('/api/interviews', interviewRoutes);


app.use('/api/candidates', candidateRoutes);  // Yeni route'u ekledik


app.use('/api/videos', videoRoutes);


app.use('/api/evaluations', evaluationRoutes);


mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/interviewApp')
  .then(() => {
    console.log('MongoDB connected successfully!');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((error) => console.log('MongoDB connection error:', error));
