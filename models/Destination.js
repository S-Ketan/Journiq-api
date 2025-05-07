const mongoose = require('mongoose');

const DestinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  country: { type: String, required: true },
  popularity: { type: Number, default: 0 }
});

module.exports = mongoose.model('Destination', DestinationSchema);