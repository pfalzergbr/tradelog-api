//Package Requires
const express = require('express');
const mongoose = require('mongoose');

//Require Middlewares
const tradeController = require('../controllers/tradeControllers');
const auth = require('../middleware/auth');

//Setup Router
const router = express.Router();

//Add a new trade to the database
router.post('/', auth, tradeController.addNewTrade)
//Fetch all trades from the database
router.get('/', auth, tradeController.getAllTrades)
//Fetch one trade from the database
router.get('/:id', auth, tradeController.getTrade)
//Update a trade in the database
router.patch('/:id', auth, tradeController.updateTrade)
//Delet a trade in the database -- TO WORK ON
router.delete('/:id', auth, tradeController.deleteTrade)


module.exports = router