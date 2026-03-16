const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  studentId: { type: String, required: true, unique: true },
  course: { type: String },
  guardianName: { type: String },
  guardianPhone: { type: String },
  address: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
