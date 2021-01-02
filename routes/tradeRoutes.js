//Package Requires
const express = require('express');
const { body } = require('express-validator');

//Require Middlewares
const tradeController = require('../controllers/tradeControllers');
const auth = require('../middleware/auth');
const { checkValidation } = require('../middleware/check-Validation');

//Setup Router
const router = express.Router();

//Add a new trade to the database
router.post(
    '/',
    auth,
    [
        body('symbol').not().isEmpty().isAlpha().trim(),
        body('outcome').not().isEmpty().isIn(['breakeven', 'profit', 'loss']),
        body('bias').not().isEmpty().isIn(['bullish', 'bearish']),
        body('amount').not().isEmpty().isFloat(),
        body('account').not().isEmpty().isString(),
        body('strategy').not().isEmpty().isString(),
        body('notes').isString(),
        // body('date').isDate()
        //Todo: ADD date validation
    ], checkValidation,
    tradeController.addNewTrade,
);

//Fetch all trades by account ID
router.get('/account/:accountId', auth, tradeController.getTradesByAccount);

//Fetch all trades by strategy
router.get('/strategy/:strategyId', auth, tradeController.getTradesByStrategy);

//Fetch all trades from the database
router.get('/', auth, tradeController.getTradesByUser);
//Fetch one trade from the database
router.get('/:tradeId', auth, tradeController.getTrade);

//Update a trade in the database - TODO: ADD VALIDATION
// ADD VALIDATION
router.patch('/tradeId', auth, tradeController.updateTrade);

//Delete a trade in the database -- TO WORK ON
router.delete('/:tradeId', auth, tradeController.deleteTrade);

module.exports = router;
