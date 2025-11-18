const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Replace with DB in production
const users = new Map(); // userId => { id, username, passwordHash, publicKey }

router.post('/register', async (req, res) => {
  const { username, password, publicKey } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'missing' });
  if ([...users.values()].find(u => u.username === username)) return res.status(400).json({ error: 'exists' });
  const id = `u_${Date.now()}`;
  const hash = await bcrypt.hash(password, 10);
  users.set(id, { id, username, passwordHash: hash, publicKey });
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, id, username });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const userEntry = [...users.values()].find(u => u.username === username);
  if (!userEntry) return res.status(400).json({ error: 'invalid' });
  const ok = await bcrypt.compare(password, userEntry.passwordHash);
  if (!ok) return res.status(400).json({ error: 'invalid' });
  const token = jwt.sign({ id: userEntry.id, username }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, id: userEntry.id, username, publicKey: userEntry.publicKey });
});

// public API to fetch user public key (for E2EE)
router.get('/user/:id/publicKey', (req, res) => {
  const user = users.get(req.params.id);
  if (!user) return res.status(404).json({ error: 'not found' });
  res.json({ publicKey: user.publicKey, id: user.id, username: user.username });
});

module.exports = router;
