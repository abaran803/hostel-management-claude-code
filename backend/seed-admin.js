/**
 * Run once to create the initial admin user:
 *   node seed-admin.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  const existing = await User.findOne({ email: 'admin@hostel.com' });
  if (existing) {
    console.log('Admin already exists.');
  } else {
    await User.create({ name: 'Admin', email: 'admin@hostel.com', password: 'admin123' });
    console.log('Admin created: admin@hostel.com / admin123');
  }
  await mongoose.disconnect();
}

main().catch(console.error);
