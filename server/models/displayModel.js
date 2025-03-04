const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/project1')
  .then(() => console.log('Database is Connected!'))
  .catch((err) => console.error('Database connection error:', err));

// Define the schema
const displaySchema = new mongoose.Schema({
  plate: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, // Use mongoose.Schema.Types.ObjectId
    ref: 'User', // Reference to the User model
    required: true,
  },
}, { timestamps: true }); // Enable timestamps for createdAt and updatedAt

displaySchema.virtual('createdDate').get(function () {
  return this.createdAt.toISOString().split('T')[0];
});

// Create the model
const displayModel = mongoose.model('displayModel', displaySchema);

// Export the model
module.exports = displayModel;