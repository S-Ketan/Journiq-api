const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    type: { type: String, required: true },
    price: { type: Number, required: true },
    available: { type: Number, default: 0 },
    booked: { type: Number, default: 0 }
});

const HotelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    rating: { type: Number, default: 0 },
    rooms: [RoomSchema],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Hotel', HotelSchema);
