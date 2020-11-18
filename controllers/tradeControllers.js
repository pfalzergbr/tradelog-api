const { validationResult } = require('express-validator');
const mongoose = require('mongoose')
//require Models
const Trade = require('../models/trade');
const User = require('../models/user');
const Account = require('../models/account');
const HttpError = require('../models/http-error');
const { updateAccount } = require('./userControllers');

////////////////////////////////
// POST /api/trades/
// Adds a new trade to the database
// Looking for basic information.
////////////////////////////////
exports.addNewTrade = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data', 422),
        );
    }

    // Grab trader an account id from the body
    const userId = req.body.trader;
    const accountId = req.body.account;

    //Create new trade object with reference to the trader.
    const trade = new Trade({
        ...req.body,
        trader: req.user._id,
    });

    //Tidy up the incoming data. Convert symbol to uppercase.
    trade.symbol = trade.symbol.toUpperCase();
    //Swapping the amount for a negative value if the outcome is a loss.
    if (trade.outcome === 'loss' && trade.amount > 0) {
        trade.amount = -trade.amount;
    }

    try {
        //Find user an the account separately, to get ready for the write
        const user = await User.findOne({ _id: userId });
        const account = await Account.findOne({ _id: accountId });

        //Start a new session to sync up three models. TODO - Swap the SQL, not elegant at all
        const session = await mongoose.startSession();
        session.startTransaction();

        //Push the new trade on the trades array, on both account and user. Not efficient, needs refactoring.
        account.trades.push(trade);
        user.trades.push(trade);
        //Save all three changes, as part of the session
        await account.save({ session });
        await user.save({ session });
        await trade.save({ session });
        //Close the transaction
        await session.commitTransaction();

        res.status(201).send(trade);
    } catch (error) {
        console.log(error);
        res.status(422).send(error.message);
    }
};

////////////////////////////////
// GET '/api/trades/'
//Fetches all trades from the database
////////////////////////////////
exports.getAllTrades = async (req, res) => {
    try {
        const trades = await Trade.find({ trader: req.user._id });
        res.send(trades);
        // Version B with populate
        // await req.user.populate('trades').execPopulate()
        // res.send(req.user.trades)
    } catch (error) {
        res.status(400).send(error.message);
    }
};


//////////////////////////////////////////
// GET '/api/trades/account/:accountId'
//Fetches all trades from the database
//////////////////////////////////////////

exports.getTradesByAccount = async (req, res) => {
    //Grab accountId from params
    const accountId = req.params.accountId
    //TODO - Add extra security, check if only the owner can access all trades.
    try {
        const trades = await Trade.find({ account: accountId});
        res.status(200).send(trades);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

//////////////////////////////////////////
// GET /api/trades/:id
//Fetches one trade from the database by Id
//////////////////////////////////////////
exports.getTrade = async (req, res) => {
    const _id = req.params.id;
    try {
        const trade = await Trade.findOne({ _id, trader: req.user._id });
        if (!trade) {
            return res.status(404).send('Trade not found');
        }
        res.send(trade);
    } catch (error) {
        res.status(500).send(error.message);
    }
};



//Update a trade in the database
exports.updateTrade = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data', 422),
        );
    }

    const _id = req.params.id;
    try {
        const trade = await Trade.findOneAndUpdate(
            { _id, trader: req.user._id },
            req.body,
        );
        const newTrade = await Trade.findOne({ _id });
        res.send(newTrade);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
//Delete a trade from the database
exports.deleteTrade = async (req, res) => {
    const _id = req.params.id;

    try {
        const trade = await Trade.findOneAndRemove({
            _id,
            trader: req.user._id,
        });
        res.send(trade);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
