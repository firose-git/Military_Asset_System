const mongoose = require('mongoose');

const TransferSchema = new mongoose.Schema({
  asset: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset', required: true },
  from: { type: String },
  to: { type: String },
  transferredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  transferredAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Transfer', TransferSchema);
