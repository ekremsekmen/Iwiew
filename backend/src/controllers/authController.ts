  // controllers/authController.ts
  import { Request, Response } from 'express';
  import jwt from 'jsonwebtoken';
  import dotenv from 'dotenv';

  dotenv.config();

  const SECRET_KEY = process.env.JWT_SECRET;
  const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  export const login = (req: Request, res: Response): Response => {
    const { username, password } = req.body;

    if (!SECRET_KEY) {
      return res.status(500).json({ message: 'Secret key is not defined.' });
    }

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Generate JWT
      const token = jwt.sign({ username: ADMIN_USERNAME }, SECRET_KEY, { expiresIn: '1h' });
      // Create user object
      const user = { username: ADMIN_USERNAME };

      // Return token and user in the response
      return res.status(200).json({ token, user });
    } else {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }
  };
