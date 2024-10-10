import { Router } from 'express';
import { login } from '../controllers/authController';

const router = Router();

router.post('/login', login);
router.post('/logout', (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
});

export default router;
