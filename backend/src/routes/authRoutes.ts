import { Router } from 'express';
import { login } from '../controllers/authController';

const router = Router();

router.post('/login', login);             //login işlevi
router.post('/logout', (req, res) => {    //logout işlevi
  res.status(200).json({ message: 'Logged out successfully' });
});

export default router;
