// const express = require('express')
// const mongoose = require('mongoose')

//require Models
const Trade = require('../models/trade'); 


//Fetches all trades from the database
exports.getAllTrades = async (req, res) => {
    try { 
        const trades = await Trade.find({})
        res.send(trades)
    } catch (error) {
        res.status(400).send(error.message)
    }
}
//Fetches one trade from the database by Id
exports.getTrade = async (req, res) => {
    const _id = req.params.id
    try {
        const trade = await Trade.findById({_id})
        res.send(trade)
    } catch (error) {
        res.status(400).send(error.message)
    }
}
//Adds a new trade to the database
exports.addNewTrade = async (req, res, next) => {
    try {
        const trade = await Trade.create(req.body)
        res.send(trade)
    } catch (error) {
        res.status(422).send(error.message)
    }
}
//Update a trade in the database
exports.updateTrade = async (req, res) => {
    const _id = req.params.id
    try {
        const trade = await Trade.findByIdAndUpdate({_id}, req.body)
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
        const trade = await Trade.findByIdAndRemove({_id})
        res.send(trade)
    } catch (error) {
        res.status(400).send(error.message)
    }
}