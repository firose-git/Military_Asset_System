const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
  asset: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset', required: true },
  assignedTo: { type: String },
  assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedAt: { type: Date, default: Date.now },
  expectedReturn: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Assignment', AssignmentSchema);
