const axios = require('axios');

// Base URL of your API
const API_URL = 'http://localhost:5000/api/hotels';

// Arrays for generating random data
const hotelNames = [
    'Grand', 'Sunset', 'Ocean', 'Mountain', 'Royal', 'Paradise', 'Golden', 'Silver', 'Emerald', 'Sapphire',
    'Luxury', 'Elite', 'Dream', 'Crystal', 'Blue', 'Red', 'Green', 'Sky', 'Star', 'Moon'
];
const adjectives = ['View', 'Palace', 'Resort', 'Inn', 'Lodge', 'Hotel', 'Suites', 'Mansion', 'Villa', 'Retreat'];
const locations = [
    'New York', 'Los Angeles', 'Miami', 'Chicago', 'San Francisco', 'Las Vegas', 'Paris', 'London', 'Tokyo', 'Sydney',
    'Dubai', 'Singapore', 'Rome', 'Barcelona', 'Amsterdam', 'Prague', 'Vienna', 'Toronto', 'Vancouver', 'Seoul'
];
const roomTypes = ['Single', 'Double', 'Suite', 'Deluxe', 'Family'];

// Function to generate a random number between min and max
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Function to generate a random hotel
const generateRandomHotel = () => {
    const name = `${hotelNames[getRandomInt(0, hotelNames.length - 1)]} ${
        adjectives[getRandomInt(0, adjectives.length - 1)]
    }`;
    const location = locations[getRandomInt(0, locations.length - 1)];
    const rating = (Math.random() * (5 - 2) + 2).toFixed(1); // Rating between 2.0 and 5.0
    const rooms = Array.from({ length: getRandomInt(1, 4) }, () => ({
        type: roomTypes[getRandomInt(0, roomTypes.length - 1)],
        price: getRandomInt(50, 300), // Price between $50 and $300
        available: getRandomInt(5, 20), // 5 to 20 rooms available
        booked: 0 // Initially no rooms booked
    }));

    return { name, location, rating, rooms };
};

// Function to add a hotel to the database
const addHotel = async (hotelData) => {
    try {
        const response = await axios.post(API_URL, hotelData);
        console.log(`Added hotel: ${response.data.name} (ID: ${response.data._id})`);
        return response.data._id;
    } catch (error) {
        console.error(`Error adding hotel: ${error.message}`);
        return null;
    }
};

// Function to book a random number of rooms in a hotel
const bookRooms = async (hotelId) => {
    try {
        // First, get the hotel details to know the room types
        const hotelResponse = await axios.get(`${API_URL}/${hotelId}`);
        const hotel = hotelResponse.data;
        const room = hotel.rooms[getRandomInt(0, hotel.rooms.length - 1)]; // Pick a random room type
        const quantity = getRandomInt(1, Math.min(3, room.available)); // Book 1 to 3 rooms, or whatever is available

        const bookingResponse = await axios.post(`${API_URL}/${hotelId}/book`, {
            roomType: room.type,
            quantity: quantity
        });
        console.log(`Booked ${quantity} ${room.type} rooms in ${hotel.name}`);
    } catch (error) {
        console.error(`Error booking rooms: ${error.message}`);
    }
};

// Main function to populate the database
const populateDatabase = async () => {
    const numHotels = 40; // Number of hotels to create
    const hotelIds = [];

    // Step 1: Add hotels
    console.log('Adding hotels...');
    for (let i = 0; i < numHotels; i++) {
        const hotelData = generateRandomHotel();
        const hotelId = await addHotel(hotelData);
        if (hotelId) hotelIds.push(hotelId);
    }

    // Step 2: Simulate some bookings (for 10 random hotels)
    console.log('\nSimulating bookings...');
    const hotelsToBook = hotelIds.sort(() => Math.random() - 0.5).slice(0, 10); // Pick 10 random hotels
    for (const hotelId of hotelsToBook) {
        await bookRooms(hotelId);
    }

    console.log('\nDatabase population complete!');
};

populateDatabase();
