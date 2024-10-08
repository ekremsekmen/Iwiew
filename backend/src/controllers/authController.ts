import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = "gizli_anahtar"; // Bu anahtarı çevre değişkenlerinde saklamak daha güvenli olur

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Admin kullanıcı adı ve şifresini kontrol et
  if (username === "admin" && password === "admin") {
    // JWT oluştur
    const token = jwt.sign({ username: "admin" }, SECRET_KEY, { expiresIn: '1h' });

    return res.json({ token });
  } else {
    return res.status(401).json({ message: 'Kullanıcı adı veya şifre hatalı' });
  }
};
