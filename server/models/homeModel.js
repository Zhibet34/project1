const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/project1')
  .then(() => console.log('Database is Connected!'));

const homeSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    tour: {
        type: String,
        required: true,
    },
},{ timestamps: true });

const homeModel = mongoose.model('homeModel',homeSchema)

module.exports = homeModel;