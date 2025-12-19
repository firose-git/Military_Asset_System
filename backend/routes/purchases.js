const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Purchase = require('../models/Purchase');
const Asset = require('../models/Asset');
const mongoose = require('mongoose');

// Create purchase. Accepts either asset ObjectId or asset serial and resolves to asset id.
router.post('/', auth, async (req, res) => {
  try {
    let { asset, vendor, price } = req.body;

    // If asset looks like an ObjectId, use it; otherwise try to find by serial
    let assetId = null;
    if (asset && mongoose.Types.ObjectId.isValid(asset)) {
      assetId = asset;
    } else if (asset) {
      const found = await Asset.findOne({ $or: [{ serial: asset }, { name: asset }] });
      if (found) assetId = found._id;
    }

    if (!assetId) return res.status(400).json({ msg: 'Asset not found or asset id invalid' });

    const p = new Purchase({ asset: assetId, vendor, price, purchasedBy: req.user.id });
    await p.save();
    const populated = await Purchase.findById(p._id).populate('asset');
    res.json(populated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// List purchases
router.get('/', auth, async (req, res) => {
  try {
    const items = await Purchase.find().populate('asset').sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
