const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Seed admin user. In production this endpoint requires a secret query param matching JWT_SECRET.
router.post('/admin', async (req, res) => {
  try {
    const secret = req.query.secret || req.body.secret;
    // if running in production require a secret
    if (process.env.NODE_ENV === 'production' && secret !== process.env.JWT_SECRET) {
      return res.status(403).json({ msg: 'Forbidden' });
    }

    const name = req.body.name || 'Administrator';
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) return res.status(400).json({ msg: 'email and password required' });

    let user = await User.findOne({ email });
    if (user) return res.json({ msg: 'Admin already exists', user: { id: user.id, email: user.email, role: user.role } });

    user = new User({ name, email, password, role: 'admin' });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.json({ msg: 'Admin created', user: { id: user.id, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
