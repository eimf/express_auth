import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import db from '../config/database.js';

const router = express.Router();

router.get('/profile', authenticateToken, (req, res) => {
  const stmt = db.prepare('SELECT id, username, created_at FROM users WHERE id = ?');
  const user = stmt.get(req.user.id);
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({ user });
});

export default router;