const express = require('express');
const router = express.Router();
const Destination = require('../models/Destination');

router.get('/', async (req, res) => {
  try {
    const destinations = await Destination.find().limit(8);
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;