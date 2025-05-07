const axios = require('axios');

// Base URL of your API
const API_URL = 'http://localhost:5000/api/destinations';

// Arrays for generating random data
const destinationNames = [
    'Eiffel Tower', 'Great Wall', 'Machu Picchu', 'Taj Mahal', 'Colosseum', 'Pyramids of Giza', 'Santorini', 'Bora Bora',
    'Grand Canyon', 'Niagara Falls', 'Mount Fuji', 'Sydney Opera House', 'Statue of Liberty', 'Christ the Redeemer',
    'Acropolis', 'Stonehenge', 'Petra', 'Angkor Wat', 'Neuschwanstein Castle', 'Iguazu Falls'
];
const countries = [
    'France', 'China', 'Peru', 'India', 'Italy', 'Egypt', 'Greece', 'French Polynesia', 'USA', 'Canada', 'Japan',
    'Australia', 'USA', 'Brazil', 'Greece', 'UK', 'Jordan', 'Cambodia', 'Germany', 'Argentina'
];
const imageUrls = [
    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
    'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
    'https://images.unsplash.com/photo-1501594907352-4e7e6d5a3a1b',
    'https://images.unsplash.com/photo-1519923834690-d95228ed3e47',
    'https://images.unsplash.com/photo-1513635308526-f2d1e6b1d9a8',
    'https://images.unsplash.com/photo-1542396601-dcbf922f2a3f',
    'https://images.unsplash.com/photo-1505761671935-2b1c1e34b919',
    'https://images.unsplash.com/photo-1518546305927-5a555bb7020d'
];

// Function to generate a random number between min and max
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Function to generate a random destination
const generateRandomDestination = () => {
    const name = destinationNames[getRandomInt(0, destinationNames.length - 1)];
    const country = countries[getRandomInt(0, countries.length - 1)];
    const image = imageUrls[getRandomInt(0, imageUrls.length - 1)];
    const popularity = getRandomInt(1, 100); // Popularity between 1 and 100

    return { name, country, image, popularity };
};

// Function to add a destination to the database
const addDestination = async (destinationData) => {
    try {
        const response = await axios.post(API_URL, destinationData);
        console.log(`Added destination: ${response.data.name} (ID: ${response.data._id})`);
        return response.data._id;
    } catch (error) {
        console.error(`Error adding destination: ${error.message}`);
        return null;
    }
};

// Main function to populate the database
const populateDatabase = async () => {
    const numDestinations = 20; // Number of destinations to create

    console.log('Adding destinations...');
    for (let i = 0; i < numDestinations; i++) {
        const destinationData = generateRandomDestination();
        await addDestination(destinationData);
    }

    console.log('\nDatabase population complete!');
};

populateDatabase();