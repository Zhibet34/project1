const express = require('express');
const homeRoute = express.Router();
const homeModel = require('../models/homeModel')

homeRoute.get('/', async(req,res)=>{
    const homeData = await homeModel.find({})
        .sort({_id: -1})
        .limit(1)
    res.send(homeData)
})

homeRoute.post('/', async(req,res)=>{
    const {username, tour} = req.body;
    let newUser = new homeModel({
        username: username,
        tour: tour,
    });
    await newUser.save()
    res.send('the data is live')
})

module.exports = homeRoute;