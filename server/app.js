const express = require('express');
const cors = require('cors'); // Import CORS middleware
const app = express();

// Import routes
const homeRoute = require('./routes/home');
const displayRoute = require('./routes/display');


// Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors()); // Enable CORS for all routes

// Mount routes
app.use('/', homeRoute);
app.use('/',displayRoute)

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});