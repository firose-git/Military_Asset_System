const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Transfer = require('../models/Transfer');

router.post('/', auth, async (req, res) => {
  try {
    const t = new Transfer(req.body);
    await t.save();
    res.json(t);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const items = await Transfer.find().populate('asset').sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
