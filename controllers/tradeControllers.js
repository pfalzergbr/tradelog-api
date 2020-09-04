// const express = require('express')
// const mongoose = require('mongoose')

//require Models
const Trade = require('../models/trade'); 


//Adds a new trade to the database
exports.addNewTrade = async (req, res, next) => {
    const trade = new Trade({
        ...req.body,
        trader: req.user._id
    })

    try {
        await trade.save()
        res.status(201).send(trade)
    } catch (error) {
        res.status(422).send(error.message)
    }
}
//Fetches all trades from the database
exports.getAllTrades = async (req, res) => {
    try { 
        const trades = await Trade.find({ trader: req.user._id })
        res.send(trades)
        // Version B with populate
        // await req.user.populate('trades').execPopulate()
        // res.send(req.user.trades)
    } catch (error) {
        res.status(400).send(error.message)
    }
}
//Fetches one trade from the database by Id
exports.getTrade = async (req, res) => {
    const _id = req.params.id
    try {
        const trade = await Trade.findOne({ _id , trader: req.user._id})
        if (!trade) {
            return res.status(404).send("Trade not found")
        }
        res.send(trade)
    } catch (error) {
        res.status(500).send(error.message)
    }
}
//Update a trade in the database
exports.updateTrade = async (req, res) => {
    const _id = req.params.id
    try {
        const trade = await Trade.findOneAndUpdate({_id, trader: req.user._id}, req.body)
        const newTrade = await Trade.findOne({_id})
        res.send(newTrade) 
    } catch (error) {
        res.status(400).send(error.message)
    }
}
//Delete a trade from the database
exports.deleteTrade = async (req, res) => {
    const _id = req.params.id
    
    try {
        const trade = await Trade.findOneAndRemove({_id, trader: req.user._id})
        res.send(trade)
    } catch (error) {
        res.status(400).send(error.message)
    }
}