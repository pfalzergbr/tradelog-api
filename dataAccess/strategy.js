const knex = require('../data/db');

exports.insertNewStrategy = async (
  user_id,
  { strategy_name, account_id, description, is_default = false }
) => {
  const strategies = await knex('strategies')
  .insert({
    user_id,
    strategy_name,
    account_id,
    description,
    is_default,
  })
  .returning('*');
  return strategies[0];
};

exports.findStrategyById = async (user_id, strategy_id) => {
  const strategies = await knex('strategies').where({
    user_id,
    strategy_id,
  });
  return strategies[0];
};

exports.updateStrategyById = async (
  user_id,
  { strategy_id, strategy_name, description }
) => {
  const strategies = await knex('strategies')
    .where({ user_id, strategy_id })
    .update({ strategy_name, strategy_id, description });
  return strategies[0];
};

exports.deleteStrategyById = async (strategy_id, user_id) => {
  const strategies = await knex('strategies')
    .where({ strategy_id, user_id })
    .del();
  return strategies[0];
};

exports.findStrategyByUserId = async user_id => {
  const strategies = await knex('strategies')
    .where({user_id})
  return strategies
}