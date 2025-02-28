const express = require('express');
const homeRoute = express.Router();

homeRoute.get('/',(req,res)=>{
    res.send('homepage')
})

homeRoute.post('/',(req,res)=>{
    console.log(req.body)
    res.send('the data is live')
})

module.exports = homeRoute