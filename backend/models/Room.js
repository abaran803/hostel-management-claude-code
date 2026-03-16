const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true, unique: true },
  type: { type: String, enum: ['single', 'double', 'triple'], default: 'single' },
  capacity: { type: Number, required: true },
  price: { type: Number, required: true },
  status: { type: String, enum: ['available', 'occupied', 'maintenance'], default: 'available' },
  floor: { type: Number, required: true },
  amenities: [String],
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);
