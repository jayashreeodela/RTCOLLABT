const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const documentRoutes = require('./routes/documentRoutes');
const { connectDB } = require('./config/db'); // Make sure the path is correct

dotenv.config(); // Load environment variables from .env
connectDB(); // Connect to the database

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

// API routes
app.use('/api/auth', authRoutes); // Auth routes
app.use('/api/documents', documentRoutes); // Document routes

const PORT = process.env.PORT || 5000; // Default to 5000 if no PORT defined in .env
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
