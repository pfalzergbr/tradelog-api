//Package Requires
const express = require('express');
const mongoose = require('mongoose')

//Require Controllers
const tradeController = require('../controllers/tradeControllers')
//Setup Router
const router = express.Router();

//Fetch all trades from the database
router.get('/', tradeController.getAllTrades)
//Fetch one trade from the database
router.get('/:id', tradeController.getTrade)
//Add a new trade to the database
router.post('/', tradeController.addNewTrade)
//Update a trade in the database
router.patch('/:id', tradeController.updateTrade)
//Delet a trade in the database
router.delete('/:id', tradeController.deleteTrade)


module.exports = router