// Import necessary libraries and modules
require('dotenv').config(); // Load environment variables from a .env file
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const helmet = require('helmet'); // Middleware for enhancing security
const cors = require('cors'); // Middleware for handling Cross-Origin Resource Sharing
const guestRoutes = require('./routes/guests'); // Import routes for guests
// Connect to MongoDB using environment variable MONGO_URI
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch((error) => console.log('Error connecting to MongoDB:', error));

// Enable Cross-Origin Resource Sharing and enhance security with Helmet
app.use(cors());
app.use(helmet());

// Add middleware to parse incoming JSON data if not already done
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/guests', guestRoutes); // Add guests routes to middleware chain
app.get('/', (req, res) => {
    res.json({ message: "Hello" });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)); // Start the server
