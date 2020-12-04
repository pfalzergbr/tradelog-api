const tradeService = require('../services/trade-service');
// POST /api/trades/
// Adds a new trade to the database TODO - ADD DATE HANDLING

exports.addNewTrade = async (req, res, next) => {
    const { user_id } = req.user;
    const newTradeData = {...req.body, user_id}

    const newTrade = tradeService.formatTrade(newTradeData);

    try {
        const trade = await tradeService.createNewTrade(newTrade);
        res.status(200).send({ message: "New trade created", trade});
    } catch (error) {
        return next(error);
    }
};

// GET '/api/trades/'
//Fetches all trades from the database

exports.getTradesByUser = async (req, res, next) => {
    const { user_id } = req.user;

    try {
        const trades = await tradeService.getUserTrades(user_id);
        res.status(200).send({ trades });
    } catch (error) {
        return next(error);
    }
};


// GET '/api/trades/account/:accountId'
//Fetches all trades from the database


exports.getTradesByAccount = async (req, res, next) => {
    // //Grab accountId from params
    // const accountId = req.params.accountId
    // // Checks if the account actually belongs to the trader
    // if (!req.user.accounts.includes(accountId)){
    //     return next( new HttpError('You are not authorized to see these trades. Please log in.', 401))
    // }
    // //TODO - Add extra security, check if only the owner can access all trades.
    // try {
    //     const trades = await Trade.find({ account: accountId});
    //     res.status(200).send(trades);
    // } catch (error) {
    //     res.status(400).send(error.message);
    // }
};
exports.getTradesByStrategy = async (req, res, next) => {

};


// GET /api/trades/:id
//Fetches one trade from the database by Id

exports.getTrade = async (req, res) => {
    // const _id = req.params.id;
    // try {
    //     const trade = await Trade.findOne({ _id, trader: req.user._id });
    //     if (!trade) {
    //         return res.status(404).send('Trade not found');
    //     }
    //     res.send(trade);
    // } catch (error) {
    //     res.status(500).send(error.message);
    // }
};



//Update a trade in the database
exports.updateTrade = async (req, res) => {
    // const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //     return next(
    //         new HttpError('Invalid inputs passed, please check your data', 422),
    //     );
    // }

    // const _id = req.params.id;
    // try {
    //     const trade = await Trade.findOneAndUpdate(
    //         { _id, trader: req.user._id },
    //         req.body,
    //     );
    //     const newTrade = await Trade.findOne({ _id });
    //     res.send(newTrade);
    // } catch (error) {
    //     res.status(400).send(error.message);
    // }
};


//Delete a trade from the database
exports.deleteTrade = async (req, res) => {
    // const _id = req.params.id;

    // try {
    //     //Start a new session for removing all references to the trade
    //     const session = await mongoose.startSession()
    //     session.startTransaction();
    //     const trade = await Trade.findOneAndRemove({
    //         _id,
    //         trader: req.user._id,
    //     }, { session });
    //     //Find the account and user associated with the trade
    //     const account = await Account.findOne({ _id: trade.account});
    //     const user = await User.findOne({ _id: req.user._id});
    //     //Pull out the trade references from the account and user documents
    //     account.trades.pull(trade);
    //     user.trades.pull(trade);
    //     //Save changes
    //     await account.save({ session })
    //     await user.save({ session });
    //     ///close and commit the transaction
    //     await session.commitTransaction();

    //     res.send(trade);
    // } catch (error) {
    //     res.status(400).send(error.message);
    // }
};
