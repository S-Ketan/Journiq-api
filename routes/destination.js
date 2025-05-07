const express = require('express');
const router = express.Router();
const Destination = require('../models/Destination');

// Existing GET route (for fetching destinations)
router.get('/', async (req, res) => {
  try {
    const destinations = await Destination.find().limit(8);
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// New POST route (for adding destinations)
router.post('/', async (req, res) => {
  try {
    const newDestination = new Destination(req.body);
    await newDestination.save();
    res.status(201).json(newDestination);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;