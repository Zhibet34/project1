const express = require('express')
const historyRoute = express.Router();
const table = require('../models/displayModel');

historyRoute.get('/history',async(req,res)=>{
    const tableData = await table.find({})
    res.send(tableData)
})

module.exports = historyRoute;