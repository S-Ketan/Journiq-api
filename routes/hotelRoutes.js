const express = require('express');
     const router = express.Router();
     const Hotel = require('../models/Hotel');

     // Get all hotels
     router.get('/', async (req, res) => {
         try {
             const hotels = await Hotel.find();
             res.json(hotels);
         } catch (error) {
             res.status(500).json({ message: error.message });
         }
     });

     // Get featured hotels
     router.get('/featured', async (req, res) => {
         console.log('Handling /featured endpoint');
         try {
             const hotels = await Hotel.find().limit(6).sort({ rating: -1 });
             res.json(hotels);
         } catch (error) {
             res.status(500).json({ message: error.message });
         }
     });

     // Get specific hotel by ID
     router.get('/:id', async (req, res) => {
         try {
             if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
                 return res.status(400).json({ message: 'Invalid hotel ID' });
             }
             const hotel = await Hotel.findById(req.params.id);
             if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
             res.json(hotel);
         } catch (error) {
             res.status(500).json({ message: error.message });
         }
     });

     // Create a new hotel
     router.post('/', async (req, res) => {
         try {
             const hotel = new Hotel({
                 name: req.body.name,
                 location: req.body.location,
                 rating: req.body.rating,
                 rooms: req.body.rooms
             });
             const newHotel = await hotel.save();
             res.status(201).json(newHotel);
         } catch (error) {
             res.status(400).json({ message: error.message });
         }
     });

     // Update hotel details
     router.put('/:id', async (req, res) => {
         try {
             if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
                 return res.status(400).json({ message: 'Invalid hotel ID' });
             }
             const hotel = await Hotel.findById(req.params.id);
             if (!hotel) return res.status(404).json({ message: 'Hotel not found' });

             hotel.name = req.body.name || hotel.name;
             hotel.location = req.body.location || hotel.location;
             hotel.rating = req.body.rating || hotel.rating;
             hotel.rooms = req.body.rooms || hotel.rooms;

             const updatedHotel = await hotel.save();
             res.json(updatedHotel);
         } catch (error) {
             res.status(400).json({ message: error.message });
         }
     });

     // Book a room
     router.post('/:id/book', async (req, res) => {
         try {
             if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
                 return res.status(400).json({ message: 'Invalid hotel ID' });
             }
             const hotel = await Hotel.findById(req.params.id);
             if (!hotel) return res.status(404).json({ message: 'Hotel not found' });

             const { roomType, quantity } = req.body;
             const room = hotel.rooms.find(r => r.type === roomType);

             if (!room) return res.status(404).json({ message: 'Room type not found' });
             if (room.available < quantity) return res.status(400).json({ message: 'Not enough rooms available' });

             room.available -= quantity;
             room.booked += quantity;

             await hotel.save();
             res.json({ message: 'Booking successful', hotel });
         } catch (error) {
             res.status(400).json({ message: error.message });
         }
     });

     // Delete a hotel
     router.delete('/:id', async (req, res) => {
         try {
             if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
                 return res.status(400).json({ message: 'Invalid hotel ID' });
             }
             const hotel = await Hotel.findById(req.params.id);
             if (!hotel) return res.status(404).json({ message: 'Hotel not found' });

             await hotel.remove();
             res.json({ message: 'Hotel deleted' });
         } catch (error) {
             res.status(500).json({ message: error.message });
         }
     });

     module.exports = router;