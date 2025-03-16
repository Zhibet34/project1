const express = require('express');
const displayRoute = express.Router();
const user = require('../models/homeModel');
const table = require('../models/displayModel');

displayRoute.get('/display', async (req, res) => {
    try {
        const searchData = await table.find({})
            .sort({createdAt: -1})
            .limit(14)
        let tableData = searchData ? searchData : 'database is empty';
        res.send(tableData);
    } catch (error) {
        
    }
});

displayRoute.post('/display', async(req,res)=>{
    const {plate,reason,address} = req.body;
    let users = await user.find({})
        .sort({_id: -1})
        .limit(1);
    let latestUser = users[0]
    try {
        let newEntry = new table({
            plate: plate,
            reason: reason,
            address: address,
            user: latestUser._id, // can i use this 
        })
        console.log(newEntry)
        await newEntry.save()
        .then('new items saved in the databse')
    } catch (error) {
        console.log(error)
        res.send(error)
    }
    res.send('display route')
})

module.exports = displayRoute;