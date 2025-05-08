const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const hotelRoutes = require('./routes/hotelRoutes');
const destinationRoutes = require('./routes/destination');
const bookingRoutes = require('./routes/bookings');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Routes
console.log('Mounting hotel routes at /api/hotelRoutes');
app.use('/api/hotels', hotelRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/bookings', bookingRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err.stack);
    res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});