const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
  asset: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset', required: true },
  vendor: { type: String },
  price: { type: Number },
  purchasedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  purchasedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Purchase', PurchaseSchema);
