import { Router } from 'express';
import { login } from '../controllers/authController';

const router = Router();

router.post('/login', login);

router.post('/logout', (req, res) => {
    // Since JWT is stateless, simply send a response to indicate successful logout
    res.status(200).json({ message: 'Logged out successfully' });
  });

export default router;
