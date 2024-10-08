import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import questionRoutes from './routes/questionRoutes'; // Soru paketleri için route ekleyin
import bodyParser from 'body-parser';
import mongoose from 'mongoose'; // MongoDB bağlantısı için
import dotenv from 'dotenv'; // .env dosyasını okumak için

dotenv.config(); // .env dosyasını yükleyin

const app = express();
app.use(bodyParser.json());

// CORS'u kullan
app.use(cors({
  origin: 'http://localhost:5173', // Frontend uygulamanızın kök alanı
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // İzin verilen HTTP yöntemleri
}));

// Auth rotalarını kullan
app.use('/', authRoutes);

// Soru paketleri rotalarını kullan
app.use('/api', questionRoutes);

// MongoDB'ye bağlan
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/interviewApp')
  .then(() => {
    console.log('MongoDB bağlantısı başarılı!');
    app.listen(3000, () => {
      console.log('Sunucu 3000 portunda çalışıyor');
    });
  })
  .catch((error) => console.log('MongoDB bağlantı hatası:', error));
