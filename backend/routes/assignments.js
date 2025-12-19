const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Assignment = require('../models/Assignment');

router.post('/', auth, async (req, res) => {
  try {
    const a = new Assignment(req.body);
    await a.save();
    res.json(a);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const items = await Assignment.find().populate('asset').sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
