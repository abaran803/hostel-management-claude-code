const router = require('express').Router();
const Booking = require('../models/Booking');
const Room = require('../models/Room');

router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('student').populate('room');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const room = await Room.findById(req.body.room);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    if (room.status === 'occupied') return res.status(400).json({ message: 'Room is already occupied' });

    const booking = new Booking(req.body);
    await booking.save();

    room.status = 'occupied';
    await room.save();

    const populated = await booking.populate(['student', 'room']);
    res.status(201).json(populated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id/checkout', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('room');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    booking.status = 'checked-out';
    booking.checkOut = new Date();
    await booking.save();

    await Room.findByIdAndUpdate(booking.room._id, { status: 'available' });

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (booking.status === 'active') {
      await Room.findByIdAndUpdate(booking.room, { status: 'available' });
    }

    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Dashboard stats
router.get('/stats/summary', async (req, res) => {
  try {
    const totalRooms = await Room.countDocuments();
    const availableRooms = await Room.countDocuments({ status: 'available' });
    const occupiedRooms = await Room.countDocuments({ status: 'occupied' });
    const totalStudents = await (require('../models/Student')).countDocuments();
    const activeBookings = await Booking.countDocuments({ status: 'active' });

    res.json({ totalRooms, availableRooms, occupiedRooms, totalStudents, activeBookings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
