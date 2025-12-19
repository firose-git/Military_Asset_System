const mongoose = require('mongoose');

const AssetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  serial: { type: String, required: true, unique: true },
  type: { type: String },
  status: { type: String, enum: ['available','in-use','maintenance','retired'], default: 'available' },
  location: { type: String },
  purchasedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Asset', AssetSchema);
