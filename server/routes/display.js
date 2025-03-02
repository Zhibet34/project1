const express = require('express');
const displayRoute = express.Router();

displayRoute.get('/',(req,res)=>{
    res.send('display page')
})

module.exports = displayRoute;