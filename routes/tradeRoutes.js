//Package Requires
const express = require('express');
const mongoose = require('mongoose')

//require Models
const Trade = require('../models/trade'); 
const { findByIdAndUpdate } = require('../models/trade');

//Setup Router
const router = express.Router();

//Fetch all trades from the database

router.get('/', async (req, res) => {
    try { 
        const trades = await Trade.find({})
        res.send(trades)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

//Fetch one trade from the database

router.get('/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const trade = await Trade.findById({_id})
        res.send(trade)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

//Add a new trade to the database

router.post('/', async (req, res, next) => {
    try {
        const trade = await Trade.create(req.body)
        res.send(trade)
    } catch (error) {
        res.status(422).send(error.message)
    }
})

//Update a trade in the database

router.patch('/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const trade = await Trade.findByIdAndUpdate({_id}, req.body)
        const newTrade = await Trade.findOne({_id})
        res.send(newTrade) 
    } catch (error) {
        res.status(400).send(error.message)
    }
})

//Deleta a trade in the database

router.delete('/:id', async (req, res) => {
    const _id = req.params.id
    
    try {
        const trade = await Trade.findByIdAndRemove({_id})
        res.send(trade)
    } catch (error) {
        res.status(400).send(error.message)
    }
})





module.exports = router