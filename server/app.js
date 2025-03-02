const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const homeRoute = require('./routes/home');
const displayRoute = require('./routes/display');

// connect to the databse
mongoose.connect('mongodb://127.0.0.1:27017/project1')
  .then(() => console.log('Database is Connected!'));

const app = express();
app.use(cors())
const port = process.env.PORT || 3000; 

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/', homeRoute);
app.use('/display', displayRoute)

// Start the server
app.listen(port, () => {
  console.log(`Server is live on port ${port}`);
});