const tradeService = require('../services/trade-service');
// Adds a new trade to the database TODO - ADD DATE HANDLING
// @POST /api/trades/

exports.addNewTrade = async (req, res, next) => {
  const { user_id } = req.user;
  const newTradeData = { ...req.body, user_id };

  const newTrade = tradeService.formatTrade(newTradeData);

  try {
    const tradeData = await tradeService.createNewTrade(newTrade);
    res.status(200).send({
      message: 'New trade created',
      trade: tradeData.trade,
      account: tradeData.account,
    });
  } catch (error) {
    return next(error);
  }
};

// Fetches all trades from the database
// @GET '/api/trades/'

exports.getTradesByUser = async (req, res, next) => {
  const { user_id } = req.user;

  try {
    const trades = await tradeService.getUserTrades(user_id);
    res.status(200).send({ trades });
  } catch (error) {
    return next(error);
  }
};

// @GET '/api/trades/account/:accountId'
// Fetches all trades by account Id

exports.getTradesByAccount = async (req, res, next) => {
  const { user_id } = req.user;
  const { accountId: account_id } = req.params;

  try {
    const trades = await tradeService.getAccountTrades(user_id, account_id);
    res.status(200).send(trades);
  } catch (error) {
    return next(error);
  }
};

// @GET 'api/trades/strategy/:strategyID
// Get all trades by strategy

exports.getTradesByStrategy = async (req, res, next) => {
  const { user_id } = req.user;
  const { strategyId: strategy_id } = req.params;

  try {
    const trades = await tradeService.getStrategyTrades(user_id, strategy_id);
    res.status(200).send(trades);
  } catch (error) {
    return next(error);
  }
};

// @GET /api/trades/:id
//Fetches one trade from the database by Id

exports.getTrade = async (req, res, next) => {
  const { tradeId: trade_id } = req.params;
  const { user_id } = req.user;
  try {
    const trade = await tradeService.getTradeById(user_id, trade_id);
    res.send(trade);
  } catch (error) {
    return next(error);
  }
};

//Update a trade in the database
// @PATCH

exports.updateTrade = async (req, res, next) => {
  const { tradeId: trade_id } = req.params;
  const { user_id } = req.user;
  const updates = { ...req.body};

  try {
    const updatedTrade = await tradeService.updateTradeStrategy(
      trade_id,
      user_id,
      updates,
    );
    res.status(200).send({updatedTrade});
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

//Delete a trade from the database
// @DELETE

exports.deleteTrade = async (req, res, next) => {
  const { tradeId: trade_id } = req.params;
  const { user_id } = req.user;

  console.log(trade_id, user_id);

  try {
    const deletedTradeData = await tradeService.deleteTrade(trade_id, user_id);
    res.status(200).send(deletedTradeData);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
