//Package Requires
const express = require('express');
const mongoose = require('mongoose')

//Setup Router
const router = express.Router();

//Fetch all trades from the database

router.get('/', (req, res) => {
    res.send('This should list all the trades')
})

//Fetch one trade from the database

router.get('/:id', (req, res) => {
    const tradeId = req.params.id
    res.send(`This should fetch trade id ${tradeId}`)
})

//Add a new trade to the database

router.post('/', (req, res) => {
    res.send('This should post a new trade in the database')
})

//Update a trade in the database

router.put('/:id', (req, res) => {
    const tradeId = req.params.id
    res.send(`This should post a new trade in the database with id ${tradeId}`)
})

//Deleta a trade in the database

router.delete('/:id', (req, res) => {
    const tradeId = req.params.id
    res.send(`This should delete the selected trade with id ${tradeId} from the database`)
})





module.exports = router