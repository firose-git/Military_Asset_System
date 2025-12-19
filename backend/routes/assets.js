const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Asset = require('../models/Asset');

// Create asset
router.post('/', auth, async (req, res) => {
  try {
    const asset = new Asset(req.body);
    await asset.save();
    res.json(asset);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all
router.get('/', auth, async (req, res) => {
  try {
    const assets = await Asset.find().sort({ createdAt: -1 });
    res.json(assets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get one
router.get('/:id', auth, async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) return res.status(404).json({ msg: 'Asset not found' });
    res.json(asset);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update
router.put('/:id', auth, async (req, res) => {
  try {
    const asset = await Asset.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(asset);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete
router.delete('/:id', auth, async (req, res) => {
  try {
    await Asset.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Asset removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
