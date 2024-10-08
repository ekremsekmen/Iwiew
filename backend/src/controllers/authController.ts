import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // .env dosyasını yükle

const SECRET_KEY = process.env.JWT_SECRET; // .env dosyasından anahtarı al
const ADMIN_USERNAME = process.env.ADMIN_USERNAME; // .env dosyasından admin kullanıcı adını al
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD; // .env dosyasından admin şifresini al

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;

  // SECRET_KEY'in undefined olup olmadığını kontrol et
  if (!SECRET_KEY) {
    return res.status(500).json({ message: 'Gizli anahtar tanımlanmamış.' });
  }

  // Admin kullanıcı adı ve şifresini kontrol et
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // JWT oluştur
    const token = jwt.sign({ username: ADMIN_USERNAME }, SECRET_KEY, { expiresIn: '1h' });
    return res.json({ token });
  } else {
    return res.status(401).json({ message: 'Kullanıcı adı veya şifre hatalı' });
  }
};