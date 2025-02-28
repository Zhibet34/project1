const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const homeRoute = require('./routes/home');

const app = express();
app.use(cors())
const port = process.env.PORT || 3000; 

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/', homeRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server is live on port ${port}`);
});